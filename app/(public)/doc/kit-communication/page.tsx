import { Metadata } from 'next'
import KitCommunication from 'components/kit/KitCommunication'
import Suggestion from 'components/layout/Suggestion'

export const dynamic = 'force-static'
export const metadata: Metadata = {
  title: 'Kit de communication | Impact CO₂',
  description: 'Tout ce qu’il faut pour communiquer sur Impact CO₂.',
  openGraph: {
    creators: 'ADEME',
    images: `${process.env.NEXT_PUBLIC_URL}/meta/kit.png`,
  },
}

const KitCommunicationPage = () => {
  return (
    <>
      <KitCommunication />
      <Suggestion fromLabel='Kit de communication' simulatorName='du kit de communication' />
    </>
  )
}

export default KitCommunicationPage
