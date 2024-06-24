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
  return <ExamplesList examples={examples.filter((example) => example.tags.includes(filter))} {...rest} />
}

export default Examples
