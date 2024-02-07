import { computedEquivalents } from 'components/providers/DataProvider'

export const getRandomEquivalent = (value: number, toIgnore: string[], category?: number) => {
  const meaningfullEquivalents = computedEquivalents.filter((equivalent) => !toIgnore.includes(equivalent.slug))

  let categoryEquivalents: typeof computedEquivalents = []
  if (category) {
    categoryEquivalents = meaningfullEquivalents.filter((equivalent) => equivalent.category === category)
  }
  if (categoryEquivalents.length === 0) {
    const categories = [...new Set(meaningfullEquivalents.map((equivalent) => equivalent.category))]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    categoryEquivalents = meaningfullEquivalents.filter((equivalent) => equivalent.category === randomCategory)
  }

  return categoryEquivalents[Math.floor(Math.random() * categoryEquivalents.length)].slug
}

export const getRandomEquivalents = (current: string | undefined, value: number, length: number) => {
  const transport = getRandomEquivalent(value, current ? [current] : [], 4)
  if (length === 1) {
    return [transport]
  }
  const numerique = getRandomEquivalent(value, current ? [current] : [], 1)
  if (length === 2) {
    return [transport, numerique]
  }

  const repas = getRandomEquivalent(value, current ? [current] : [], 2)
  if (length === 3) {
    return [transport, numerique, repas]
  }

  const objects = [transport, numerique, repas]
  for (let i = 3; i < length; i++) {
    objects.push(getRandomEquivalent(value, current ? [...objects, current] : objects))
  }
  return objects
}
