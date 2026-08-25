import rules from '@incubateur-ademe/publicodes-acv-numerique/publicodes-build/publicodes-acv-numerique.model.json'
import Engine from 'publicodes'
import { usageNumeriqueDefaultValues } from 'src/providers/usageNumeriqueDefaultValues'
import { categories } from 'data/categories'
import { deplacements } from 'data/categories/deplacement'
import { equivalentsByCategory } from 'src/utils/alimentation'
import { filterByDistance } from 'utils/transport'
import { evaluateNumber } from 'utils/useSituation'

type Deplacement = (typeof deplacements)[number]

type PlaneSubtitle = 'courtcourrier' | 'moyencourrier' | 'moyenlongcourrier' | 'longcourrier'

const getBySlug = (slug: string) => {
  const value = deplacements.find((deplacement) => deplacement.slug === slug)
  if (!value) {
    throw new Error(`Transport introuvable: ${slug}`)
  }
  return value as Deplacement
}

const getCategoryBySlug = (slug: string) => {
  const category = categories.find((current) => current.slug === slug)
  if (!category || !category.equivalents) {
    throw new Error(`Categorie introuvable: ${slug}`)
  }
  return category
}

const getEquivalentCategoryValue = (categorySlug: string, equivalentSlug: string) => {
  const category = getCategoryBySlug(categorySlug)
  const equivalent = category.equivalents?.find((current) => current.slug === equivalentSlug)
  if (!equivalent) {
    throw new Error(`Equivalent introuvable: ${categorySlug}/${equivalentSlug}`)
  }
  return equivalent.value
}

const getPerKm = (slug: string) => {
  if (slug === 'avion') {
    return getPlanePerKm('courtcourrier')
  }
  return getEquivalentCategoryValue('transport', slug)
}

const getPlanePerKm = (subtitle: PlaneSubtitle) => {
  return getEquivalentCategoryValue('transport', `avion-${subtitle}`)
}

const defaultDisplayedSlugs = (km: number) =>
  deplacements
    .filter((deplacement) => deplacement.default)
    .filter((deplacement) => !deplacement.ignore)
    .filter((deplacement) => filterByDistance(deplacement.display, km))
    .map((deplacement) => deplacement.slug)

const max = (values: number[]) => Math.max(...values)

