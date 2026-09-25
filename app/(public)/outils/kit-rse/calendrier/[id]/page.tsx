import { notFound } from 'next/navigation'
import { getCalendarEventById } from 'src/serverFunctions/calendarEvent'
import EventPage from 'src/views/EventPage'
import Suggestion from 'components/layout/Suggestion'

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const event = await getCalendarEventById(id)
  if (!event) {
    return notFound()
  }
  return (
    <>
      <EventPage event={event} />
      <Suggestion fromLabel='Événement calendrier' simulatorName='du calendrier Kit RSE' />
    </>
  )
}
