import { computedEquivalents } from 'src/providers/equivalents'

const getRandomEquivalent = (value: number, toIgnore: string[], category?: number) => {
  const allEquivalents = computedEquivalents
    .filter((equivalent) => equivalent.value)
    .filter((equivalent) => !toIgnore.includes(equivalent.slug))

  let meaningfullEquivalents = allEquivalents.filter(
    (equivalent) => value / equivalent.value >= 0.1 && value / equivalent.value <= 99_999
  )
  if (meaningfullEquivalents.length === 0) {
    meaningfullEquivalents = allEquivalents
  }

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

export const getRandomEquivalents = (value: number, current: string | undefined, length: number) => {
  const casPratique = getRandomEquivalent(value, current ? [current] : [], 13)
  if (length === 1) {
    return [casPratique]
  }
  const numerique = getRandomEquivalent(value, current ? [casPratique, current] : [casPratique], 1)
  if (length === 2) {
    return [casPratique, numerique]
  }

  const repas = getRandomEquivalent(value, current ? [casPratique, numerique, current] : [casPratique, numerique], 2)
  if (length === 3) {
    return [casPratique, numerique, repas]
  }

  const objects = [casPratique, numerique, repas]
  for (let i = 3; i < length; i++) {
    objects.push(getRandomEquivalent(value, current ? [...objects, current] : objects))
  }
  return objects
}

export const getFullRandomEquivalents = (value: number) => {
  const objects: string[] = []
  for (let i = 0; i < 3; i++) {
    objects.push(getRandomEquivalent(value, objects))
  }
  return objects
}

export const getRandomEquivalentsInCategory = (value: number, current: string | undefined, category: number) => {
  const allEquivalents = computedEquivalents.filter(
    (equivalent) => equivalent.category === category && current !== equivalent.slug
  )
  let meaningfullEquivalents = allEquivalents.filter(
    (equivalent) => value / equivalent.value >= 0.1 && value / equivalent.value <= 99_999
  )
  if (meaningfullEquivalents.length === 0) {
    meaningfullEquivalents = allEquivalents
  }
  const shuffled = [...meaningfullEquivalents].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.min(meaningfullEquivalents.length, 8))
}
