import numeriqueRules from '@incubateur-ademe/publicodes-acv-numerique'
import Engine from 'publicodes'
import { usageNumeriques } from 'data/categories/usagenumerique'
import { casPratiques } from 'src/data/categories/caspratiques'
import { evaluateNumber } from '../useSituation'

const ecvMapping = {
  41: ' . terminaux . usage',
  42: ' . transmission',
  43: ' . data center',
}

const slugMapping = {
  email: 'email',
  streaming: 'streamingvideo',
  visio: 'visioconference',
  fichier: 'stockagedonnee',
}
const casPartiqueMapping = {
  'game-of-thrones': 60,
  friends: 5192,
  'harry-potter': 1176,
}

export const extractUsageNumeriqueValues = () => {
  const engine = new Engine(numeriqueRules)

  engine.setSituation({
    ['email . appareil']: "'ordinateur et écran'",
    ['email . taille']: 1,
    ['email . terminaux . temps écriture']: 3,
    ['email . destinataires']: 1.075,
    ['email . réseau']: "'mobile'",
    ['streaming . durée']: 60,
    ['streaming . appareil']: "'TV'",
    ['streaming . qualité']: "'HD'",
    ['streaming . réseau']: "'fixe'",
    ['visio . durée']: 60,
    ['visio . appareil']: "'ordinateur portable'",
    ['visio . emplacements']: 2,
    ['visio . qualité']: "'HD'",
    ['visio . réseau']: "'mobile'",
  })

  for (const [slug, fullSlug] of Object.entries(slugMapping)) {
    try {
      const data = usageNumeriques.find((item) => item.slug === fullSlug)
      if (!data) {
        console.warn(`Aucune donnée trouvée pour le slug: ${fullSlug}`)
        continue
      }

      const ecv = [] as { id: number; value: number }[]

      for (const [id, key] of Object.entries(ecvMapping)) {
        const rule = `${slug}${key}`
        try {
          const value = evaluateNumber(engine, rule)
          ecv.push({ id: parseInt(id, 10), value: value / 1000 })
        } catch {
          console.log(`  ${rule}: non disponible`)
        }
      }

      data.ecv = ecv
      const total = data.ecv.reduce((sum, item) => sum + item.value, 0)
      console.log(`${slug}: ${total * 1000}`)
    } catch (error) {
      console.error(`Erreur lors de l'extraction de ${slug}:`, error)
    }
  }

  for (const [slug, duration] of Object.entries(casPartiqueMapping)) {
    try {
      const casItem = casPratiques.find((item) => item.slug === slug)
      if (!casItem) {
        console.warn(`Cas pratique ${slug} non trouvé`)
        continue
      }

      engine.setSituation({
        ['streaming . durée']: duration,
        ['streaming . appareil']: "'TV'",
        ['streaming . qualité']: "'HD'",
        ['streaming . réseau']: "'fixe'",
      })

      const result = evaluateNumber(engine, 'streaming') / 1000
      const construction = evaluateNumber(engine, 'streaming . terminaux . construction') / 1000
      const value = result - construction

      casItem.total = value
      console.log(`${slug}: ${value * 1000}`)
    } catch (error) {
      console.error(`Erreur pour ${slug}:`, error)
    }
  }
}
