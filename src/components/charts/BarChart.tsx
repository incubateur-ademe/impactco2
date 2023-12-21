import React, { ReactNode, useMemo } from 'react'
import { Flipped, Flipper } from 'react-flip-toolkit'
import { Category } from 'types/category'
import { Equivalent } from 'types/equivalent'
import Item from './barChart/Item'

export default function BarChart({
  equivalents,
  category,
}: {
  equivalents: (Equivalent & {
    value: number
    component?: ReactNode
    title?: string
    subtitle?: string
    color?: string
    usage: number
    onClick: () => void
  })[]
  category: Category
}) {
  const sortedEquivalent = useMemo(() => [...equivalents].sort((a, b) => (a.value > b.value ? 1 : -1)), [equivalents])

  return (
    <Flipper flipKey={equivalents.map((equivalent) => equivalent.id).join()}>
      {sortedEquivalent.map((equivalent) => (
        <Flipped flipId={equivalent.id} key={equivalent.id}>
          <Item
            key={equivalent.id}
            onClick={equivalent.onClick}
            to={`/${category.slug}/${equivalent.slug}`}
            title={equivalent.title}
            subtitle={equivalent.subtitle}
            emoji={equivalent.emoji}
            secondEmoji={equivalent.secondEmoji}
            color={equivalent.color}
            value={equivalent.value}
            slug={equivalent.slug}
            usage={'usage' in equivalent ? equivalent.usage : undefined}
            component={equivalent.component}
            max={sortedEquivalent[sortedEquivalent.length - 1].value}
          />
        </Flipped>
      ))}
    </Flipper>
  )
}
