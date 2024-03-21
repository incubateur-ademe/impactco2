import data from 'data/categories.json'

export const categories = data.map(({ slug, emoji, name }) => ({
  slug,
  emoji,
  name,
}))

export const getCategory = (id: number) => data.find((category) => category.id === id)
