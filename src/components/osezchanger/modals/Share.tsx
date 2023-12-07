import React from 'react'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { buildCurrentUrlFor } from 'utils/urls'
import { Icon } from '../icons'
import ClipboardBox from './ClipboardBox'
import { Buttons, Text } from './Share.styles'
import Usage from './Usage'

const url = buildCurrentUrlFor('/habillement/osez-changer')
const Share = () => {
  return (
    <div data-testid='share-modal'>
      <ClipboardBox>{url}</ClipboardBox>
      <Text>ou</Text>
      <Buttons>
        <FacebookShareButton url={url} title='Partager sur facebook'>
          <Icon iconId='facebook' />
        </FacebookShareButton>
        <TwitterShareButton url={url} title='Partager sur twitter'>
          <Icon iconId='twitter' />
        </TwitterShareButton>
        <WhatsappShareButton url={url} title='Partager sur whatsapp'>
          <Icon iconId='whatsapp' />
        </WhatsappShareButton>
        <LinkedinShareButton url={url} title='Partager sur linkedin'>
          <Icon iconId='linkedin' />
        </LinkedinShareButton>
      </Buttons>
      <Usage />
    </div>
  )
}

export default Share
