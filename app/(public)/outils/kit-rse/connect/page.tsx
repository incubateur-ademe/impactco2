import IframeConnect from 'components/connect/IFrameConnect'
import Suggestion from 'components/layout/Suggestion'
import Block from 'src/components/layout/Block'

export async function generateMetadata() {
  return {
    title: 'Obtenir le Kit RSE | Impact CO₂',
    description:
      'Vous êtes en charge des sujets RSE/RSO dans votre organisation ? Chaque année, l’ADEME met à votre disposition des kits de communication liés aux temps forts RSE, gratuits et prêts à l’emploi.',
    openGraph: {
      creators: 'ADEME',
      images: 'meta/kit-rse.webp',
    },
  }
}
const ConnectPage = () => {
  return (
    <>
      <Block title='Obtenir le Kit RSE' description='Accéder aux kits de communications pour l’année en cours'>
        <IframeConnect src={process.env.CONNECT_IFRAME} title='Laisser votre email pour acceder au Kit RSE' />
      </Block>
      <Suggestion fromLabel='Connect' simulatorName='du formulaire Kit RSE' noRDV />
    </>
  )
}

export default ConnectPage
