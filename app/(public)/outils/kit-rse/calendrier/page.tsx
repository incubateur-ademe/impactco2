import { getCalendarEvents } from 'src/serverFunctions/calendarEvent'
import Calendar from 'src/components/outils/kitRse/Calendar'
import Suggestion from 'components/layout/Suggestion'

export async function generateMetadata() {
  return {
    title: 'Calendrier Kit RSE | Impact CO₂',
    description: 'Accéder à des contenus prêts à l’emploi pour chaque temps fort',
    openGraph: {
      creators: 'ADEME',
      images: `meta/kit-rse.png`,
    },
  }
}

const CalendrierPage = async () => {
  const { upcoming, past } = await getCalendarEvents()

  return (
    <>
      <Calendar upcoming={upcoming} past={past} />
      <Suggestion fromLabel='Kit RSE Calendrier' simulatorName='du calendrier Kit RSE' />
    </>
  )
}

export default CalendrierPage
