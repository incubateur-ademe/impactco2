import { Equivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import values from './values.json'

const m2: Record<string, string> = {
  fr: 'par m²',
  en: 'per m²',
  de: 'pro m²',
  es: 'por m²',
}

const carpooling: Record<string, Record<string, string>> = {
  voiturethermique: {
    fr: 'Covoiturage thermique',
    en: 'Carpooling combustion',
    de: 'Mitfahrgelegenheit Thermoauto',
    es: 'Compartir coche termico',
  },
  voitureelectrique: {
    fr: 'Covoiturage électrique',
    en: 'Carpooling electric',
    de: 'Mitfahrgelegenheit Elektroauto',
    es: 'Compartir coche eléctrico',
  },
}

const passengers: Record<string, string> = {
  fr: 'passager[s]',
  en: 'passenger[s]',
  de: 'Passagier',
  es: 'pasajero[s]',
}

const allValues: Record<string, { fr: string; en: string; de: string; es: string }> = {
  ...values,
  avion: {
    fr: 'avion',
    en: 'plane',
    de: 'flugzeug',
    es: 'avión',
  },
}

const getValues = (
  language: string,
  equivalent: Pick<Equivalent, 'category' | 'slug' | 'carpool'>
): { prefix: string; name: string } => {
  const value = allValues[equivalent.slug]
  if (!value) {
    return { prefix: '', name: '' }
  }

  //@ts-expect-error: expect translation
  const translation = value[language]
  if (translation.includes('=')) {
    const [name, prefix] = translation.split('=')
    return {
      prefix,
      name: equivalent.carpool ? `${carpooling[equivalent.slug][language]} ` : name,
    }
  }

  if (translation.includes(';')) {
    const [prefix, name] = translation.split(';')
    return {
      prefix,
      name: equivalent.carpool ? `${carpooling[equivalent.slug][language]} ` : name,
    }
  }

  return {
    prefix: '',
    name: equivalent.carpool ? `${carpooling[equivalent.slug][language]} ` : translation,
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
  return `${name}${equivalent.category === 8 ? ` ${m2[language]}` : ''}${equivalent.carpool ? `(${equivalent.carpool} ${formatName(passengers[language], equivalent.carpool)})` : ''}`
}
