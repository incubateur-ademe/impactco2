'use client'

import { Metadata } from 'next'
import ErrorPage from 'src/views/ErrorPage'
import Footer from 'components/layout/Footer'
import FooterBanner from 'components/layout/FooterBanner'
import Header from 'components/layout/Header'

export const metadata: Metadata = {
  title: 'Erreur inattendue | Impact CO₂',
}

const Error = () => {
  return (
    <>
      <Header />
      <main id='contenu' role='main' tabIndex={-1}>
        <ErrorPage />
        <FooterBanner />
      </main>
      <Footer />
    </>
  )
}

export default Error
