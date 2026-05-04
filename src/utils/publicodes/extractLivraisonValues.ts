import livraisonRules from '@incubateur-ademe/publicodes-impact-livraison'
import Engine from 'publicodes'
import { computedEquivalents } from 'src/providers/equivalents'
import { ComputedEquivalent } from 'types/equivalent'
import { livraison } from 'data/categories/livraison'
import { livraisonData } from 'components/outils/livraison/LivraisonData'

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

const voiture = computedEquivalents.find((equivalent) => equivalent.slug === 'voiturethermique') as ComputedEquivalent

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
          if (id === '56') {
            return { id: 56, value: voiture.value * 7 }
          }
          if (id === '57') {
            return { id: 57, value: voiture.value * 30 }
          }
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
