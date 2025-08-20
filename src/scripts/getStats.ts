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
  'quiz',
  'transport',
  'transport/itineraire',
  'comparateur',
  'fruitsetlegumes',
  'usagenumerique',
  'alimentation',
  'numerique',
  'habillement',
  'boisson',
  'mobilier',
  'chauffage',
  'livraison',
  'teletravail',
]

export const getMatomoStats = async (date: string) => {
  const lastWeek = new Date(date)
  lastWeek.setDate(lastWeek.getDate() - 7)

  const [
    allVisits,
    allEventsByCategory,
    allEventsByAction,
    lastWeekEventsByCategory,
    allEventsGroupedOnDev,
    allEventsOnDev,
  ] = await Promise.all([
    await axios
      .post<
        { label: string; nb_visits: number; url: string }[]
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
    await axios
      .post<
        { label: string; nb_visits: number; nb_events: number }[]
      >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&method=Events.getCategory&format=JSON&module=API&period=week&date=${lastWeek.toISOString().split('T')[0]}&showColumns=nb_visits,nb_events&filter_limit=-1`)
      .then((response) => response.data),
    await axios
      .post<
        { label: string; nb_visits: number; nb_events: number; Events_EventAction: string }[]
      >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=156&method=Events.getCategory&secondaryDimension=eventAction&flat=1&format=JSON&module=API&period=week&date=${date}&showColumns=nb_visits,nb_events&filter_limit=-1`)
      .then((response) => response.data),
    await axios
      .post<
        { label: string; nb_visits: number }[]
      >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=156&method=Events.getCategory&format=JSON&module=API&period=week&date=${date}&showColumns=nb_visits,nb_events&filter_limit=-1`)
      .then((response) => response.data),
  ])

  const impactco2Visits = allVisits.filter(
    (page) =>
      page.url && (page.url.startsWith('https://impactco2.fr/') || page.url.startsWith('https://www.impactco2.fr/'))
  )
  const iframes = allEventsByCategory.filter((event) => event.label.startsWith('IFrame_'))
  const lastWeekIframes = lastWeekEventsByCategory.filter((event) => event.label.startsWith('IFrame_'))

  const internalVisits: Record<string, number> = {}
  impactco2Visits.forEach((page) => {
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

  const detectorEvents = allEventsGroupedOnDev.filter((event) => event.label.startsWith('Detecteur carbone_'))
  const detectorVisit: Record<string, number> = {}
  allEventsOnDev
    .filter((event) => event.label.startsWith('Detecteur carbone_'))
    .forEach((event) => {
      const infos = event.label.replace('Detecteur carbone_', '').split('/')
      const key = infos[2]
      if (detectorVisit[key]) {
        detectorVisit[key] += event.nb_visits
      } else {
        detectorVisit[key] = event.nb_visits
      }
    })
  const results = {
    visits: impactco2Visits.reduce((acc, visit) => acc + visit.nb_visits, 0),
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
    detectorViews: detectorEvents
      .filter((event) => event.Events_EventAction === 'View')
      .reduce((acc, event) => acc + event.nb_visits, 0),
    detectorClick: detectorEvents
      .filter((event) => event.Events_EventAction === 'Click')
      .reduce((acc, event) => acc + event.nb_events, 0),
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
    topDetectorIFrame: Object.entries(detectorVisit)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([label, visits]) => ({ label: `https://${label}`, visits })),
    newIframe: iframes
      .filter((iframe) => !lastWeekIframes.find((lastWeek) => lastWeek.label === iframe.label))
      .sort((a, b) => b.nb_visits - a.nb_visits)
      .slice(0, 10)
      .map((event) => ({ label: event.label.replace('IFrame_', ''), visits: event.nb_visits })),
  }

  console.log(results)
}

getMatomoStats(process.argv[2])
