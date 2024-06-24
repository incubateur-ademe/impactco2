import axios from 'axios'

export type Stats = {
  visits: number
  iframes: number
  api: number
  shared: number
  screenshots: number
  topUsers: { label: string; visits: number }[]
}

const internalPages = [
  'transport',
  'transport/itineraire',
  'comparateur',
  'fruitsetlegumes',
  'usagenumerique',
  'repas',
  'numerique',
  'habillement',
  'boisson',
  'mobilier',
  'chauffage',
  'livraison',
]

export const getMatomoStats = async (date: string) => {
  const [allVisits, allEventsByCategory, allEventsByAction] = await Promise.all([
    await axios
      .post<
        { label: string; nb_visits: number }[]
      >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&method=Actions.getPageUrls&format=JSON&module=API&period=week&date=${date}&showColumns=nb_visits&filter_limit=-1&flat=1`)
      .then((response) => response.data),
    await axios
      .post<
        { label: string; nb_visits: number; nb_events: number }[]
      >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&method=Events.getCategory&format=JSON&module=API&period=week&date=${date}&showColumns=nb_visits,nb_events&filter_limit=-1`)
      .then((response) => response.data),
    await axios
      .post<
        { label: string; nb_visits: number }[]
      >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&method=Events.getAction&format=JSON&module=API&period=week&date=${date}&showColumns=nb_visits&filter_limit=-1`)
      .then((response) => response.data),
  ])

  const iframes = allEventsByCategory.filter((event) => event.label.startsWith('IFrame_'))
  const internalVisits: Record<string, number> = {}
  allVisits.forEach((page) => {
    const segments = page.label.split('?')
    const key = (segments[0].startsWith('/') ? segments[0].slice(1) : segments[0]).replace('outils/', '')
    if (internalPages.includes(key)) {
      if (internalVisits[key]) {
        internalVisits[key] += page.nb_visits
      } else {
        internalVisits[key] = page.nb_visits
      }
    }
  })

  const iframeVisits: Record<string, number> = {}
  allEventsByAction
    .filter((event) => event.label.startsWith('https://impactco2.fr/iframes/'))
    .forEach((event) => {
      const segments = event.label.split('?')
      const key = segments[0].replace('https://impactco2.fr/iframes/', '')
      if (iframeVisits[key]) {
        iframeVisits[key] += event.nb_visits
      } else {
        iframeVisits[key] = event.nb_visits
      }
    })

  const results = {
    visits: allVisits.reduce((acc, visit) => acc + visit.nb_visits, 0),
    iframes: iframes.reduce((acc, visit) => acc + visit.nb_visits, 0),
    api: allEventsByCategory
      .filter(
        (event) =>
          event.label.startsWith('API_') &&
          event.label !== 'API_Impact+CO2' &&
          event.label !== 'API_https://impactco2.fr/api-doc' &&
          event.label !== 'API_https://impactco2.fr/doc/api'
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
    topVisitInternal: Object.entries(internalVisits)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([label, visits]) => ({ label, visits })),
    topVisitIFrame: Object.entries(iframeVisits)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([label, visits]) => ({ label, visits })),
  }

  console.log(results)
}

getMatomoStats(process.argv[2])
