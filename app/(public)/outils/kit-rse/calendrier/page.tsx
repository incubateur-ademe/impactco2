import { getCalendarEvents } from 'src/serverFunctions/calendarEvent'
import Calendar from 'src/components/outils/kitRse/Calendar'
import ViewCalendar from 'src/components/outils/kitRse/ViewCalendar'
import { toolsJsonLd } from 'src/utils/jsonLd'
import Suggestion from 'components/layout/Suggestion'

export async function generateMetadata() {
  return {
    title: 'Kit RSE - Calendrier | Impact CO₂',
    description:
      'Vous êtes en charge des sujets RSE/RSO dans votre organisation ? Chaque année, l’ADEME met à votre disposition des kits de communication liés aux temps forts RSE, gratuits et prêts à l’emploi.',
    openGraph: {
      creators: 'ADEME',
      images: 'meta/kit-rse.webp',
    },
  }
}

const CalendrierPage = async () => {
  const { upcoming, past } = await getCalendarEvents()

  return (
    <>
      <ViewCalendar />
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsJsonLd['kit-rse']) }} />
      <Calendar upcoming={upcoming} past={past} />
      <Suggestion fromLabel='Kit RSE Calendrier' simulatorName='du calendrier Kit RSE' />
    </>
  )
}

export default CalendrierPage
