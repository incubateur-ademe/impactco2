import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { getCalendarEventById } from 'src/serverFunctions/calendarEvent'
import EventPage from 'src/views/EventPage'
import { toolsJsonLd } from 'src/utils/jsonLd'
import Suggestion from 'components/layout/Suggestion'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const event = await getCalendarEventById(params.id)

  if (event) {
    return {
      title: `Kit RSE -${event.title} | Impact CO₂`,
      description:
        'Vous êtes en charge des sujets RSE/RSO dans votre organisation ? Chaque année, l’ADEME met à votre disposition des kits de communication liés aux temps forts RSE, gratuits et prêts à l’emploi.',
      openGraph: {
        creators: 'ADEME',
        images: 'meta/kit-rse.webp',
      },
    }
  }

  return parent as Metadata
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params

  const event = await getCalendarEventById(id)
  if (!event) {
    return notFound()
  }
  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsJsonLd['kit-rse']) }} />
      <EventPage event={event} />
      <Suggestion fromLabel='Événement calendrier' simulatorName='du calendrier Kit RSE' />
    </>
  )
}
