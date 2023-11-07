import React from 'react'
import WebBlue from 'components/layout/WebBlue'
import ByArticle from 'components/views/home/ByArticle'
import ByOrder from 'components/views/home/ByOrder'
import ByTheme from 'components/views/home/ByTheme'
import Hero from 'components/views/home/Hero'
import NGCCard from 'components/views/home/NGCCard'

export default function Home() {
  return (
    <WebBlue title={'Accueil'}>
      <Hero />
      <ByTheme />
      <ByOrder />
      <ByArticle />
      <NGCCard />
    </WebBlue>
  )
}
