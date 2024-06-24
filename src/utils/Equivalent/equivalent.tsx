import { Equivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import values from './values.json'

const m2: Record<string, string> = {
  fr: 'par m²',
  en: 'per m²',
  de: 'pro m²',
  es: 'por m²',
}

const getValues = (
  language: string,
  equivalent: Pick<Equivalent, 'category' | 'slug'>
): { prefix: string; name: string } => {
  const value = (values as Record<string, { fr: string; en: string; de: string; es: string }>)[equivalent.slug]

  if (!value) {
    return { prefix: '', name: '' }
  }

  //@ts-expect-error: expect translation
  const translation = value[language]
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
  return formatName(prefix, value || 1, true)
}

export const getName = (
  language: string,
  equivalent: Pick<Equivalent, 'category' | 'slug'>,
  withPrefix?: boolean,
  value?: number
) => {
  const { prefix, name } = getValues(language, equivalent)
  return `${withPrefix ? formatName(prefix, value || 1) : ''}${formatName(name, value || 1, true)}${equivalent.category === 8 ? ` ${m2[language]}` : ''}`
}
