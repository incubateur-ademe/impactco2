'use server'

import React from 'react'
import { getExamples } from 'utils/examples'
import ExamplesList, { ExamplesListProps } from './ExamplesList'

const Examples = async ({
  filter,
  tool,
  ...rest
}: {
  filter: string
  tool?: string
} & Omit<ExamplesListProps, 'examples' | 'link' | 'linkLabel'>) => {
  const examples = await getExamples()
  return (
    <ExamplesList
      examples={examples
        .map((example) => ({
          ...example,
          links: example.links.filter((link) => link.tags.includes(filter)),
        }))
        .filter((example) => example.links.length > 0)}
      link={tool ? `/doc/exemples?tool=${encodeURI(tool)}` : '/doc/exemples'}
      linkLabel='Tous les exemples'
      {...rest}
    />
  )
}

export default Examples
