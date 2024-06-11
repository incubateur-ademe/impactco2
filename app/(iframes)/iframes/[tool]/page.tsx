import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import Category from 'components/outils/Category'
import { getCategory } from 'utils/category'

type Props = { params: { tool: string } }

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const category = getCategory(params.tool)
  if (category) {
    return {
      title: `${category.name} | Impact CO₂`,
      description: category.description,
      openGraph: {
        creators: 'ADEME',
        images: `meta/${category.slug}.png`,
      },
    }
  }

  return parent as Metadata
}

const page = async ({ params }: Props) => {
  const category = getCategory(params.tool)
  if (category) {
    return <Category category={category} />
  }

  return notFound()
}

export default page
