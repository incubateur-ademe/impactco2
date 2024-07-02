import { notFound } from 'next/navigation'
import React from 'react'
import { categories } from 'data/categories'
import Equivalent from 'components/outils/equivalents/Equivalent'
import { equivalentsSimulators } from 'components/outils/equivalents/simulators/equivalentsSimulators'

export async function generateStaticParams() {
  return categories.flatMap((category) =>
    category.equivalents
      ? category.equivalents.flatMap((equivalent) =>
          equivalent.carpool
            ? [
                {
                  tool: category.slug,
                  equivalent: equivalent.slug,
                },
                ...Array.from({ length: 4 }).map((value, index) => ({
                  tool: category.slug,
                  equivalent: `${equivalent.slug}+${index + 1}`,
                })),
              ]
            : [
                {
                  tool: category.slug,
                  equivalent: equivalent.slug,
                },
              ]
        )
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

  const [slug, carpool] = decodeURIComponent(params.equivalent).split('+')
  const equivalent = category.equivalents.find((equivalent) => equivalent.slug === slug)
  if (!equivalent) {
    return notFound()
  }
  return (
    <Equivalent
      category={category}
      equivalent={
        carpool ? { ...equivalent, carpool: Number(carpool), link: `${equivalent.link}+${carpool}` } : equivalent
      }
      simulator={equivalentsSimulators[equivalent.slug]}
    />
  )
}

export default page
