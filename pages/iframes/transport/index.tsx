import React from 'react'
import { Category } from 'types/category'
import categories from 'data/categories.json'
import Iframe from 'components/layout/Iframe'
import Distance from 'components/transport/Distance'

export default function DistancePage({ category }: { category: Category }) {
  return (
    <Iframe noLogo>
      <Distance category={category} iframe />
    </Iframe>
  )
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.id === 4),
    },
  }
}
