import React, { useState } from 'react'
import { Icon } from '../icons'
import { Box, Copied, Copy } from './ClipboardBox.styles'

const ClipboardBox = ({ children }: { children: string }) => {
  const [copied, setCopied] = useState(false)
  return (
    <Box
      onClick={() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 500)
        navigator.clipboard.writeText(children)
      }}>
      {children}
      <Copy>
        <Icon iconId='copy' />
      </Copy>
      {copied && <Copied>Copié</Copied>}
    </Box>
  )
}

export default ClipboardBox
