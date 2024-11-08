import { Page, chromium } from '@playwright/test'
import fs from 'fs'
import pdftk from 'node-pdftk'

const equivalents = [
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

const downloadPage = async (page: Page, url: string, output: string) => {
  await page.goto(url, { timeout: 60000 })
  await page.waitForLoadState('networkidle', { timeout: 60000 })

  await page.waitForTimeout(5000)

  await page.pdf({
    path: output,
    format: 'A4',
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

const download = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  for (let i = 0; i < equivalents.length; i++) {
    const { equivalent, category } = equivalents[i]
    console.log('Download', equivalent)
    await downloadEquivalent(page, category, equivalent)
  }

  browser.close()
}

download()
