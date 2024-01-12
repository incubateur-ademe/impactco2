import { Priority } from './priority'

export const getBaseColor = (style?: Priority) => {
  if (!style) {
    return {
      color: 'primary',
      base: 50,
    }
  }

  const params = style.split('-')
  return {
    color: params[0],
    base: params[1] === 'dark' ? 60 : 50,
  }
}
