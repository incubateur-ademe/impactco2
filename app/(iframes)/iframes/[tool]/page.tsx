import { notFound } from 'next/navigation'
import React from 'react'
import { categories } from 'data/categories'
import Category from 'components/outils/Category'
import { simulators } from 'components/outils/simulators'
import { getCategory } from 'utils/category'

type Props = { params: { tool: string } }

export async function generateStaticParams() {
  return categories.map((category) => ({ tool: category.slug }))
}

const page = ({ params }: Props) => {
  const category = getCategory(params.tool)
  if (category) {
    return <Category category={category} simulator={simulators[params.tool]} />
  }

  return notFound()
}

export default page
