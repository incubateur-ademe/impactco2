import { Page, chromium } from '@playwright/test'
import fs from 'fs'
import pdftk from 'node-pdftk'
import alimentation from '../data/categories/alimentation.json'
import { livraison } from '../data/categories/livraison'

const quizEquivalents = [
  { category: 'alimentation', equivalent: 'repasavecduboeuf' },
  { category: 'caspratiques', equivalent: 'tgv-paris-marseille' },
  { category: 'numerique', equivalent: 'tabletteclassique' },
  { category: 'habillement', equivalent: 'chaussuresencuir' },
  { category: 'fruitsetlegumes', equivalent: 'avocat' },
  { category: 'alimentation', equivalent: 'repasavecdupoissonblanc' },
  { category: 'electromenager', equivalent: 'refrigirateur' },
  { category: 'numerique', equivalent: 'ordinateurportable' },
  { category: 'boisson', equivalent: 'eauenbouteille' },
  { category: 'boisson', equivalent: 'the' },
  { category: 'caspratiques', equivalent: 'friends' },
  { category: 'caspratiques', equivalent: 'voiture-lille-nimes' },
  { category: 'habillement', equivalent: 'manteau' },
  { category: 'electromenager', equivalent: 'bouilloire' },
  { category: 'numerique', equivalent: 'television' },
  { category: 'caspratiques', equivalent: 'avion-pny' },
  { category: 'usagenumerique', equivalent: 'email' },
  { category: 'numerique', equivalent: 'smartphone' },
  { category: 'transport', equivalent: 'veloelectrique' },
  { category: 'fruitsetlegumes', equivalent: 'mangue' },
]

const alimentationEquivalents = alimentation.map((equivalent) => ({
  category:
    equivalent.category === 2
      ? 'alimentation'
      : equivalent.category === 3
        ? 'boisson'
        : equivalent.category === 9
          ? 'fruitsetlegumes'
          : 'undefined',
  equivalent: equivalent.slug,
}))

const livraisonEquivalents = livraison
  .filter((equivalent) => equivalent.category === 12)
  .map((equivalent) => ({
    category: 'livraison',
    equivalent: equivalent.slug,
  }))

const downloadPage = async (page: Page, url: string, output: string) => {
  await page.goto(url, { timeout: 60000 })
  await page.waitForLoadState('networkidle', { timeout: 60000 })

  await page.waitForTimeout(5000)

  await page.pdf({
    path: output,
    format: 'A4',
    printBackground: true,
  })
}

const downloadEquivalent = async (page: Page, category: string, equivalent: string) => {
  await downloadPage(page, `http://localhost:3000/pdf/${category}/${equivalent}/recto`, './public/pdf/recto.pdf')
  await downloadPage(page, `http://localhost:3000/pdf/${category}/${equivalent}/verso`, './public/pdf/verso.pdf')

  const pdfBuffer1 = fs.readFileSync('./public/pdf/recto.pdf')
  const pdfBuffer2 = fs.readFileSync('./public/pdf/verso.pdf')

  pdftk
    .input([pdfBuffer1, pdfBuffer2])
    .output()
    .then((buf) => {
      const path = `./public/pdf/${equivalent}.pdf`
      fs.open(path, 'w', function (err, fd) {
        fs.write(fd, buf, 0, buf.length, null, function () {
          fs.close(fd, function () {
            console.log('wrote the file successfully')
          })
        })
      })
    })
}

const getEquivalents = (type: string) => {
  switch (type) {
    case 'quiz':
      return quizEquivalents
    case 'alimentation':
      return alimentationEquivalents
    case 'livraison':
      return livraisonEquivalents
    default:
      return []
  }
}

const download = async (type: string) => {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  const equivalents = getEquivalents(type)

  for (let i = 0; i < equivalents.length; i++) {
    const { equivalent, category } = equivalents[i]
    console.log('Download', equivalent)
    await downloadEquivalent(page, category, equivalent)
  }

  if (equivalents.length > 0) {
    fs.rmSync('./public/pdf/recto.pdf')
    fs.rmSync('./public/pdf/verso.pdf')
  }
  browser.close()
}

download(process.argv[2])
