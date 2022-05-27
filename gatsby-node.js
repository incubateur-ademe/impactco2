const chromium = require('chrome-aws-lambda')
const path = require('path')
const fs = require('fs')

const boisson = require('./src/data/categories/boisson.json')
const deplacement = require('./src/data/categories/deplacement.json')
const electromenager = require('./src/data/categories/electromenager.json')
const habillement = require('./src/data/categories/habillement.json')
const mobilier = require('./src/data/categories/mobilier.json')
const numerique = require('./src/data/categories/numerique.json')
const repas = require('./src/data/categories/repas.json')
const categories = require('./src/data/categories.json')

const equivalents = [
  ...boisson,
  ...deplacement,
  ...electromenager,
  ...habillement,
  ...mobilier,
  ...numerique,
  ...repas,
]

exports.onPostBuild = async () => {
  const dir = path.resolve(__dirname, './public/og-images')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  })
  const page = await browser.newPage()
  await page.setViewport({
    width: 1200,
    height: 630,
  })

  async function createOG({ html, slug }) {
    await page.setContent(html, {
      waitUntil: ['domcontentloaded'],
    })

    await page.screenshot({
      type: 'jpeg',
      path: `${dir}/${slug}.jpeg`,
      quality: 100,
    })
  }

  for (const equivalent of equivalents) {
    await createOG({
      html: `<html><body><h1>${equivalent.name.fr}</h1></body></html>`,
      slug: equivalent.slug,
    })
  }
}

exports.createPages = ({ graphql, actions: { createPage } }) => {
  const equivalentsPages = equivalents.map((equivalent) => {
    const category = categories.find(
      (category) => category.id === equivalent.category
    )
    createPage({
      path: `/categories/${category.slug}/${equivalent.slug}/`,
      component: require.resolve('./src/templates/equivalent.js'),
      context: {
        equivalent,
        category,
      },
    })
  })
  const categoriesPages = categories.map((category) => {
    createPage({
      path: `/categories/${category.slug}/`,
      component: require.resolve('./src/templates/category.js'),
      context: {
        category,
      },
    })
  })
  return Promise.all([equivalentsPages, categoriesPages])
}
