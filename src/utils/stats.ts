import axios from 'axios'

export type Stats = {
  visits: number
  iframes: number
  api: number
  shared: number
  screenshots: number
  topUsers: { label: string; visits: number }[]
}

export const getMatomoStats = async (): Promise<Stats> => {
  const [allVisits, allEventsByCategory, allEventsByAction] = await Promise.all([
    await axios
      .post<
        { label: string; nb_visits: number }[]
      >('https://stats.data.gouv.fr?idSite=156&method=Actions.getPageUrls&format=JSON&module=API&period=year&date=2024-01-01&showColumns=nb_visits')
      .then((response) => response.data),
    await axios
      .post<
        { label: string; nb_visits: number; nb_events: number }[]
      >('https://stats.data.gouv.fr?idSite=156&method=Events.getCategory&format=JSON&module=API&period=year&date=2024-01-01&showColumns=nb_visits,nb_events')
      .then((response) => response.data),
    await axios
      .post<
        { label: string; nb_visits: number }[]
      >('https://stats.data.gouv.fr?idSite=156&method=Events.getAction&format=JSON&module=API&period=year&date=2024-01-01&showColumns=nb_visits')
      .then((response) => response.data),
  ])

  const iframes = allEventsByCategory.filter((event) => event.label.startsWith('IFrame_'))

  return {
    visits: allVisits.filter((visit) => visit.label !== 'iframes').reduce((acc, visit) => acc + visit.nb_visits, 0),
    iframes: iframes.reduce((acc, visit) => acc + visit.nb_visits, 0),
    api: allEventsByCategory
      .filter(
        (event) =>
          event.label.startsWith('API_') &&
          event.label !== 'API_Impact+CO2' &&
          event.label !== 'API_https://impactco2.fr/api-doc'
      )
      .reduce((acc, visit) => acc + visit.nb_events, 0),
    shared: allEventsByAction
      .filter((event) => event.label === 'Partager')
      .reduce((acc, visit) => acc + visit.nb_visits, 0),
    screenshots: allEventsByAction
      .filter((event) => event.label === 'Screenshot')
      .reduce((acc, visit) => acc + visit.nb_visits, 0),
    topUsers: iframes
      .sort((a, b) => b.nb_visits - a.nb_visits)
      .slice(0, 10)
      .map((event) => ({ label: event.label.replace('IFrame_', ''), visits: event.nb_visits })),
  }
}