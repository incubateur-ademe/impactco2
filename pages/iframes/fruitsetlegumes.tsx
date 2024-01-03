import React from 'react'
import { Category } from 'types/category'
import categories from 'data/categories.json'
import Saisons from 'components/fruitsetlegumes/Saisons'
import Iframe from 'components/layout/Iframe'

export default function Fruitsetlegumes({ category }: { category: Category }) {
  return (
    <Iframe noLogo>
      <Saisons category={category} iframe />
    </Iframe>
  )
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.id === 9),
    },
  }
}
