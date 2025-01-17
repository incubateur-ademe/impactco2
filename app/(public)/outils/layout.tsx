import React, { Suspense } from 'react'
import FruitsetlegumesSync from 'src/providers/stores/FruitsetlegumesSync'
import GlobalSync from 'src/providers/stores/GlobalSync'
import ItineraireSync from 'src/providers/stores/ItineraireSync'
import TeletravailSync from 'src/providers/stores/TeletravailSync'
import ThemeSync from 'src/providers/stores/ThemeSync'
import TransportSync from 'src/providers/stores/TransportSync'
import UsageNumeriqueSync from 'src/providers/stores/UsageNumeriqueSync'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Suspense>
        <FruitsetlegumesSync />
        <GlobalSync />
        <ItineraireSync />
        <TeletravailSync />
        <ThemeSync />
        <TransportSync />
        <UsageNumeriqueSync />
      </Suspense>
      {children}
    </>
  )
}

export default Layout
