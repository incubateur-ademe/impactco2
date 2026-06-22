import { Metadata } from 'next'
import { Suspense } from 'react'
import { ParamProvider } from 'src/providers/ParamProvider'
import 'utils/iframeStyles.css'
import IFrameChild from 'components/layout/IFrameChild'
import IFrameTracking from 'components/layout/IFrameTracking'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <IFrameChild />
      <Suspense fallback={<div className='blank' />}>
        <ParamProvider>
          <div className='main-iframe'>
            <IFrameTracking>{children}</IFrameTracking>
          </div>
        </ParamProvider>
      </Suspense>
    </>
  )
}

export default Layout
