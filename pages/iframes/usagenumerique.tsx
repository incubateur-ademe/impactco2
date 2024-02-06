import React from 'react'
import { Category as CategoryType } from 'types/category'
import categories from 'data/categories.json'
import Iframe from 'components/layout/Iframe'
import Category from 'components/numerique/Category'

export default function Numerique({ category }: { category: CategoryType }) {
  return (
    <Iframe noLogo>
      <Category category={category} iframe />
    </Iframe>
  )
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.id === 10),
    },
  }
}
