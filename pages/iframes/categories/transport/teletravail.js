import React, { useContext } from 'react'

import DataContext from 'components/providers/DataProvider'
import { TransportProvider } from 'components/transport/TransportProvider'
import Iframe from 'components/layout/Iframe'
import Search from 'components/transport/Search'
import Teletravail from 'components/transport/Teletravail'

export default function TeletravailPage() {
  const { categories } = useContext(DataContext)
  const category = categories.find((item) => item.id === 4)
  return (
    <Iframe>
      <TransportProvider>
        <Search teletravail iframe />
        <Teletravail />
      </TransportProvider>
    </Iframe>
  )
}
