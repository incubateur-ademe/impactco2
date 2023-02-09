import categories from 'data/categories.json'
import React from 'react'

import Iframe from 'components/layout/Iframe'
import Teletravail from 'components/transport/Teletravail'
import { TransportProvider } from 'components/transport/TransportProvider'

export default function TeletravailPage(props) {
  return (
    <Iframe>
      <TransportProvider>
        <Teletravail category={props.category} iframe />
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
