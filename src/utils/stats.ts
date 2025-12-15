'use server'

import axios from 'axios'

export type Stats = {
  visits: number
  iframes: number
  api: number
  shared: number
  screenshots: number
  topUsers: { label: string; visits: number }[]
}

const previousStats = {
  '2024': {
    visits: 781991,
    iframes: 2475309,
    api: 1882676,
    shared: 7123,
    screenshots: 18068,
    topUsers: [
      { label: 'https://immobilier.lefigaro.fr/', visits: 1569879 },
      { label: 'https://www.explorimmoneuf.com/', visits: 162515 },
      { label: 'https://immobilier.lefigaro.fr', visits: 55475 },
      { label: 'https://agirpourlatransition.ademe.fr/', visits: 52426 },
      { label: 'https://www.vendeeglobe.org/', visits: 37367 },
      {
        label:
          'https://agirpourlatransition.ademe.fr/particuliers/bureau/deplacements/calculer-emissions-carbone-trajets',
        visits: 30298,
      },
      { label: 'https://www.allibert-trekking.com/', visits: 26144 },
      { label: 'https://cabaretvert.com/', visits: 21725 },
      { label: 'https://avenirclimatique.org/', visits: 20798 },
      { label: 'https://www.terrabotanica.fr/', visits: 19456 },
    ],
  },
} as Record<string, Stats>

export const getMatomoStats = async (year: string): Promise<Stats> => {
  if (previousStats[year]) {
    return previousStats[year]
  }

  const [allVisits, allEventsByCategory, allEventsByAction] = await Promise.all([
    await axios
      .post<
        { label: string; nb_visits: number }[]
      >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&method=Actions.getPageUrls&format=JSON&module=API&period=year&date=${year}-01-01&showColumns=nb_visits&filter_limit=-1`)
      .then((response) => response.data),
    await axios
      .post<
        { label: string; nb_visits: number; nb_events: number }[]
      >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&method=Events.getCategory&format=JSON&module=API&period=year&date=${year}-01-01&showColumns=nb_visits,nb_events&filter_limit=-1`)
      .then((response) => response.data),
    await axios
      .post<
        { label: string; nb_visits: number }[]
      >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&method=Events.getAction&format=JSON&module=API&period=year&date=${year}-01-01&showColumns=nb_visits&filter_limit=-1`)
      .then((response) => response.data),
  ])

  const iframes = allEventsByCategory.filter((event) => event.label.startsWith('IFrame_'))

  return {
    visits: allVisits.filter((visit) => visit.label !== 'iframes').reduce((acc, visit) => acc + visit.nb_visits, 0),
    iframes: iframes.reduce((acc, visit) => acc + visit.nb_visits, 0),
    api: allEventsByCategory
      .filter((event) => event.label.startsWith('API'))
      .reduce((acc, visit) => acc + visit.nb_events, 0),
    shared: allEventsByAction
      .filter((event) => event.label === 'Partager')
      .reduce((acc, visit) => acc + visit.nb_visits, 0),
    screenshots: allEventsByAction
      .filter((event) => event.label === 'Screenshot')
      .reduce((acc, visit) => acc + visit.nb_visits, 0),
    topUsers: iframes
      .filter((event) => event.label !== 'IFrame_null')
      .sort((a, b) => b.nb_visits - a.nb_visits)
      .slice(0, 10)
      .map((event) => ({ label: event.label.replace('IFrame_', ''), visits: event.nb_visits })),
  }
}
