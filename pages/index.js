import axios from 'axios'
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
      <button
        onClick={() => {
          throw new Error('Oulahlah')
        }}>
        DO NOT CLICK ME
      </button>
      <button
        onClick={() => {
          axios.get('/api/fail')
        }}>
        AND NOT THIS ONE
      </button>
      <Hero />
      <ByTheme />
      <ByOrder />
      <ByArticle />
      <NGCCard />
    </WebBlue>
  )
}
