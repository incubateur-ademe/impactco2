import { Equivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import values from './values.json'

const m2: Record<string, string> = {
  fr: 'par m²',
  en: 'per m²',
  de: 'pro m²',
  es: 'por m²',
}

const carpooling: Record<string, string> = {
  fr: 'Covoiturage',
  en: 'Carpooling',
  de: 'Mitfahrgelegenheit',
  es: 'Compartir',
}

const passengers: Record<string, string> = {
  fr: 'passager[s]',
  en: 'passenger[s]',
  de: 'Passagier',
  es: 'pasajero[s]',
}

const getValues = (
  language: string,
  equivalent: Pick<Equivalent, 'category' | 'slug' | 'carpool'>
): { prefix: string; name: string } => {
  const value = (values as Record<string, { fr: string; en: string; de: string; es: string }>)[equivalent.slug]
  if (!value) {
    return { prefix: '', name: '' }
  }

  const carpool = equivalent.carpool ? `${carpooling[language]} ` : ''

  //@ts-expect-error: expect translation
  const translation = value[language]
  if (translation.includes('=')) {
    const [name, prefix] = translation.split('=')
    return {
      prefix,
      name: carpool + name,
    }
  }

  if (translation.includes(';')) {
    const [prefix, name] = translation.split(';')
    return {
      prefix,
      name: carpool + name,
    }
  }

  return {
    prefix: '',
    name: carpool + translation,
  }
}

export const getPrefix = (language: string, equivalent: Pick<Equivalent, 'category' | 'slug'>, value?: number) => {
  const { prefix } = getValues(language, equivalent)
  return prefix ? formatName(prefix, value || 1, true) : ''
}

export const getNameWithoutSuffix = (
  language: string,
  equivalent: Pick<Equivalent, 'category' | 'slug' | 'carpool'>,
  withPrefix?: boolean,
  value?: number
) => {
  const { prefix, name } = getValues(language, equivalent)
  return `${withPrefix ? formatName(prefix, value || 1) : ''}${formatName(name, value || 1, true)}`
}

export const getName = (
  language: string,
  equivalent: Pick<Equivalent, 'category' | 'slug' | 'carpool'>,
  withPrefix?: boolean,
  value?: number
) => {
  const name = getNameWithoutSuffix(language, equivalent, withPrefix, value)
  return `${name}${equivalent.category === 8 ? ` ${m2[language]}` : ''}${equivalent.carpool ? ` (${equivalent.carpool} ${formatName(passengers[language], equivalent.carpool)})` : ''}`
}
