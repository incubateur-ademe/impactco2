import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: `Osez changer | Impact CO₂`,
  description:
    'En moyenne, les Français n’utilisent qu’un tiers des chaussures qu’ils possèdent. Et si on les aidait à désencombrer les placards ? Découvrez le nouveau challenge d’Impact CO2 !',
  openGraph: {
    creators: 'ADEME',
    images: `meta/osez-changer.png`,
  },
}

const page = async () => {
  redirect('/habillement#osez-changer')
}

export default page
