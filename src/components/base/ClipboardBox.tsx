import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { track } from 'utils/matomo'
import { Icon } from '../osezchanger/icons'
import { Box, Content, Copy, Information } from './ClipboardBox.styles'

const ClipboardBox = ({ children, colored, tracking }: { children: string; colored?: boolean; tracking: string }) => {
  const [copied, setCopied] = useState(false)
  const t = useTranslations('clipboard')
  return (
    <>
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
          {copied ? t('copie') : t('copier')}
          <Icon iconId={copied ? 'check' : 'copy'} />
        </Copy>
      </Box>
      {children.startsWith('<script') && (
        <Information>
          <Icon iconId='information' />
          {t('information-1')}
          <br />
          {t('information-2')}
        </Information>
      )}
    </>
  )
}

export default ClipboardBox
