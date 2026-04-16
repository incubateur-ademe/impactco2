import { ComputedEquivalent, Equivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import values from './values.json'

const livraison: Record<string, Record<string, string>> = {
  magasin: {
    fr: "15km en voiture, colis d'1kg",
    en: '15km by car, 1kg package',
    es: '15km en coche, paquete de 1kg',
  },
  magasindouce: {
    fr: "à pied, colis d'1kg",
    en: 'by foot, 1kg package',
    es: 'a pie, paquete de 1kg',
  },
  clickcollect: {
    fr: "15km en voiture, colis d'1kg",
    en: '15km by car, 1kg package',
    es: '15km en coche, paquete de 1kg',
  },
  clickcollectdouce: {
    fr: "à pied, colis d'1kg",
    en: 'by foot, 1kg package',
    es: 'a pie, paquete de 1kg',
  },
  pointrelais: {
    fr: "3,5km en voiture, colis d'1kg",
    en: '3.5km by car, 1kg package',
    es: '3,5km en coche, paquete de 1kg',
  },
  pointrelaisdouce: {
    fr: "à pied, colis d'1kg",
    en: 'by foot, 1kg package',
    es: 'a pie, paquete de 1kg',
  },
  livraisondomicile: {
    fr: "colis d'1kg",
    en: '1kg package',
    es: 'paquete de 1kg',
  },
  magasin2kg: {
    fr: '15km en voiture, colis de 2kg',
    en: '15km by car, 2kg package',
    es: '15km en coche, paquete de 2kg',
  },
  magasindouce2kg: {
    fr: 'à pied, colis de 2kg',
    en: 'by foot, 2kg package',
    es: 'a pie, paquete de 2kg',
  },
  clickcollect2kg: {
    fr: '15km en voiture, colis de 2kg',
    en: '15km by car, 2kg package',
    es: '15km en coche, paquete de 2kg',
  },
  clickcollectdouce2kg: {
    fr: 'à pied, colis de 2kg',
    en: 'by foot, 2kg package',
    es: 'a pie, paquete de 2kg',
  },
  pointrelais2kg: {
    fr: '3,5km en voiture, colis de 2kg',
    en: '3.5km by car, 2kg package',
    es: '3,5km en coche, paquete de 2kg',
  },
  pointrelaisdouce2kg: {
    fr: 'à pied, colis de 2kg',
    en: 'by foot, 2kg package',
    es: 'a pie, paquete de 2kg',
  },
  livraisondomicile2kg: {
    fr: 'colis de 2kg',
    en: '2kg package',
    es: 'paquete de 2kg',
  },
  magasin15kg: {
    fr: '15km en voiture, colis de 15kg',
    en: '15km by car, 15kg package',
    es: '15km en coche, paquete de 15kg',
  },
  magasindouce15kg: {
    fr: 'à pied, colis de 15kg',
    en: 'by foot, 15kg package',
    es: 'a pie, paquete de 15kg',
  },
  clickcollect15kg: {
    fr: '15km en voiture, colis de 15kg',
    en: '15km by car, 15kg package',
    es: '15km en coche, paquete de 15kg',
  },
  clickcollectdouce15kg: {
    fr: 'à pied, colis de 15kg',
    en: 'by foot, 15kg package',
    es: 'a pie, paquete de 15kg',
  },
  pointrelais15kg: {
    fr: '3,5km en voiture, colis de 15kg',
    en: '3.5km by car, 15kg package',
    es: '3,5km en coche, paquete de 15kg',
  },
  pointrelaisdouce15kg: {
    fr: 'à pied, colis de 15kg',
    en: 'by foot, 15kg package',
    es: 'a pie, paquete de 15kg',
  },
  livraisondomicile15kg: {
    fr: 'colis de 15kg',
    en: '15kg package',
    es: 'paquete de 15kg',
  },
  magasin30kg: {
    fr: '15km en voiture, colis de 30kg',
    en: '15km by car, 30kg package',
    es: '15km en coche, paquete de 30kg',
  },
  magasindouce30kg: {
    fr: 'à pied, colis de 30kg',
    en: 'by foot, 30kg package',
    es: 'a pie, paquete de 30kg',
  },
  clickcollect30kg: {
    fr: '15km en voiture, colis de 30kg',
    en: '15km by car, 30kg package',
    es: '15km en coche, paquete de 30kg',
  },
  clickcollectdouce30kg: {
    fr: 'à pied, colis de 30kg',
    en: 'by foot, 30kg package',
    es: 'a pie, paquete de 30kg',
  },
  pointrelais30kg: {
    fr: '3,5km en voiture, colis de 30kg',
    en: '3.5km by car, 30kg package',
    es: '3,5km en coche, paquete de 30kg',
  },
  pointrelaisdouce30kg: {
    fr: 'à pied, colis de 30kg',
    en: 'by foot, 30kg package',
    es: 'a pie, paquete de 30kg',
  },
  livraisondomicile30kg: {
    fr: 'colis de 30kg',
    en: '30kg package',
    es: 'paquete de 30kg',
  },
}

const carpooling: Record<string, string> = {
  fr: 'Covoiturage',
  en: 'Carpooling',
  es: 'Compartir',
}

const carpoolingBasis: Record<string, Record<string, string>> = {
  voiturethermique: {
    fr: 'thermique',
    en: 'combustion',
    es: 'coche termico',
  },
  voitureelectrique: {
    fr: 'électrique',
    en: 'electric',
    es: 'coche eléctrico',
  },
  voiturehybride: {
    fr: 'hybride',
    en: 'hybrid',
    es: 'híbrido',
  },
}

const allValues: Record<string, { fr: string; en: string; es: string }> = {
  ...values,
  avion: {
    fr: 'avion',
    en: 'plane',
    es: 'avión',
  },
}

const getValues = (
  language: string,
  equivalent: Pick<Equivalent, 'category' | 'slug' | 'carpool'>
): { prefix: string; name: string } => {
  const [ref] = equivalent.slug.split('+')
  const value = allValues[ref]

  if (!value) {
    return { prefix: '', name: '' }
  }

  //@ts-expect-error: expect translation
  const translation = value[language] as string
  if (equivalent.carpool) {
    const carpool = carpooling[language]
    const [prefix, name] = translation.split(';')
    if (carpoolingBasis[ref]) {
      const basis = carpoolingBasis[ref][language]
      return { prefix, name: `${carpool} ${basis}` }
    }
    if (ref.startsWith('voiture-')) {
      if (ref.includes('electrique')) {
        return { prefix, name: `${carpool} ${carpoolingBasis.voitureelectrique[language]}` }
      }
      if (ref.includes('hybride')) {
        return { prefix, name: `${carpool} ${carpoolingBasis.voiturehybride[language]}` }
      }
      if (ref.includes('essence') || ref.includes('diesel')) {
        return { prefix, name: `${carpool} ${carpoolingBasis.voiturethermique[language]}` }
      }
    }
    return { prefix, name: `${carpool} ${name}` }
  }
  if (translation.includes('=')) {
    const [name, prefix] = translation.split('=')
    return {
      prefix,
      name,
    }
  }

  if (translation.includes(';')) {
    const [prefix, name] = translation.split(';')
    return {
      prefix,
      name,
    }
  }

  return {
    prefix: '',
    name: translation,
  }
}

export const getPrefix = (language: string, equivalent: Pick<Equivalent, 'category' | 'slug'>, value?: number) => {
  const { prefix } = getValues(language, equivalent)
  return prefix ? formatName(prefix, value || 1) : ''
}

export const getNameWithoutSuffix = (
  language: string,
  equivalent: Pick<Equivalent, 'category' | 'slug' | 'carpool'>,
  withPrefix?: boolean,
  value?: number,
  lowerCase?: boolean
) => {
  const { prefix, name } = getValues(language, equivalent)
  const formattedName = formatName(name, value || 1)
  const nameWithoutSuffix = `${withPrefix ? formatName(prefix, value || 1) : ''}${formattedName[0].toLowerCase()}${formattedName.slice(1)}`
  if (lowerCase) {
    return `${nameWithoutSuffix[0].toLowerCase()}${nameWithoutSuffix.slice(1)}`
      .replace(/\brer\b/i, 'RER')
      .replace(/\btgv\b/i, 'TGV')
      .replace(/\bter\b/i, 'TER')
      .replace(/\bgame of\b/i, 'Game of')
      .replace(/a\/r/i, 'A/R')
      .replace(/\bclick\b/i, 'Click')
  } else {
    return `${nameWithoutSuffix[0].toUpperCase()}${nameWithoutSuffix.slice(1)}`
  }
}
const sizes: Record<string, Record<string, string>> = {
  citadine: {
    fr: 'Petite',
    en: 'Small',
    es: 'Pequeña',
  },
  compact: {
    fr: 'Moyenne',
    en: 'Medium',
    es: 'Mediana',
  },
  berline: {
    fr: 'Berline',
    en: 'Sedan',
    es: 'Berlina',
  },
  grandeberline: {
    fr: 'SUV',
    en: 'SUV',
    es: 'SUV',
  },
}

const engines: Record<string, Record<string, string>> = {
  essence: {
    fr: 'Essence',
    en: 'Gasoline',
    es: 'Gasolina',
  },
  diesel: {
    fr: 'Diesel',
    en: 'Diesel',
    es: 'Diésel',
  },
  electrique: {
    fr: 'Électrique',
    en: 'Electric',
    es: 'Eléctrico',
  },
  hybride: {
    fr: 'Non rechargeable',
    en: 'Non rechargeable',
    es: 'No recargable',
  },
  hybriderechargeable: {
    fr: 'Rechargeable',
    en: 'Plug-in',
    es: 'Enchufable',
  },
}

const persons: Record<string, string> = {
  fr: 'personnes',
  en: 'people',
  es: 'personas',
}

const getExtraInfo = (language: string, slug: string) => {
  const infos = livraison[slug]
  if (infos) {
    return ` (${infos[language]})`
  }

  if (slug.startsWith('voiture') || (slug.startsWith('voiture') && slug.includes('+'))) {
    const [info, carpool] = slug.split('+')
    const [car, size, engine] = info.split('-')
    return size && sizes[size] && engine && engines[engine]
      ? ` (${sizes[size][language]} - ${engines[engine][language]}${carpool ? ` - ${Number.parseInt(carpool) + 1} ${persons[language]}` : ''})`
      : carpool
        ? ` (${Number.parseInt(carpool) + 1} ${persons[language]})`
        : ''
  }

  return ''
}

export const getName = (
  language: string,
  equivalent: Pick<Equivalent, 'category' | 'slug' | 'carpool'>,
  withPrefix?: boolean,
  value?: number,
  lowerCase?: boolean,
  extraInfo?: boolean
) => {
  const name = getNameWithoutSuffix(language, equivalent, withPrefix, value, lowerCase)
  return `${name}${extraInfo ? getExtraInfo(language, equivalent.slug) : ''}`
}

export const isEquivalentInMode = (equivalent: ComputedEquivalent, mode: string) =>
  mode === 'avion' ? equivalent.slug.startsWith('avion') : equivalent.slug === mode

export const getComparisonSlug = (slug: string) =>
  slug.startsWith('avion-') && slug.endsWith('courrier') ? 'avion' : slug