describe('ordresDeGrandeurs transport', () => {
  describe('Mobilites actives / legeres', () => {
    it('Les mobilites actives restent moins emettrices que tous les modes motorises', () => {
      const activeSlugs = ['marche', 'velo']
      const motorizedSlugs = deplacements
        .filter((deplacement) => !deplacement.ignore)
        .filter((deplacement) => deplacement.type !== 'rail')
        .filter((deplacement) => !activeSlugs.includes(deplacement.slug))
        .map((deplacement) => deplacement.slug)

      const maxActive = max(activeSlugs.map(getPerKm))
      const minMotorized = Math.min(...motorizedSlugs.map(getPerKm))

      expect(maxActive).toBeLessThan(minMotorized)
    })

    it('Respecte marche < velo mecanique < velo electrique < velo cargo < trottinette electrique', () => {
      expect(getPerKm('marche')).toBeLessThan(getPerKm('velo'))
      expect(getPerKm('velo')).toBeLessThan(getPerKm('veloelectrique'))
      expect(getPerKm('veloelectrique')).toBeLessThan(getPerKm('triporteurelectrique'))
      expect(getPerKm('triporteurelectrique')).toBeLessThan(getPerKm('trottinette'))
    })

    it('Les mobilites actives sont affichees par defaut pour les petites distances (<= 30 km)', () => {
      const defaultsAt10Km = defaultDisplayedSlugs(10)
      expect(defaultsAt10Km).toEqual(expect.arrayContaining(['marche', 'velo', 'veloelectrique', 'trottinette']))

      const defaultsAt31Km = defaultDisplayedSlugs(31)
      expect(defaultsAt31Km).toEqual(expect.not.arrayContaining(['marche', 'velo', 'veloelectrique', 'trottinette']))
    })
  })

  describe('Transports en commun urbain', () => {
    it('Les transports en commun urbains restent moins emetteurs que la voiture individuelle thermique', () => {
      const voitureThermique = getPerKm('voiturethermique')
      ;['metro', 'tramway', 'rer', 'buselectrique', 'busthermique', 'autocar'].forEach((slug) => {
        expect(getPerKm(slug)).toBeLessThan(voitureThermique)
      })
    })

    it('Verification bus', () => {
      expect(getPerKm('buselectrique')).toBeLessThan(getPerKm('autocar'))
      expect(getPerKm('autocar')).toBeLessThan(getPerKm('busthermique'))
    })

    it('Le bus electrique est affiche par defaut', () => {
      expect(getBySlug('buselectrique').default).toBe(true)
    })
  })

  describe('Trains', () => {
    it('Tous les trains < voiture individuelle electrique, thermique, hybride < avion', () => {
      const trains = ['tgv', 'intercites', 'ter', 'rer']
      const maxTrain = max(trains.map(getPerKm))

      const voitureElectrique = getPerKm('voitureelectrique')
      const voitureThermique = getPerKm('voiturethermique')
      const voitureHybride = getPerKm('voiturehybride')
      const avionCourtCourrier = getPlanePerKm('courtcourrier')

      expect(maxTrain).toBeLessThan(voitureElectrique)
      expect(maxTrain).toBeLessThan(voitureThermique)
      expect(maxTrain).toBeLessThan(voitureHybride)

      expect(voitureElectrique).toBeLessThan(avionCourtCourrier)
      expect(voitureThermique).toBeLessThan(avionCourtCourrier)
      expect(voitureHybride).toBeLessThan(avionCourtCourrier)
    })
  })

  describe('Voiture', () => {
    it('Voiture electrique < voiture thermique a categorie equivalente', () => {
      expect(getPerKm('voiture-citadine-electrique')).toBeLessThan(getPerKm('voiture-citadine-essence'))
      expect(getPerKm('voiture-citadine-electrique')).toBeLessThan(getPerKm('voiture-citadine-diesel'))

      expect(getPerKm('voiture-compact-electrique')).toBeLessThan(getPerKm('voiture-compact-essence'))
      expect(getPerKm('voiture-compact-electrique')).toBeLessThan(getPerKm('voiture-compact-diesel'))

      expect(getPerKm('voiture-berline-electrique')).toBeLessThan(getPerKm('voiture-berline-essence'))
      expect(getPerKm('voiture-berline-electrique')).toBeLessThan(getPerKm('voiture-berline-diesel'))

      expect(getPerKm('voiture-grandeberline-electrique')).toBeLessThan(getPerKm('voiture-grandeberline-essence'))
      expect(getPerKm('voiture-grandeberline-electrique')).toBeLessThan(getPerKm('voiture-grandeberline-diesel'))
    })

    it('Pour un meme moteur: petite < moyenne < berline < SUV', () => {
      expect(getPerKm('voiture-citadine-essence')).toBeLessThan(getPerKm('voiture-compact-essence'))
      expect(getPerKm('voiture-compact-essence')).toBeLessThan(getPerKm('voiture-berline-essence'))
      expect(getPerKm('voiture-berline-essence')).toBeLessThan(getPerKm('voiture-grandeberline-essence'))

      expect(getPerKm('voiture-citadine-diesel')).toBeLessThan(getPerKm('voiture-compact-diesel'))
      expect(getPerKm('voiture-compact-diesel')).toBeLessThan(getPerKm('voiture-grandeberline-diesel'))
      expect(getPerKm('voiture-grandeberline-diesel')).toBeLessThan(getPerKm('voiture-berline-diesel'))

      expect(getPerKm('voiture-citadine-electrique')).toBeLessThan(getPerKm('voiture-compact-electrique'))
      expect(getPerKm('voiture-compact-electrique')).toBeLessThan(getPerKm('voiture-berline-electrique'))
      expect(getPerKm('voiture-berline-electrique')).toBeLessThan(getPerKm('voiture-grandeberline-electrique'))
    })
  })

  describe('Deux-roues motorises', () => {
    it('Scooter electrique < scooter thermique', () => {
      expect(getPerKm('scooterelectrique')).toBeLessThan(getPerKm('scooter'))
    })

    it('Scooter electrique affiche par defaut', () => {
      expect(getBySlug('scooterelectrique').default).toBe(true)
    })

    it('Petite moto (<250cm3) < moto moyenne (>250cm3)', () => {
      expect(getPerKm('moto-petite')).toBeLessThan(getPerKm('moto'))
    })
  })

  describe('Avion', () => {
    it('Avion > voiture individuelle (electrique, thermique, hybride) > train', () => {
      const avionCourtCourrier = getPlanePerKm('courtcourrier')
      const maxTrain = max(['tgv', 'intercites', 'ter', 'rer'].map(getPerKm))

      ;['voitureelectrique', 'voiturethermique', 'voiturehybride'].forEach((slug) => {
        const voiture = getPerKm(slug)
        expect(avionCourtCourrier).toBeGreaterThan(voiture)
        expect(voiture).toBeGreaterThan(maxTrain)
      })
    })

    it('Avion court > avion moyen > avion moyen-long > avion long (par km)', () => {
      expect(getPlanePerKm('courtcourrier')).toBeGreaterThan(getPlanePerKm('moyencourrier'))
      expect(getPlanePerKm('moyencourrier')).toBeGreaterThan(getPlanePerKm('longcourrier'))
      expect(getPlanePerKm('longcourrier')).toBeGreaterThan(getPlanePerKm('moyenlongcourrier'))
    })

    it("L'avion est le mode le plus bas de la liste des modes affiches par defaut", () => {
      const km = 300
      const defaults = defaultDisplayedSlugs(km)

      expect(defaults).toContain('avion')

      const plane = getPlanePerKm('courtcourrier')
      const others = defaults.filter((slug) => slug !== 'avion').map(getPerKm)

      expect(plane).toBeGreaterThan(max(others))
    })

    it('Avion moyen-long et long < van thermique quand on affiche tous les modes', () => {
      const van = getPerKm('van')

      expect(getPlanePerKm('moyenlongcourrier')).toBeLessThan(van)
      expect(getPlanePerKm('longcourrier')).toBeLessThan(van)
    })
  })
})

