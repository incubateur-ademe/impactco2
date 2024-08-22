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

export const getMonthLabel = (month: number) => new Date(2000, month).toLocaleString('fr', { month: 'long' })

export const monthsOptions = slugs.map((slug, index) => ({
  value: index,
  label: getMonthLabel(index),
}))

const getSingleMonth = (month: number, language: string) => {
  if (language === 'en') {
    return `in ${new Date(2000, month).toLocaleString('en', { month: 'long' })}`
  }
  if (language === 'es') {
    return `en ${new Date(2000, month).toLocaleString('es', { month: 'long' })}`
  }
  return `en ${new Date(2000, month).toLocaleString('fr', { month: 'long' })}`
}
const getBothMonths = (start: number, end: number, language: string) => {
  if (language === 'en') {
    return `from ${new Date(2000, start).toLocaleString('en', { month: 'long' })} to ${new Date(2000, end).toLocaleString('en', { month: 'long' })}`
  }
  if (language === 'es') {
    return `de ${new Date(2000, start).toLocaleString('es', { month: 'long' })} a ${new Date(2000, end).toLocaleString('fr', { month: 'long' })}`
  }
  return `de ${new Date(2000, start).toLocaleString('fr', { month: 'long' })} à ${new Date(2000, end).toLocaleString('fr', { month: 'long' })}`
}

const getFullYear = (language: string) => {
  if (language === 'en') {
    return 'all year long'
  }
  if (language === 'es') {
    return 'todo el año'
  }
  return "toute l'année"
}

export const getMonthsLabel = (months: number[], language: string) => {
  const sortedMonths = months.sort((a, b) => a - b)
  const starts = sortedMonths.filter(
    (month) => !(month === 0 ? sortedMonths.includes(11) : sortedMonths.includes(month - 1))
  )
  const ends = sortedMonths.filter(
    (month) => !(month === 11 ? sortedMonths.includes(0) : sortedMonths.includes(month + 1))
  )

  const values = []
  for (let i = 0; i < starts.length; i++) {
    const start = starts[i]
    const end = ends[i]
    if (start === end) {
      values.push(getSingleMonth(start, language))
    } else {
      values.push(getBothMonths(start, end, language))
    }
  }

  const result = values.length === 0 ? getFullYear(language) : values.join(', ')
  return `${result[0].toUpperCase()}${result.slice(1)}.`
}
