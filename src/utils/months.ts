export const slugs = [
  'janvier',
  'fevrier',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'aout',
  'septembre',
  'octobre',
  'novembre',
  'decembre',
]

export const getMonthLabel = (month: number) => new Date(2000, month).toLocaleString('fr-fr', { month: 'long' })

export const monthsOptions = slugs.map((slug, index) => ({
  value: index,
  label: getMonthLabel(index),
}))