const usageNumeriqueEngine = new Engine(rules, { logger: { log: () => {}, warn: () => {}, error: () => {} } })

const evaluateDigitalUsage = (
  slug: 'email' | 'streaming' | 'visio',
  withConstruction: boolean,
  situation: Record<string, string | number>
) => {
  usageNumeriqueEngine.setSituation(situation)
  const total = evaluateNumber(usageNumeriqueEngine, slug)
  const construction = evaluateNumber(usageNumeriqueEngine, `${slug} . terminaux . construction`)

  return withConstruction ? total : total - construction
}

describe('ordresDeGrandeurs usages numeriques', () => {
  describe('Equipements', () => {
    it('L impact de la fabrication des appareils est superieur aux usages numeriques unitaires', () => {
      const fabricationValues = [
        getEquivalentCategoryValue('numerique', 'smartphone'),
        getEquivalentCategoryValue('numerique', 'ordinateurportable'),
        getEquivalentCategoryValue('numerique', 'television'),
      ]

      const usagesValues = [
        getEquivalentCategoryValue('usagenumerique', 'streamingvideo'),
        getEquivalentCategoryValue('usagenumerique', 'email'),
        getEquivalentCategoryValue('usagenumerique', 'visioconference'),
      ]

      const minFabrication = Math.min(...fabricationValues)
      const maxUsages = Math.max(...usagesValues)

      expect(minFabrication).toBeGreaterThan(maxUsages)
    })

    it('La fabrication augmente l impact carbone des usages numeriques', () => {
      ;(['email', 'streaming', 'visio'] as const).forEach((slug) => {
        const withoutConstruction = evaluateDigitalUsage(slug, false, usageNumeriqueDefaultValues)
        const withConstruction = evaluateDigitalUsage(slug, true, usageNumeriqueDefaultValues)

        expect(withConstruction).toBeGreaterThan(withoutConstruction)
      })
    })

    it('La duree de vie des appareils est valorisee', () => {
      const shortLifeSituation = {
        ...usageNumeriqueDefaultValues,
        ['visio . appareil']: "'smartphone'",
        ['smartphone . durée de vie']: 2,
      }

      const longLifeSituation = {
        ...usageNumeriqueDefaultValues,
        ['visio . appareil']: "'smartphone'",
        ['smartphone . durée de vie']: 8,
      }

      const shortLifeImpact = evaluateDigitalUsage('visio', true, shortLifeSituation)
      const longLifeImpact = evaluateDigitalUsage('visio', true, longLifeSituation)

      expect(longLifeImpact).toBeLessThan(shortLifeImpact)
    })
  })

  describe('Streaming', () => {
    it('Augmenter le nombre d heures de streaming augmente l impact carbone', () => {
      const oneHourSituation = {
        ...usageNumeriqueDefaultValues,
        ['streaming . durée']: 60,
      }

      const tenHoursSituation = {
        ...usageNumeriqueDefaultValues,
        ['streaming . durée']: 600,
      }

      const oneHourImpact = evaluateDigitalUsage('streaming', true, oneHourSituation)
      const tenHoursImpact = evaluateDigitalUsage('streaming', true, tenHoursSituation)

      expect(tenHoursImpact).toBeGreaterThan(oneHourImpact)
    })
  })

  describe('Visioconference', () => {
    it('Mettre la video augmente l impact carbone de la visioconference', () => {
      const audioSituation = {
        ...usageNumeriqueDefaultValues,
        ['visio . qualité']: "'audio'",
      }

      const videoSituation = {
        ...usageNumeriqueDefaultValues,
        ['visio . qualité']: "'SD'",
      }

      const audioImpact = evaluateDigitalUsage('visio', true, audioSituation)
      const videoImpact = evaluateDigitalUsage('visio', true, videoSituation)

      expect(videoImpact).toBeGreaterThan(audioImpact)
    })
  })
})

