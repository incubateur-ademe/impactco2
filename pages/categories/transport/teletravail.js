import React, { useContext } from 'react'

import DataContext from 'components/providers/DataProvider'
import { TransportProvider } from 'components/transport/TransportProvider'
import Web from 'components/layout/Web'
import Search from 'components/transport/Search'
import Teletravail from 'components/transport/Teletravail'
import Learning from 'components/transport/Learning'

export default function TeletravailPage() {
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
        <Teletravail />
        <Learning />
      </TransportProvider>
    </Web>
  )
}
