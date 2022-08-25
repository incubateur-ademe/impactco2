import React, { useContext } from 'react'

import DataContext from 'components/providers/DataProvider'
import Iframe from 'components/layout/Iframe'
import { TransportProvider } from 'components/transport/TransportProvider'
import Search from 'components/transport/Search'
import Itinerary from 'components/transport/Itinerary'

export default function Itineraire() {
  const { categories } = useContext(DataContext)
  const category = categories.find((item) => item.id === 4)
  return (
    <Iframe>
      <TransportProvider>
        <Search itineraire iframe />
        <Itinerary category={category} />
      </TransportProvider>
    </Iframe>
  )
}
