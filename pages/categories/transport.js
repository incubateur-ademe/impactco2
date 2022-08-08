import React, { useContext } from 'react'

import DataContext from 'components/providers/DataProvider'
import Web from 'components/layout/Web'
import { TransportProvider } from 'components/transport/TransportProvider'
import Search from 'components/transport/Search'
import Distance from 'components/transport/Distance'

export default function Transport() {
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
        <Search distance />
        <Distance category={category} />
      </TransportProvider>
    </Web>
  )
}
