import React, { Suspense } from 'react'
import AlimentationSync from 'src/providers/stores/AlimentationSync'
import ChauffageSync from 'src/providers/stores/ChauffageSync'
import ComparateurSync from 'src/providers/stores/ComparateurSync'
import DistanceSync from 'src/providers/stores/DistanceSync'
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
        <AlimentationSync />
        <ComparateurSync />
        <ChauffageSync />
        <DistanceSync />
        <FruitsetlegumesSync />
        <GlobalSync />
        <ItineraireSync />
        <TeletravailSync />
        <ThemeSync />
        <TransportSync />
        <UsageNumeriqueSync />
      </Suspense>
      {children}s
    </>
  )
}

export default Layout
