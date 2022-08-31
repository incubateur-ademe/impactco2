import React from 'react'

import categories from 'data/categories.json'

import { TransportProvider } from 'components/transport/TransportProvider'
import Iframe from 'components/layout/Iframe'
import Distance from 'components/transport/Distance'

export default function Transport(props) {
  return (
    <Iframe>
      <TransportProvider>
        <Distance category={props.category} iframe />
      </TransportProvider>
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
