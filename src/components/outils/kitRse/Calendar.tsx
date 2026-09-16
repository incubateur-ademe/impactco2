import { Suspense } from 'react'
import { CalendarEvents } from 'src/serverFunctions/calendarEvent'
import { formatCalendarDates } from 'src/utils/dates'
import Breadcrumbs from 'src/components/breadcrumbs/Breadcrumbs'
import ToolCards from 'src/components/cards/ToolCards'
import FAQs from 'src/components/faq/FAQs'
import Block from 'src/components/layout/Block'

const formatEventToTool = (event: CalendarEvents[number]) => {
  const startDate = new Date(event.startDate)
  const endDate = event.endDate ? new Date(event.endDate) : null

  const now = new Date()
  const startDateUTC = new Date(
    Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate(), 0, 0, 0, 0)
  )
  const endDateUTC = endDate
    ? new Date(Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate(), 23, 59, 59, 999))
    : new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate(), 23, 59, 59, 999))

  const isNow = now >= startDateUTC && now <= endDateUTC

  return {
    slug: event.id,
    id: event.id,
    title: event.title,
    subTitle: formatCalendarDates(startDate, endDate),
    linkLabel: 'accéder',
    image: `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.fr-par.scw.cloud/${event.image}.png`,
    link: `/outils/kit-rse/calendrier/${event.id}`,
    now: isNow,
  }
}

const Calendar = ({ upcoming, past }: { upcoming: CalendarEvents; past: CalendarEvents }) => {
  return (
    <>
      <Breadcrumbs
        current='Calendrier'
        links={[
          { label: 'Accueil', link: '/' },
          { label: 'Les outils', link: '/outils' },
          { label: 'Kit RSE', link: '/outils/kit-rse' },
        ]}
      />
      <Block title='Calendrier' as='h1' description='Accéder à des contenus prêts à l’emploi pour chaque temps fort' />
      {upcoming.length > 0 && (
        <Block title='À venir' description='Préparez vos actions pour les prochains temps forts'>
          <ToolCards tools={upcoming.map(formatEventToTool)} />
        </Block>
      )}

      {past.length > 0 && (
        <Block title='Passés' description='Retrouvez les contenus des temps forts précédents'>
          <ToolCards tools={past.map(formatEventToTool)} />
        </Block>
      )}

      {upcoming.length === 0 && past.length === 0 && (
        <Block>
          <div>
            <p>Aucun événement disponible pour le moment.</p>
          </div>
        </Block>
      )}
      <Block title='Partager le kit RSE' description='Vous souhaitez diffuser le Kit RSE à votre écosystème ?'>
        <ToolCards
          tools={[
            {
              horizontal: true,
              title: 'Visuels de promotion du kit RSE',
              description: '3 visuels pour promouvoir le kit et ses temps forts auprès de votre réseau.',
              slug: 'visuel-kit-rse',
              link: '/kit/kit-rse-exemples.zip',
              linkLabel: 'Télécharger (.ZIP)',
            },
          ]}
        />
      </Block>
      <Suspense>
        <FAQs filter='Kit RSE' page='Kit RSE' />
      </Suspense>
    </>
  )
}

export default Calendar
