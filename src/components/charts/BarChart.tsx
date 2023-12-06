import React, { ReactNode } from 'react'
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
  })[]
  category: Category
}) {
  return (
    <Flipper flipKey={equivalents.map((equivalent) => equivalent.id).join()}>
      {equivalents
        .sort((a, b) => (a.value > b.value ? 1 : -1))
        .map((equivalent) => (
          <Flipped flipId={equivalent.id} key={equivalent.id}>
            <Item
              key={equivalent.id}
              onClick={() =>
                window?.please?.track(['trackEvent', 'Interaction', 'Navigation via graph categorie', equivalent.slug])
              }
              to={`/${category.slug}/${equivalent.slug}`}
              title={equivalent.title}
              subtitle={equivalent.subtitle}
              emoji={equivalent.emoji}
              secondEmoji={equivalent.secondEmoji}
              color={equivalent.color}
              value={equivalent.value}
              usage={'usage' in equivalent ? equivalent.usage : undefined}
              component={equivalent.component}
              max={equivalents[equivalents.length - 1].value}
            />
          </Flipped>
        ))}
    </Flipper>
  )
}
