import React from 'react'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { Icon } from '../icons'
import ClipboardBox from './ClipboardBox'
import { Button, Buttons, Text } from './Share.styles'
import Usage from './Usage'

const url = 'https://impactco2.fr/habillement?osez-changer=true'
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
          <Button>
            <Icon iconId='facebook' />
          </Button>
        </FacebookShareButton>
        <TwitterShareButton
          url={url}
          title='Partager sur twitter'
          onClick={() => window?.please?.track(['trackEvent', 'Share', 'Twitter', 'osez_changer_twitter'])}>
          <Button>
            <Icon iconId='twitter' />
          </Button>
        </TwitterShareButton>
        <WhatsappShareButton
          url={url}
          title='Partager sur whatsapp'
          onClick={() => window?.please?.track(['trackEvent', 'Share', 'Whatsapp', 'osez_changer_whatsapp'])}>
          <Button>
            <Icon iconId='whatsapp' />
          </Button>
        </WhatsappShareButton>
        <LinkedinShareButton
          url={url}
          title='Partager sur linkedin'
          onClick={() => window?.please?.track(['trackEvent', 'Share', 'Linkedin', 'osez_changer_linkedin'])}>
          <Button>
            <Icon iconId='linkedin' />
          </Button>
        </LinkedinShareButton>
      </Buttons>
      <Usage />
    </div>
  )
}

export default Share
