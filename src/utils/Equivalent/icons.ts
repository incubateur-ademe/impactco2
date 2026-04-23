import { buildCurrentUrlFor } from 'utils/urls'

const livraisonIconPattern = /^(magasin|pointrelais|clickcollect|livraisondomicile)(douce)?(2kg|15kg|30kg)?$/

const resolveIconSlug = (slug: string) => {
  if (slug.startsWith('avion-') && slug.endsWith('courrier')) {
    return 'avion'
  }

  if (slug.startsWith('voiture-')) {
    if (slug.endsWith('essence') || slug.endsWith('diesel')) {
      return 'voiturethermique'
    }

    if (slug.endsWith('electrique')) {
      return 'voitureelectrique'
    }

    if (slug.includes('hybride')) {
      return 'voiturehybride'
    }
  }

  const livraisonMatch = slug.match(livraisonIconPattern)
  if (livraisonMatch) {
    const [, mode, douce] = livraisonMatch
    return `${mode}${douce || ''}`
  }

  return slug
}

export const getEquivalentIcon = (slug: string, carpool?: number | string | boolean, customTheme?: string | null) => {
  let iconSlug = resolveIconSlug(slug)

  if (carpool) {
    iconSlug = `covoiturage${iconSlug}`
  }

  return buildCurrentUrlFor(`/icons/${iconSlug}${customTheme ? `-${customTheme}` : ''}.svg`)
}
