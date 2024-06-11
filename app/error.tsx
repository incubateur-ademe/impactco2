'use client'

import { Metadata } from 'next'
import React from 'react'
import ErrorPage from 'src/views/ErrorPage'
import Footer from 'components/layout/Footer'
import Header from 'components/layout/Header'
import Suggestion from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: 'Erreur inattendue | Impact CO₂',
}

const Error = () => {
  return (
    <>
      <Header />
      <main id='contenu'>
        <ErrorPage />
        <Suggestion fromLabel='Erreur inattendue' simulatorName='du site' />
      </main>
      <Footer />
    </>
  )
}

export default Error
