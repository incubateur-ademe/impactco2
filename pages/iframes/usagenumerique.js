import React from 'react'
import categories from 'data/categories.json'
import Iframe from 'components/layout/Iframe'
import Category from 'components/numerique/Category'

export default function Numerique(props) {
  return (
    <Iframe noLogo>
      <Category category={props.category} iframe />
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
