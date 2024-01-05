import React, { useState } from 'react'
import { track } from 'utils/matomo'
import { Icon } from '../osezchanger/icons'
import { Box, Content, Copy } from './ClipboardBox.styles'

const ClipboardBox = ({ children, colored, tracking }: { children: string; colored?: boolean; tracking: string }) => {
  const [copied, setCopied] = useState(false)
  return (
    <Box
      $colored={colored}
      onClick={() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 500)
        navigator.clipboard.writeText(children)
        track(tracking, 'Copy', children)
      }}>
      <Content data-testid='clipboard-box'>{children}</Content>
      <Copy className='clipboard-right-item' $copied={copied}>
        {copied ? 'Copié' : 'Copier'}
        <Icon iconId={copied ? 'check' : 'copy'} />
      </Copy>
    </Box>
  )
}

export default ClipboardBox
