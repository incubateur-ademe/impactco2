import { notFound } from 'next/navigation'
import React from 'react'
import { categories } from 'data/categories'
import Equivalent from 'components/outils/equivalents/EquivalentPage'
import formatName from 'utils/formatName'
import Suggestion from 'components/layout/web/Suggestion'

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

const EquivalentPage = ({ params }: { params: { tool: string; equivalent: string } }) => {
  const category = categories.find((category) => category.slug === params.tool)

  if (!category || !category.equivalents) {
    return notFound()
  }
  const equivalent = category.equivalents.find((equivalent) => equivalent.slug === params.equivalent)
  if (!equivalent) {
    return notFound()
  }
  return (
    <>
      <Equivalent category={category} equivalent={equivalent} />
      <Suggestion
        from={equivalent.link}
        fromLabel={formatName(equivalent.name, 1, true)}
        simulatorName={`de l'objet ${category.name}`}
      />
    </>
  )
}

export default EquivalentPage
