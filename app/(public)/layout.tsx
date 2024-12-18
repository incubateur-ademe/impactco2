import React from 'react'
import Footer from 'components/layout/Footer'
import Header from 'components/layout/Header'

export const dynamic = 'force-static'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main id='contenu' role='main' tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
