import React from 'react'
import SuggestionBanner from 'components/contact/SuggestionBanner'
import Web from 'components/layout/Web'
import ByArticle from 'components/views/home/ByArticle'
import ByOrder from 'components/views/home/ByOrder'
import ByTheme from 'components/views/home/ByTheme'
import Hero from 'components/views/home/Hero'
import NGCCard from 'components/views/home/NGCCard'

export default function Home() {
  return (
    <Web title='Accueil'>
      <Hero />
      <ByTheme />
      <ByOrder />
      <ByArticle />
      <NGCCard />
      <SuggestionBanner fromLabel='Accueil' simulatorName='site Impact CO₂' />
    </Web>
  )
}
