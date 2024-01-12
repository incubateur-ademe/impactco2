import React from 'react'
import ClipboardBox from '../../base/ClipboardBox'
import { Separator } from './Integration.styles'
import Usage from './Usage'

const Integration = () => {
  return (
    <div data-testid='integration-modal'>
      <ClipboardBox
        tracking='OsezChanger'
        colored>{`<script name="impact-co2" src="${process.env.NEXT_PUBLIC_URL}/iframe.js" data-type="habillement/osez-changer" data-search="?theme=default"></script>`}</ClipboardBox>
      <Separator />
      <Usage />
    </div>
  )
}

export default Integration
