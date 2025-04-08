import { Metadata } from 'next'
import React from 'react'
import Doc from 'components/doc/Doc'
import Suggestion from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: 'Documentation | Impact CO₂',
}

const DocPage = () => {
  return (
    <>
      <Doc />
      <Suggestion fromLabel='Doc' simulatorName='de la documentation' />
    </>
  )
}

export default DocPage
