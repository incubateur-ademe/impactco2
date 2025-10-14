import numeriqueRules from '@incubateur-ademe/publicodes-acv-numerique'
import fs from 'fs'
import path from 'path'
import Engine from 'publicodes'
import { numeriques } from 'data/categories/numerique'

const equipmentMapping = {
  alimentationordinateur: 'chargeur ordinateur',
  alimentationsmartphone: 'chargeur smartphone',
  clefusb: 'clé USB',
  disquedur: 'disque dur externe',
  telephonebasique: '',
  enceintebluetooth: 'enceinte',
  tabletteclassique: 'tablette',
  smartphone: 'smartphone',
  ecran: 'écran',
  ssd: 'SSD externe',
  box: 'box',
  casquevr: 'casque de réalité virtuelle',
  ordinateurportable: 'ordinateur portable',
  television: 'TV',
  ordinateurfixeprofessionnel: 'ordinateur fixe pro',
  ordinateurfixeparticulier: 'ordinateur fixe',
}

const ecvMapping = {
  4: 'distribution',
  5: 'fabrication',
}

const noUsage = ['alimentationordinateur', 'alimentationsmartphone']

export const extractPublicodesValues = () => {
  const engine = new Engine(numeriqueRules)

  for (const [slug, ruleName] of Object.entries(equipmentMapping)) {
    try {
      if (!ruleName) {
        console.warn(`Nom de règle manquant pour le slug: ${slug}`)
        continue
      }

      const data = numeriques.find((item) => item.slug === slug)
      if (!data) {
        console.warn(`Aucune donnée trouvée pour le slug: ${slug}`)
        continue
      }

      const ecv = [] as { id: number; value: number }[]

      for (const [id, key] of Object.entries(ecvMapping)) {
        const rule = `acv . ${ruleName} . carbone . ${key}`
        try {
          const subEvaluation = engine.evaluate(rule)
          const value = subEvaluation.nodeValue as number

          ecv.push({ id: parseInt(id, 10), value: value / 1000 })
        } catch {
          console.log(`  ${rule}: non disponible`)
        }
      }

      data.ecv = ecv
      let years = 0
      if (!noUsage.includes(slug)) {
        years = engine.evaluate(`acv . ${ruleName} . durée de vie théorique`).nodeValue as number
        data.usage = {
          peryear:
            (engine.evaluate(`acv . ${ruleName} . carbone . usage théorique`).nodeValue as number) / (years * 1000),
          defaultyears: years,
        }
      }

      data.end = (engine.evaluate(`acv . ${ruleName} . carbone . fin de vie`).nodeValue as number) / 1000
      const total = data.ecv.reduce((sum, item) => sum + item.value, 0) + data.end + (data.usage?.peryear || 0) * years
      console.log(`${slug}: ${total * 1000}`)
    } catch (error) {
      console.error(`Erreur lors de l'extraction de ${slug}:`, error)
    }
  }
}

async function updateNumeriqueFile() {
  try {
    await extractPublicodesValues()
    const backupContent = `export const numeriques = ${JSON.stringify(numeriques, null, 2)}`

    const backupPath = path.join(__dirname, '../data/categories/numerique-extracted.ts')
    fs.writeFileSync(backupPath, backupContent, 'utf8')

    console.log(`\nValeurs sauvegardées dans: ${backupPath}`)
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
  }
}

updateNumeriqueFile()