describe('ordresDeGrandeurs alimentation', () => {
  const getAlimentationValue = (slug: string) => getEquivalentCategoryValue('alimentation', slug)
  const getFruitEtLegumeValue = (slug: string) => getEquivalentCategoryValue('fruitsetlegumes', slug)

  describe('Viandes', () => {
    it('Boeuf > Veau > Porc > Volaille', () => {
      expect(getAlimentationValue('boeuf')).toBeGreaterThan(getAlimentationValue('veau'))
      expect(getAlimentationValue('veau')).toBeGreaterThan(getAlimentationValue('porc'))
      expect(getAlimentationValue('porc')).toBeGreaterThan(getAlimentationValue('poulet'))
    })

    it('Viandes > alternatives vegetales et vegetariennes > legumineuses', () => {
      const viandes = ['boeuf', 'veau', 'porc', 'poulet'].map(getAlimentationValue)
      const alternatives = ['tofu', 'oeuf', 'burgervegetarien'].map(getAlimentationValue)
      const legumineuses = ['lentilles', 'poischiches', 'haricotsrouges'].map(getAlimentationValue)

      const minViandes = Math.min(...viandes)
      const maxAlternatives = Math.max(...alternatives)
      const minAlternatives = Math.min(...alternatives)
      const maxLegumineuses = Math.max(...legumineuses)

      expect(minViandes).toBeGreaterThan(maxAlternatives)
      expect(minAlternatives).toBeGreaterThan(maxLegumineuses)
    })
  })

  describe('Repas', () => {
    it('Repas vegetalien < repas vegetarien < repas avec de la viande', () => {
      const vegan = getAlimentationValue('repasvegetalien')
      const vegetarien = getAlimentationValue('repasvegetarien')
      const repasViande = [
        getAlimentationValue('repasavecdupoulet'),
        getAlimentationValue('repasavecduporc'),
        getAlimentationValue('repasavecduveau'),
        getAlimentationValue('repasavecduboeuf'),
      ]

      expect(vegan).toBeLessThan(vegetarien)
      repasViande.forEach((value) => {
        expect(vegetarien).toBeLessThan(value)
      })
    })

    it('Repas vegetalien < repas vegetarien < repas avec du poisson', () => {
      const vegan = getAlimentationValue('repasvegetalien')
      const vegetarien = getAlimentationValue('repasvegetarien')
      const repasPoisson = [
        getAlimentationValue('repasavecdupoissongras'),
        getAlimentationValue('repasavecdupoissonblanc'),
      ]

      expect(vegan).toBeLessThan(vegetarien)
      repasPoisson.forEach((value) => {
        expect(vegetarien).toBeLessThan(value)
      })
    })
  })

  describe('Poisson', () => {
    it('Repas avec poisson gras < repas avec poisson blanc', () => {
      expect(getAlimentationValue('repasavecdupoissongras')).toBeLessThan(
        getAlimentationValue('repasavecdupoissonblanc')
      )
    })
  })

  describe('Alimentation', () => {
    it('Les fruits importes/exotiques cites sont les plus eleves', () => {
      const fruitsExotiques = ['mangue', 'banane', 'avocat']

      const alimentationCategory = equivalentsByCategory.group.find((group) => group.name === 'fruits')
      if (!alimentationCategory) {
        throw new Error('Category not found')
      }

      const maxFruitsValues = max(
        alimentationCategory.equivalents
          .filter((equivalent) => !fruitsExotiques.includes(equivalent.slug))
          .map((equivalent) => equivalent.value)
      )
      fruitsExotiques.forEach((slug) => {
        const value = getFruitEtLegumeValue(slug)
        expect(value).toBeGreaterThan(maxFruitsValues)
      })
    })
  })
})
