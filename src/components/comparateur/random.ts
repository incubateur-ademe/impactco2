import { computedEquivalents } from 'src/providers/equivalents'

const getRandomEquivalent = (toIgnore: string[], category?: number) => {
  const meaningfullEquivalents = computedEquivalents
    .filter((equivalent) => equivalent.value)
    .filter((equivalent) => !toIgnore.includes(equivalent.slug))

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

export const getRandomEquivalents = (current: string | undefined, length: number) => {
  const casPratique = getRandomEquivalent(current ? [current] : [], 13)
  if (length === 1) {
    return [casPratique]
  }
  const numerique = getRandomEquivalent(current ? [current] : [], 1)
  if (length === 2) {
    return [casPratique, numerique]
  }

  const repas = getRandomEquivalent(current ? [current] : [], 2)
  if (length === 3) {
    return [casPratique, numerique, repas]
  }

  const objects = [casPratique, numerique, repas]
  for (let i = 3; i < length; i++) {
    objects.push(getRandomEquivalent(current ? [...objects, current] : objects))
  }
  return objects
}

export const getFullRandomEquivalents = () => {
  const objects: string[] = []
  for (let i = 0; i < 3; i++) {
    objects.push(getRandomEquivalent(objects))
  }
  return objects
}

export const getRandomEquivalentsInCategory = (current: string | undefined, category: number) => {
  const meaningfullEquivalents = computedEquivalents.filter(
    (equivalent) => equivalent.category === category && current !== equivalent.slug
  )
  const shuffled = [...meaningfullEquivalents].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.min(meaningfullEquivalents.length, 8))
}
