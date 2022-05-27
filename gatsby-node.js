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

function formatNumber(value, noformat) {
  let tempTotal = Math.round(value * 1000000) / 1000000
  tempTotal =
    tempTotal > 0.0001 ? Math.round(tempTotal * 10000) / 10000 : tempTotal
  tempTotal =
    tempTotal > 0.001 ? Math.round(tempTotal * 1000) / 1000 : tempTotal
  tempTotal = tempTotal > 0.01 ? Math.round(tempTotal * 100) / 100 : tempTotal
  tempTotal = tempTotal > 0.1 ? Math.round(tempTotal * 10) / 10 : tempTotal
  tempTotal = tempTotal > 1 ? Math.round(tempTotal * 1) / 1 : tempTotal
  return noformat
    ? tempTotal
    : tempTotal.toLocaleString('fr-fr', { maximumFractionDigits: 10 })
}

function formatName(name, value, capital) {
  const newName = name
    .replaceAll('[s]', value > 1 ? 's' : '')
    .replaceAll('[x]', value > 1 ? 'x' : '')

  return capital ? newName : newName.toLowerCase()
}
function formatTotal(equivalent, years, end) {
  let total =
    equivalent.total || equivalent.ecv.reduce((acc, cur) => acc + cur.value, 0)
  if (years) {
    total += years * equivalent.usage.peryear
  }
  if (end) {
    total += equivalent.end
  }
  return total
}

exports.onPostBuild = async () => {
  const dir = path.resolve(__dirname, './public/og-images')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: true,
  })
  const page = await browser.newPage()
  await page.setViewport({
    width: 1200,
    height: 628,
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
      html: `
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <style>
    body {
      font-family: "Ubuntu", Arial, sans-serif
      margin: 0;
    }
    .top {
      display: flex;
      align-items: center;
      height: 314px;
      padding: 0 64px;
      color: #26827c;
    }
    h1 {
      margin: 0;
      font-size: 90px;
      line-height: 108px;
    }
    .bottom {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 314px;
      padding: 0 64px;
      color: #fff;
      background-color: #26827c;
    }
    h2 {
      margin: 0;
      font-size: 120px;
      line-height: 108px;
      text-align: right;
    }
    span {
      font-size: 60px;
    }
  </style>
  <body>
    <div class="top">
      <h1>${formatName(equivalent.name.fr, 1, true)}</h1>
    </div>
    <div class="bottom">
      <h2>
        ${formatNumber(formatTotal(equivalent))} <span>kg CO2<sub>e</sub></span>
      </h2>
    </div>
  </body>
</html>
`,
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
