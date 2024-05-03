import { CustomParamValue } from './CustomParam'

export const buildCustomParamsUrl = (
  params: Record<string, CustomParamValue> | undefined,
  visibility: Record<string, boolean> | null
) => {
  if (!visibility || !params) {
    return ''
  }
  return Object.entries(visibility)
    .filter(([, visible]) => visible)
    .map(([key]) => {
      const param = params[key]
      if ('setter' in param) {
        return param.value ? `${key}=${param.value}` : ''
      }

      if ('start' in param) {
        if (param.start && param.start.value && param.end && param.end.value) {
          return `${key}Start=${param.start.value}&${key}End=${param.end.value}`
        }

        if (param.start && param.start.value) {
          return `${key}Start=${param.start.value}`
        }

        if (param.end && param.end.value) {
          return `${key}End=${param.end.value}`
        }

        return ''
      }

      return param.params
    })
    .join('&')
}
