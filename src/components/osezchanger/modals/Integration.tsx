import React from 'react'
import ClipboardBox from './ClipboardBox'
import { Separator } from './Integration.styles'
import Usage from './Usage'

const Integration = () => {
  return (
    <div data-testid='integration-modal'>
      <ClipboardBox>{`<script id="datagir-impact-co2" src="${window?.location.origin}/iframe.js" data-type="osez-changer" data-search="?theme=default"></script>`}</ClipboardBox>
      <Separator />
      <Usage />
    </div>
  )
}

export default Integration
