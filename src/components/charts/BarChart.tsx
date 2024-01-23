import React, { ReactNode, useMemo } from 'react'
import { Flipped, Flipper } from 'react-flip-toolkit'
import { Category } from 'types/category'
import { BaseEquivalent } from 'types/equivalent'
import Item from './barChart/Item'

export default function BarChart({
  equivalents,
  category,
}: {
  equivalents: (Pick<BaseEquivalent, 'id' | 'slug' | 'emoji' | 'secondEmoji'> & {
    value: number
    component?: ReactNode
    title?: string
    subtitle?: string
    color?: string
    usage?: number
    onClick: () => void
  })[]
  category: Category
}) {
  const sortedEquivalent = useMemo(() => [...equivalents].sort((a, b) => (a.value > b.value ? 1 : -1)), [equivalents])

  return (
    <Flipper flipKey={equivalents.map((equivalent) => equivalent.id).join()}>
      {sortedEquivalent.map((equivalent) => {
        const id = equivalent.id || equivalent.slug
        return (
          <Flipped flipId={id} key={id}>
            <Item
              onClick={equivalent.onClick}
              to={`/${category.slug}/${equivalent.slug}`}
              title={equivalent.title}
              subtitle={equivalent.subtitle}
              emoji={equivalent.emoji}
              secondEmoji={equivalent.secondEmoji}
              color={equivalent.color}
              value={equivalent.value}
              slug={equivalent.slug}
              usage={equivalent.usage}
              max={sortedEquivalent[sortedEquivalent.length - 1].value}>
              {equivalent.component}
            </Item>
          </Flipped>
        )
      })}
    </Flipper>
  )
}
