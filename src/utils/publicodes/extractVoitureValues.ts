import voitureRules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json'
import Engine from 'publicodes'
import { deplacements } from 'data/categories/deplacement'

const voitureTypeMapping = {
  citadine: "'petite'",
  compact: "'moyenne'",
  berline: "'berline'",
  grandeberline: "'SUV'",
}

const voitureCarburantSituationMapping = {
  essence: {
    'transport . voiture . motorisation': "'thermique'",
    'transport . voiture . thermique . carburant': "'essence E5 ou E10'",
  },
  diesel: {
    'transport . voiture . motorisation': "'thermique'",
    'transport . voiture . thermique . carburant': "'gazole B7 ou B10'",
  },
  electrique: {
    'transport . voiture . motorisation': "'électrique'",
  },
  hybride: {
    'transport . voiture . motorisation': "'hybride non rechargeable'",
  },
  hybriderechargeable: {
    'transport . voiture . motorisation': "'hybride rechargeable'",
  },
}

export const extractVoitureValues = () => {
  const engine = new Engine(voitureRules, {
    warn: {
      cyclicReferences: false,
    },
  })

  const situations = Object.entries(voitureTypeMapping).flatMap(([type, gabarit]) =>
    Object.entries(voitureCarburantSituationMapping).map(([carburant, carburantSituation]) => [
      `voiture-${type}-${carburant}`,
      {
        'transport . voiture . utilisateur': "'propriétaire'",
        'transport . voiture . gabarit': gabarit,
        ...carburantSituation,
      },
    ])
  ) as [string, Record<string, string>][]

  situations.push(['voiturethermique', situations.find(([slug]) => slug === 'voiture-citadine-diesel')![1]])
  situations.push(['voitureelectrique', situations.find(([slug]) => slug === 'voiture-citadine-electrique')![1]])
  situations.push(['voiturehybride', situations.find(([slug]) => slug === 'voiture-citadine-hybriderechargeable')![1]])
  for (const [slug, situation] of situations) {
    try {
      const data = deplacements.find((item) => item.slug === slug)
      if (!data) {
        console.warn(`Aucune donnée trouvée pour le slug: ${slug}`)
        continue
      }

      engine.setSituation(situation)

      const voyageurs = engine.evaluate('transport . voiture . voyageurs').nodeValue as number
      const usage = (engine.evaluate('transport . voiture . usage au kilomètre').nodeValue as number) / voyageurs
      const construction =
        (engine.evaluate('transport . voiture . construction au kilomètre').nodeValue as number) / voyageurs

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
