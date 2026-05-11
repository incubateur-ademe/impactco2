import fs from 'fs'
import path from 'path'
import { casPratiques } from 'data/categories/caspratiques'
import { chauffage } from 'data/categories/chauffage'
import { deplacements } from 'data/categories/deplacement'
import { livraison } from 'data/categories/livraison'
import { numeriques } from 'data/categories/numerique'
import { livraisonData } from 'components/outils/livraison/LivraisonData'
import { extractChauffageValues } from 'utils/publicodes/extractChauffageValues'
import { extractLivraisonValues } from 'utils/publicodes/extractLivraisonValues'
import { extractNumeriqueValues } from 'utils/publicodes/extractNumeriqueValues'
import { extractTransportValues } from 'utils/publicodes/extractTransportValues'
import { extractVoitureValues } from 'utils/publicodes/extractVoitureValues'

function updateDataFile(category: string) {
  try {
    switch (category) {
      case 'numerique':
        extractNumeriqueValues()
        const backupContent = `export const numeriques = ${JSON.stringify(numeriques, null, 2)}`
        const backupPath = path.join(__dirname, '../data/categories/numerique.ts')
        fs.writeFileSync(backupPath, backupContent, 'utf8')
        console.log(`\nValeurs sauvegardées dans: ${backupPath}`)
        break
      case 'chauffage':
        extractChauffageValues()
        const backupContent2 = `export const chauffage = ${JSON.stringify(chauffage, null, 2)}`
        const backupPath2 = path.join(__dirname, '../data/categories/chauffage.ts')
        fs.writeFileSync(backupPath2, backupContent2, 'utf8')
        console.log(`\nValeurs sauvegardées dans: ${backupPath2}`)
        break
      case 'livraison':
        extractLivraisonValues()

        const backupContent3 = `export const livraison = ${JSON.stringify(livraison, null, 2)}`
        const backupPath3 = path.join(__dirname, '../data/categories/livraison.ts')
        fs.writeFileSync(backupPath3, backupContent3, 'utf8')
        console.log(`\nValeurs sauvegardées dans: ${backupPath3}`)

        const dataContent = `import { LivraisonType } from './Type'
      export const livraisonData: Record<
        LivraisonType,
        { fabrication: number; ecv: Record<string, { id: number; value: number }[]> }
      > =  ${JSON.stringify(livraisonData, null, 2)}`
        const dataPath = path.join(__dirname, '../components/outils/livraison/LivraisonData.ts')
        fs.writeFileSync(dataPath, dataContent, 'utf8')
        console.log(`\nValeurs sauvegardées dans: ${dataPath}`)
        break
      case 'voiture':
        extractVoitureValues()
        const backupDeplacementContent = `export const deplacements = ${JSON.stringify(deplacements, null, 2)}`
        const backupDeplacementPath = path.join(__dirname, '../data/categories/deplacement.ts')
        fs.writeFileSync(backupDeplacementPath, backupDeplacementContent, 'utf8')
        console.log(`\nValeurs sauvegardées dans: ${backupDeplacementPath}`)
        const backupCasPratiquesContent = `export const casPratiques = ${JSON.stringify(casPratiques, null, 2)}`
        const backupCasPratiquesPath = path.join(__dirname, '../data/categories/caspratiques.ts')
        fs.writeFileSync(backupCasPratiquesPath, backupCasPratiquesContent, 'utf8')
        console.log(`\nValeurs sauvegardées dans: ${backupCasPratiquesPath}`)
        break
      case 'transport':
        extractTransportValues()
        const backupDeplacementContent2 = `export const deplacements = ${JSON.stringify(deplacements, null, 2)}`
        const backupDeplacementPath2 = path.join(__dirname, '../data/categories/deplacement.ts')
        fs.writeFileSync(backupDeplacementPath2, backupDeplacementContent2, 'utf8')
        console.log(`\nValeurs sauvegardées dans: ${backupDeplacementPath2}`)
        break
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
  }
}

const category = process.argv[2]

if (!['numerique', 'chauffage', 'livraison', 'voiture', 'transport'].includes(category)) {
  console.error('Usage: tsx getPublicodeValues.ts [numerique|chauffage|livraison|voiture|transport]')
  process.exit(1)
}

console.log(`\n=== Extraction des valeurs pour: ${category} ===\n`)
updateDataFile(category)
