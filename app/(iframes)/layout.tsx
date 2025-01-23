import React from 'react'
import 'utils/iframeStyles.css'
import IFrameChild from 'components/layout/IFrameChild'
import IFrameTracking from 'components/layout/IFrameTracking'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <IFrameChild />
      <div className='main-iframe'>
        <IFrameTracking>{children}</IFrameTracking>
      </div>
    </>
  )
}

export default Layout
