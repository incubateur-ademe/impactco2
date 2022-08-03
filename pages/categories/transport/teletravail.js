import React, { useContext } from 'react'

import DataContext from 'components/providers/DataProvider'
import Web from 'components/layout/Web'
import Search from 'components/transport/Search'
import { TransportProvider } from 'components/transport/TransportProvider'

export default function Teletravail() {
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
        <Search teletravail />
      </TransportProvider>
    </Web>
  )
}
