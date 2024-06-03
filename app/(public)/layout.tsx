import React, { Suspense } from 'react'
import { ParamProvider } from 'src/providers/ParamProvider'
import Footer from 'components/layout/Footer'
import Header from 'components/layout/Header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Suspense fallback={<div className='blank' />}>
        <ParamProvider>
          <main id='contenu'>{children}</main>
        </ParamProvider>
      </Suspense>
      <Footer />
    </>
  )
}

export default Layout
