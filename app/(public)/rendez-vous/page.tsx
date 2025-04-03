import { Metadata } from 'next'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import RendezVous from 'components/contact/RendezVous'
import Footerbanner from 'components/layout/FooterBanner'

export const metadata: Metadata = {
  title: 'Prendre rendez-vous | Impact CO₂',
  description:
    "Besoin d'aide ou d'accompagnement dans vos projets de sensibilisation ? Prendre rendez-vous avec l'équipe Impact CO2",
}

const RDVPage = () => {
  return (
    <>
      <Breadcrumbs current='Prendre rendez-vous' links={[{ label: 'Accueil', link: '/' }]} />
      <RendezVous />
      <Footerbanner />
    </>
  )
}

export default RDVPage
