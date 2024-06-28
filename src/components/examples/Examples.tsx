'use server'

import React from 'react'
import { getExamples } from 'utils/examples'
import ExamplesList, { ExamplesListProps } from './ExamplesList'

const Examples = async ({
  filter,
  ...rest
}: {
  filter: string
} & Omit<ExamplesListProps, 'examples'>) => {
  const examples = await getExamples()
  return (
    <ExamplesList
      examples={examples
        .map((example) => ({
          ...example,
          links: example.links.filter((link) => link.tags.includes(filter)),
        }))
        .filter((example) => example.links.length > 0)}
      {...rest}
    />
  )
}

export default Examples
