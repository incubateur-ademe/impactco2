import React from 'react'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { track } from 'utils/matomo'
import { buildCurrentUrlFor } from 'utils/urls'
import ClipboardBox from '../../base/ClipboardBox'
import FacebookIcon from '../../base/icons/facebook'
import LinkedinIcon from '../../base/icons/linkedin'
import TwitterIcon from '../../base/icons/twitter'
import WhatsappIcon from '../../base/icons/whatsapp'
import { Buttons, Text } from './Share.styles'
import Usage from './Usage'

const url = buildCurrentUrlFor('/habillement/osez-changer')
const Share = () => {
  return (
    <div data-testid='share-modal'>
      <ClipboardBox tracking='OsezChanger'>{url}</ClipboardBox>
      <Text>ou</Text>
      <Buttons>
        <FacebookShareButton
          url={url}
          title='Partager sur facebook'
          onClick={() => track('OsezChanger', 'Share Facebook', 'osez_changer_facebook')}>
          <FacebookIcon />
        </FacebookShareButton>
        <TwitterShareButton
          url={url}
          title='Partager sur twitter'
          onClick={() => track('OsezChanger', 'Share Twitter', 'osez_changer_twitter')}>
          <TwitterIcon />
        </TwitterShareButton>
        <WhatsappShareButton
          url={url}
          title='Partager sur whatsapp'
          onClick={() => track('OsezChanger', 'Share Whatsapp', 'osez_changer_whatsapp')}>
          <WhatsappIcon />
        </WhatsappShareButton>
        <LinkedinShareButton
          url={url}
          title='Partager sur linkedin'
          onClick={() => track('OsezChanger', 'Share Linkedin', 'osez_changer_linkedin')}>
          <LinkedinIcon />
        </LinkedinShareButton>
      </Buttons>
      <Usage />
    </div>
  )
}

export default Share
