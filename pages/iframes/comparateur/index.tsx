import React from 'react'
import Comparateur from 'components/comparateur/Comparateur'
import Iframe from 'components/layout/Iframe'

export default function convertisseur() {
  return (
    <Iframe noLogo>
      <Comparateur iframe />
    </Iframe>
  )
}
