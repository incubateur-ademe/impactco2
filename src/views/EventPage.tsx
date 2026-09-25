import { CalendarEvent as CalendarEventType } from 'src/serverFunctions/calendarEvent'
import Breadcrumbs from 'src/components/breadcrumbs/Breadcrumbs'
import CalendarBanner from 'src/components/calendar/CalendarBanner'
import CalendarEvent from 'src/components/calendar/CalendarEvent'
import Block from 'src/components/layout/Block'

const EventPage = ({ event }: { event: CalendarEventType }) => {
  return (
    <>
      <Breadcrumbs
        current={event.title}
        links={[
          { label: 'Accueil', link: '/' },
          { label: 'Les outils', link: '/outils' },
          { label: 'Kit RSE', link: '/outils/kit-rse' },
          { label: 'Calendrier', link: '/outils/kit-rse/calendrier' },
        ]}
      />
      <Block>
        <CalendarBanner event={event} />
        <CalendarEvent event={event} />
      </Block>
    </>
  )
}

export default EventPage
