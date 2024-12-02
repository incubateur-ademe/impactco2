import axios from 'axios'

export const getMatomoStats = async () => {
  const allEventsByCategory = await axios
    .post<
      { label: string; nb_visits: number; nb_events: number; Events_EventAction: string }[]
    >(`https://stats.data.gouv.fr?idSite=156&method=Events.getCategory&secondaryDimension=eventAction&flat=1&format=JSON&module=API&period=year&date=today&showColumns=nb_visits,nb_events&filter_limit=-1`)
    .then((response) => response.data)

  const detecteurEvents = allEventsByCategory.filter((event) => event.label.startsWith('Detecteur carbone_'))
  console.log(
    'Vue du detecteur (jusqua mi juillet):',
    detecteurEvents
      .filter((event) => event.Events_EventAction === 'View')
      .reduce((acc, event) => acc + event.nb_visits, 0)
  )
  console.log(
    'Action du detecteur (jusqua mi juillet):',
    detecteurEvents
      .filter((event) => event.Events_EventAction !== 'View')
      .reduce((acc, event) => acc + event.nb_events, 0)
  )

  console.log(
    'Vue étiquette :',
    allEventsByCategory
      .filter(
        (event) => event.Events_EventAction && event.Events_EventAction.includes('iframes/comparateur/etiquette?')
      )
      .reduce((acc, event) => acc + event.nb_visits, 0)
  )
  console.log('Action étiquette :', 0)

  console.log(
    'Vue quiz :',
    allEventsByCategory
      .filter((event) => event.Events_EventAction && event.Events_EventAction.includes('iframes/quiz?'))
      .reduce((acc, event) => acc + event.nb_visits, 0)
  )
  console.log(
    'Action quiz :',
    allEventsByCategory
      .filter((event) => event.label.startsWith('Quiz_'))
      .reduce((acc, event) => acc + event.nb_events, 0)
  )

  console.log(
    'Vue iframe comparateur :',
    allEventsByCategory
      .filter((event) => event.Events_EventAction && event.Events_EventAction.includes('iframes/comparateur?'))
      .reduce((acc, event) => acc + event.nb_visits, 0)
  )
  console.log(
    'Vue iframe transport :',
    allEventsByCategory
      .filter((event) => event.Events_EventAction && event.Events_EventAction.includes('iframes/transport'))
      .reduce((acc, event) => acc + event.nb_visits, 0)
  )
}

getMatomoStats()
