import chauffageRules from '@incubateur-ademe/publicodes-empreinte-carbone-chauffage'
import Engine from 'publicodes'
import { chauffage } from 'data/categories/chauffage'

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
