import React, { useContext } from 'react'

import DataContext from 'components/providers/DataProvider'
import Iframe from 'components/layout/Iframe'
import { TransportProvider } from 'components/transport/TransportProvider'
import Search from 'components/transport/Search'
import Distance from 'components/transport/Distance'

export default function Transport() {
  const { categories } = useContext(DataContext)
  const category = categories.find((item) => item.id === 4)

  return (
    <Iframe>
      <TransportProvider>
        <Search distance iframe />
        <Distance category={category} />
      </TransportProvider>
    </Iframe>
  )
}
