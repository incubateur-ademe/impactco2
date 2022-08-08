import React, { useContext } from 'react'

import DataContext from 'components/providers/DataProvider'
import Web from 'components/layout/Web'
import { TransportProvider } from 'components/transport/TransportProvider'
import Search from 'components/transport/Search'
import Itinerary from 'components/transport/Itinerary'

export default function Itineraire() {
  const { categories } = useContext(DataContext)
  const category = categories.find((item) => item.id === 4)
  return (
    <Web
      title={category.title}
      description={category.description}
      breadcrumb={{
        type: 'equivalent',
        category: category,
      }}
    >
      <TransportProvider>
        <Search itineraire />
        <Itinerary category={category} />
      </TransportProvider>
    </Web>
  )
}
