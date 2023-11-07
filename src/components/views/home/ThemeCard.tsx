import React from 'react'
import categories from 'data/categories.json'
import { Card } from './ThemeCard.styles'

const ThemeCard = ({ slug }: { slug: string }) => {
  const item = categories.find((e) => e.slug === slug)
  return item ? (
    <Card href={`/${item.slug}`}>
      <div>{item.emoji}</div>
      {item.name}
    </Card>
  ) : null
}

export default ThemeCard
