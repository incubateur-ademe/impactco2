import React from 'react'
import Iframe from 'components/layout/Iframe'
import OsezChanger from 'components/osezchanger/OsezChanger'

const OsezChangerIframe = () => {
  return (
    <Iframe noLogo>
      <OsezChanger iframe />
    </Iframe>
  )
}

export default OsezChangerIframe
