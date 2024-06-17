import { Metadata } from 'next'
import React from 'react'
import Home from 'components/home/Home'
import Suggestion from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: 'Accueil | Impact CO₂',
}

const HomePage = () => {
  return (
    <>
      <Home />
      <Suggestion fromLabel='Accueil' simulatorName='du site' />
    </>
  )
}

export default HomePage
