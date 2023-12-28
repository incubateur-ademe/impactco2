import { CustomParamType } from './CustomParam'

export const buildCustomParamsUrl = (customValues: Record<string, CustomParamType> | null) => {
  if (!customValues) {
    return ''
  }
  return Object.entries(customValues)
    .filter(([, { visible }]) => visible)
    .map(([key, { value }]) => {
      if (typeof value === 'string') {
        return `${key}=${value}`
      }
      if ('start' in value) {
        if (value.start && value.end) {
          return `${key}Start=${value.start}&${key}End=${value.end}`
        }

        if (value.start) {
          return `${key}Start=${value.start}`
        }

        if (value.end) {
          return `${key}End=${value.end}`
        }

        return ''
      }

      return value.params
    })
    .join('&')
}
