import categories from 'data/categories.json'
import React from 'react'

export default function Livraison() {
  return <div>Impact Livraison</div>
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.slug === 'impactlivraison'),
    },
  }
}
