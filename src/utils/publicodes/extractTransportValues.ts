import voitureRules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json'
import Engine from 'publicodes'
import { deplacements } from 'data/categories/deplacement'

const transportValues = {
  scooterelectrique: 'FE scooter électrique',
}

const vacancesValues = {
  campingcar: 'camping car',
  van: 'van',
}

export const extractTransportValues = () => {
  const engine = new Engine(voitureRules, {
    warn: {
      cyclicReferences: false,
    },
  })
  for (const [slug, rule] of Object.entries(transportValues)) {
    try {
      const data = deplacements.find((item) => item.slug === slug)
      if (!data) {
        console.warn(`Aucune donnée trouvée pour le slug: ${slug}`)
        continue
      }

      engine.setSituation({
        'transport . deux roues . type': "'scooter électrique'",
        'transport . deux roues . usager': "'scooter électrique'",
      })

      const usage = engine.evaluate(`transport . deux roues . empreinte au km . ${rule} . usage au km`)
        .nodeValue as number
      const construction = engine.evaluate(`transport . deux roues . empreinte au km . ${rule} . construction au km`)
        .nodeValue as number

      data.ecv = [
        {
          id: 6,
          value: usage,
        },
        {
          id: 5,
          value: construction,
        },
      ]

      console.log(
        `${slug} | construction: ${construction.toFixed(3)} | usage: ${usage.toFixed(3)} | total: ${(construction + usage).toFixed(3)}`
      )
    } catch (error) {
      console.error(`Erreur lors de l'extraction de ${slug}:`, error)
    }
  }
  for (const [slug, rule] of Object.entries(vacancesValues)) {
    try {
      const data = deplacements.find((item) => item.slug === slug)
      if (!data) {
        console.warn(`Aucune donnée trouvée pour le slug: ${slug}`)
        continue
      }

      engine.setSituation({ [`transport . vacances . ${rule} . propriétaire`]: "'oui'" })

      const usage = engine.evaluate(`transport . vacances . ${rule} . usage au km`).nodeValue as number
      const construction = engine.evaluate(`transport . vacances . ${rule} . construction au km`).nodeValue as number

      data.ecv = [
        {
          id: 6,
          value: usage,
        },
        {
          id: 5,
          value: construction,
        },
      ]

      console.log(
        `${slug} | construction: ${construction.toFixed(3)} | usage: ${usage.toFixed(3)} | total: ${(construction + usage).toFixed(3)}`
      )
    } catch (error) {
      console.error(`Erreur lors de l'extraction de ${slug}:`, error)
    }
  }
}
