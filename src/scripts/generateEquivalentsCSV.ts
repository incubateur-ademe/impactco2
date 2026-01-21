import fs from 'fs'
import path from 'path'
import { categories } from '../data/categories'
import { getName } from 'utils/Equivalent/equivalent'
import values from 'utils/Equivalent/values.json'

function generateCSV() {
  const sortedRows = [
    ["Nom de l'objet ou du geste", 'kg CO2e', 'Thématique', 'ID', 'URL'],
    ...Object.entries(values)
      .flatMap(([slug, data]) => {
        const category = categories.find((category) => category.id === data.category)
        const name = getName('fr', { slug, ...data }, false, 1, false, category?.id === 12)
        const kgCO2e = data.value / 1000
        const thematique = category?.name || ''
        const id = slug
        const url = `https://impactco2.fr/outils/${category?.slug}/${slug}`

        if (slug === 'voiturethermique' || slug === 'voitureelectrique') {
          return [
            [name, kgCO2e.toString(), thematique, id, url],
            ...Array.from({ length: 4 }).map((_, i) => [
              getName(
                'fr',
                { slug: `${slug}+${i + 1}`, carpool: i + 1, ...data },
                false,
                1,
                false,
                category?.id === 12
              ),
              (data.value / (i + 2)).toString(),
              thematique,
              `${id}+${i + 1}`,
              `${url}+${i + 1}`,
            ]),
          ]
        }

        return [[name, kgCO2e.toString(), thematique, id, url]]
      })
      .sort((a, b) => {
        const themeCompare = a[2].localeCompare(b[2])
        if (themeCompare !== 0) {
          return themeCompare
        }
        return a[0].localeCompare(b[0])
      }),
  ]

  const csvContent = sortedRows
    .map((row) =>
      row
        .map((cell) => {
          if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
            return `"${cell.replace(/"/g, '""')}"`
          }
          return cell
        })
        .join(',')
    )
    .join('\n')

  const outputPath = path.join(__dirname, '../../public/equivalents.csv')
  fs.writeFileSync(outputPath, csvContent, 'utf-8')

  console.log(`✅ CSV généré avec succès : ${outputPath}`)
  console.log(`📊 Nombre d'équivalents : ${sortedRows.length - 1}`)
}

try {
  generateCSV()
} catch (error) {
  console.error('❌ Erreur lors de la génération du CSV:', error)
  process.exit(1)
}
