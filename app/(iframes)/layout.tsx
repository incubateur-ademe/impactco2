import React, { Suspense } from 'react'
import { ParamProvider } from 'src/providers/ParamProvider'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<div className='blank' />}>
      <ParamProvider>
        <main className='main-container'>{children}</main>
      </ParamProvider>
    </Suspense>
  )
}

export default Layout
