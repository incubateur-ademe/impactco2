import React from 'react'
import ClipboardBox from './ClipboardBox'
import { Separator } from './Integration.styles'
import Usage from './Usage'

const Integration = () => {
  return (
    <div data-testid='integration-modal'>
      <ClipboardBox>{`<script id="impact-co2" src="${window?.location.origin}/iframe.js" data-type="habillement/osez-changer" data-search="?theme=default"></script>`}</ClipboardBox>
      <Separator />
      <Usage />
    </div>
  )
}

export default Integration
