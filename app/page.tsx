import React from 'react'
import Home from 'components/home/Home'
import Suggestion from 'components/layout/web/Suggestion'

const HomePage = async () => {
  return (
    <>
      <Home />
      <Suggestion fromLabel='Accueil' simulatorName='du site' />
    </>
  )
}

export default HomePage
