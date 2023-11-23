import React from 'react'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { Icon } from '../icons'
import ClipboardBox from './ClipboardBox'
import { Buttons, Text } from './Share.styles'
import Usage from './Usage'

const url = 'https://impactco2.fr/habillement/osez-changer'
const Share = () => {
  return (
    <div data-testid='share-modal'>
      <ClipboardBox>{url}</ClipboardBox>
      <Text>ou</Text>
      <Buttons>
        <FacebookShareButton
          url={url}
          title='Partager sur facebook'
          onClick={() => window?.please?.track(['trackEvent', 'Share', 'Facebook', 'osez_changer_facebook'])}>
          <Icon iconId='facebook' />
        </FacebookShareButton>
        <TwitterShareButton
          url={url}
          title='Partager sur twitter'
          onClick={() => window?.please?.track(['trackEvent', 'Share', 'Twitter', 'osez_changer_twitter'])}>
          <Icon iconId='twitter' />
        </TwitterShareButton>
        <WhatsappShareButton
          url={url}
          title='Partager sur whatsapp'
          onClick={() => window?.please?.track(['trackEvent', 'Share', 'Whatsapp', 'osez_changer_whatsapp'])}>
          <Icon iconId='whatsapp' />
        </WhatsappShareButton>
        <LinkedinShareButton
          url={url}
          title='Partager sur linkedin'
          onClick={() => window?.please?.track(['trackEvent', 'Share', 'Linkedin', 'osez_changer_linkedin'])}>
          <Icon iconId='linkedin' />
        </LinkedinShareButton>
      </Buttons>
      <Usage />
    </div>
  )
}

export default Share
