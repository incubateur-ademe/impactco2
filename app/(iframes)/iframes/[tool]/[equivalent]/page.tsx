import { notFound } from 'next/navigation'
import React from 'react'
import { categories } from 'data/categories'
import Equivalent from 'components/outils/equivalents/Equivalent'

export async function generateStaticParams() {
  return categories.flatMap((category) =>
    category.equivalents
      ? category.equivalents.map((equivalent) => ({
          tool: category.slug,
          equivalent: equivalent.slug,
        }))
      : []
  )
}

type Props = {
  params: { tool: string; equivalent: string }
}

const page = ({ params }: Props) => {
  const category = categories.find((category) => category.slug === params.tool)
  if (!category || !category.equivalents) {
    return notFound()
  }
  const equivalent = category.equivalents.find((equivalent) => equivalent.slug === params.equivalent)
  if (!equivalent) {
    return notFound()
  }
  return <Equivalent category={category} equivalent={equivalent} />
}

export default page
