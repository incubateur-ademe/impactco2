import React, { useState } from 'react'
import { track } from 'utils/matomo'
import { Icon } from '../osezchanger/icons'
import { Box, Content, Copy } from './ClipboardBox.styles'

const ClipboardBox = ({ children, colored }: { children: string; colored?: boolean }) => {
  const [copied, setCopied] = useState(false)
  return (
    <Box
      $colored={colored}
      onClick={() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 500)
        navigator.clipboard.writeText(children)
        track('OsezChanger', 'Copy', children)
      }}>
      <Content>{children}</Content>
      <Copy className='clipboard-right-item' $copied={copied}>
        {copied ? 'Copié' : 'Copier'}
        <Icon iconId={copied ? 'check' : 'copy'} />
      </Copy>
    </Box>
  )
}

export default ClipboardBox
