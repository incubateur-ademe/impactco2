import numeriqueRules from '@incubateur-ademe/publicodes-acv-numerique'
import chauffageRules from '@incubateur-ademe/publicodes-empreinte-carbone-chauffage'
import livraisonRules from '@incubateur-ademe/publicodes-impact-livraison'
import fs from 'fs'
import path from 'path'
import Engine from 'publicodes'
import { chauffage } from 'data/categories/chauffage'
import { livraison } from 'data/categories/livraison'
import { numeriques } from 'data/categories/numerique'
import { livraisonData } from 'components/outils/livraison/LivraisonData'

const numeriqueEquipmentMapping = {
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

const chauffageEquipmentMapping = {
  chauffagegaz: { fe: 'gaz', ceren: 'gaz chauffage air' },
  chauffagefioul: { fe: 'fioul', ceren: 'fioul chauffage air' },
  chauffageelectrique: { fe: 'électricité', ceren: 'électricité chauffage air hors PAC' },
  pompeachaleur: { fe: 'électricité', ceren: 'électricité chauffage air PAC' },
  poeleagranule: { fe: 'granulés', ceren: 'granulés chauffage air' },
  poeleabois: { fe: 'bûches', ceren: 'buches chauffage air' },
  chaudiereagranule: { fe: 'granulés', ceren: 'bois' },
  chaudiereabois: { fe: 'bûches', ceren: 'bois' },
  reseaudechaleur: { fe: 'réseau de chaleur', ceren: 'réseau de chaleur chauffage air' },
}

const livraisonItemMapping = {
  courses: { 'informations . catégorie': "'grande consommation'" },
  chaussure: { 'informations . catégorie': "'habillement'" },
  livre: { 'informations . catégorie': "'culturel'" },
  microondes: { 'informations . catégorie': "'autre'" },
  vetements: {
    'informations . catégorie': "'habillement'",
    'informations . poids': 4,
    'informations . volume': 48000,
  },
  lavelinge: { 'informations . catégorie': "'équipements volumineux'" },
  lit: {
    'informations . catégorie': "'équipements volumineux'",
    'informations . poids': 120,
    'informations . volume': 1600000,
  },
  smartphone: { 'informations . catégorie': "'culturel'", 'informations . poids': 0.5, 'informations . volume': 900 },
  vin: {
    'informations . catégorie': "'grande consommation'",
    'informations . poids': 16.4,
    'informations . volume': 36000,
  },
  cafetiere: {
    'informations . catégorie': "'équipements volumineux'",
    'informations . poids': 7.5,
    'informations . volume': 26250,
  },
}

const livraisonPoidsMapping = {
  1: {
    'informations . catégorie': "'habillement'",
    'informations . poids': 1,
  },
  2: {
    'informations . catégorie': "'habillement'",
    'informations . poids': 2,
  },
  15: {
    'informations . catégorie': "'équipements volumineux'",
    'informations . poids': 15,
    'informations . volume': 100000,
  },
  30: {
    'informations . catégorie': "'équipements volumineux'",
    'informations . poids': 30,
    'informations . volume': 200000,
  },
}
const livraisonEquipmentMapping = {
  magasin: {
    rules: {
      55: 'livraison colis . scénario . stockage et transit magasin',
      33: 'livraison colis . scénario . transport du colis',
      57: 'livraison colis . déplacement consommateur',
    },
    distance: '30',
  },
  magasindouce: {
    rules: {
      55: 'livraison colis . scénario . stockage et transit magasin',
      33: 'livraison colis . scénario . transport du colis',
    },
  },
  pointrelais: {
    rules: {
      54: 'livraison colis . scénario . commande et préparation',
      55: 'livraison colis . scénario . stockage et transit point de retrait',
      33: 'livraison colis . scénario . transport du colis',
      56: 'livraison colis . déplacement consommateur',
    },
    distance: '7',
  },
  pointrelaisdouce: {
    rules: {
      54: 'livraison colis . scénario . commande et préparation',
      55: 'livraison colis . scénario . stockage et transit point de retrait',
      33: 'livraison colis . scénario . transport du colis',
    },
  },
  clickcollect: {
    rules: {
      54: 'livraison colis . scénario . commande et préparation',
      55: 'livraison colis . scénario . stockage et transit magasin',
      33: 'livraison colis . scénario . transport du colis',
      57: 'livraison colis . déplacement consommateur',
    },
    distance: '30',
  },
  clickcollectdouce: {
    rules: {
      54: 'livraison colis . scénario . commande et préparation',
      55: 'livraison colis . scénario . stockage et transit magasin',
      33: 'livraison colis . scénario . transport du colis',
    },
  },
  livraisondomicile: {
    rules: {
      54: 'livraison colis . scénario . commande et préparation',
      55: 'livraison colis . scénario . stockage et transit livraison à domicile',
      33: 'livraison colis . scénario . transport du colis et tournée',
    },
  },
}

const ecvMapping = {
  4: 'distribution',
  5: 'fabrication',
}

const noUsage = ['alimentationordinateur', 'alimentationsmartphone']

export const extractNumeriqueValues = () => {
  const engine = new Engine(numeriqueRules)

  for (const [slug, ruleName] of Object.entries(numeriqueEquipmentMapping)) {
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

export const extractChauffageValues = () => {
  const engine = new Engine(chauffageRules)

  for (const [slug, { fe, ceren }] of Object.entries(chauffageEquipmentMapping)) {
    try {
      const data = chauffage.find((item) => item.slug === slug)
      if (!data) {
        console.warn(`Aucune donnée trouvée pour le slug: ${slug}`)
        continue
      }

      const factor = `FE . ${fe}`
      const perM2 = `CEREN . chauffage . consommation ${ceren} par m2`
      data.total = (engine.evaluate(factor).nodeValue as number) * (engine.evaluate(perM2).nodeValue as number)

      console.log(`${slug}: ${data.total} kgCO2e`)
    } catch (error) {
      console.error(`Erreur lors de l'extraction de ${slug}:`, error)
    }
  }
}

export const extractLivraisonValues = () => {
  const engine = new Engine(livraisonRules)
  for (const [poids, rules] of Object.entries(livraisonPoidsMapping)) {
    for (const [key, values] of Object.entries(livraisonEquipmentMapping)) {
      engine.setSituation(
        'distance' in values
          ? {
              ...rules,
              'livraison colis . déplacement consommateur . mode de déplacement': "'voiture thermique'",
              'livraison colis . déplacement consommateur . distance': values.distance,
            }
          : {
              ...rules,
              'livraison colis . déplacement consommateur . mode de déplacement': "'voiture thermique'",
            }
      )
      const slug = poids === '1' ? key : `${key}${poids}kg`
      try {
        const data = livraison.find((item) => item.slug === slug)
        if (!data) {
          console.warn(`Aucune donnée trouvée pour le slug: ${slug}`)
          continue
        }

        data.ecv = Object.entries(values.rules).map(([id, ruleName]) => {
          const value = engine.evaluate(ruleName).nodeValue as number
          return { id: parseInt(id, 10), value: value / 1000 }
        })

        console.log(`${slug}: ${data.ecv.reduce((sum, ecv) => sum + ecv.value, 0)} kgCO2e`)
      } catch (error) {
        console.error(`Erreur lors de l'extraction de ${slug}:`, error)
      }
    }
  }

  for (const item of Object.keys(livraisonData)) {
    for (const [key, values] of Object.entries(livraisonEquipmentMapping)) {
      engine.setSituation(
        'distance' in values
          ? {
              ...livraisonItemMapping[item as keyof typeof livraisonItemMapping],
              'livraison colis . déplacement consommateur . mode de déplacement': "'voiture thermique'",
              'livraison colis . déplacement consommateur . distance': values.distance,
            }
          : {
              ...livraisonItemMapping[item as keyof typeof livraisonItemMapping],
              'livraison colis . déplacement consommateur . mode de déplacement': "'voiture thermique'",
            }
      )

      try {
        const data = livraisonData[item as keyof typeof livraisonData]
        if (!data) {
          console.warn(`Aucune donnée trouvée pour le slug: ${key}`)
          continue
        }

        data.ecv[key] = Object.entries(values.rules)
          .filter(([id]) => id !== '56' && id !== '57')
          .map(([id, ruleName]) => {
            const value = engine.evaluate(ruleName).nodeValue as number
            return { id: parseInt(id, 10), value: value / 1000 }
          })

        console.log(`${key}: ${data.ecv[key].reduce((sum, ecv) => sum + ecv.value, 0)} kgCO2e`)
      } catch (error) {
        console.error(`Erreur lors de l'extraction de ${key}:`, error)
      }
    }
  }
}

function updateDataFile(category: string) {
  try {
    if (category === 'numerique') {
      extractNumeriqueValues()
      const backupContent = `export const numeriques = ${JSON.stringify(numeriques, null, 2)}`
      const backupPath = path.join(__dirname, '../data/categories/numerique.ts')
      fs.writeFileSync(backupPath, backupContent, 'utf8')
      console.log(`\nValeurs sauvegardées dans: ${backupPath}`)
    } else if (category === 'chauffage') {
      extractChauffageValues()
      const backupContent = `export const chauffage = ${JSON.stringify(chauffage, null, 2)}`
      const backupPath = path.join(__dirname, '../data/categories/chauffage.ts')
      fs.writeFileSync(backupPath, backupContent, 'utf8')
      console.log(`\nValeurs sauvegardées dans: ${backupPath}`)
    } else if (category === 'livraison') {
      extractLivraisonValues()

      const backupContent = `export const livraison = ${JSON.stringify(livraison, null, 2)}`
      const backupPath = path.join(__dirname, '../data/categories/livraison.ts')
      fs.writeFileSync(backupPath, backupContent, 'utf8')
      console.log(`\nValeurs sauvegardées dans: ${backupPath}`)

      const dataContent = `import { LivraisonType } from './Type'
      export const livraisonData: Record<
        LivraisonType,
        { fabrication: number; ecv: Record<string, { id: number; value: number }[]> }
      > =  ${JSON.stringify(livraisonData, null, 2)}`
      const dataPath = path.join(__dirname, '../components/outils/livraison/LivraisonData.ts')
      fs.writeFileSync(dataPath, dataContent, 'utf8')
      console.log(`\nValeurs sauvegardées dans: ${dataPath}`)
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
  }
}

const category = process.argv[2]

if (!['numerique', 'chauffage', 'livraison'].includes(category)) {
  console.error('Usage: ts-node getPublicodeValues.ts [numerique|chauffage|livraison]')
  process.exit(1)
}

console.log(`\n=== Extraction des valeurs pour: ${category} ===\n`)
updateDataFile(category)
