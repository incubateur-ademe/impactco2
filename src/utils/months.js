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
export const getMonth = (index) => ({
  long: new Date(2000, index).toLocaleString('fr-fr', { month: 'long' }),
  short: new Date(2000, index).toLocaleString('fr-fr', { month: 'short' }),
})
