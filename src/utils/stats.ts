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
  visits: 173320,
  iframes: 510558,
  api: 278971,
  shared: 1373,
  screenshots: 3356,
}

const previousIframes = [
  {
    label: 'IFrame_https://immobilier.lefigaro.fr/',
    nb_visits: 386401,
  },
  {
    label: 'IFrame_https://www.explorimmoneuf.com/',
    nb_visits: 40958,
  },
  {
    label:
      'IFrame_https://agirpourlatransition.ademe.fr/particuliers/bureau/deplacements/calculer-emissions-carbone-trajets',
    nb_visits: 16003,
  },
  {
    label: 'IFrame_https://agirpourlatransition.ademe.fr/',
    nb_visits: 9665,
  },
  {
    label: 'IFrame_https://www.allibert-trekking.com/',
    nb_visits: 8006,
  },
  {
    label: 'IFrame_https://avenirclimatique.org/',
    nb_visits: 7348,
  },
  {
    label: 'IFrame_https://www.arkeaultimchallengebrest.com/',
    nb_visits: 6908,
  },
  {
    label: 'IFrame_https://reg-livetrail.net/',
    nb_visits: 4060,
  },
  {
    label: 'IFrame_https://www.theatre-odeon.eu/',
    nb_visits: 3221,
  },
  {
    label: 'IFrame_https://www.theoasishouse.fr/',
    nb_visits: 2684,
  },
  {
    label: 'IFrame_https://app.gobetterway.fr/',
    nb_visits: 2648,
  },
  {
    label: 'IFrame_https://reseauactionclimat.org/',
    nb_visits: 2629,
  },
  {
    label: 'IFrame_https://fresquedelamobilite.org/',
    nb_visits: 1832,
  },
  {
    label:
      'IFrame_https://agirpourlatransition.ademe.fr/particuliers/bureau/numerique/calculez-lempreinte-carbone-usages-numeriques',
    nb_visits: 1827,
  },
  {
    label: 'IFrame_https://www.francetvinfo.fr/',
    nb_visits: 1797,
  },
  {
    label: 'IFrame_https://www.gstatic.com/',
    nb_visits: 1390,
  },
  {
    label: 'IFrame_https://tomo-clothing.com/',
    nb_visits: 1387,
  },
  {
    label: 'IFrame_https://it.normandie-tourisme.fr/',
    nb_visits: 1038,
  },
  {
    label: 'IFrame_https://selectra.info/',
    nb_visits: 1021,
  },
  {
    label:
      'IFrame_https://agirpourlatransition.ademe.fr/particuliers/conso/conso-responsable/impact-alimentation-sur-environnement',
    nb_visits: 982,
  },
  {
    label: 'IFrame_https://www.alpes-bivouac.com/',
    nb_visits: 920,
  },
  {
    label: 'IFrame_https://lavillette.com/',
    nb_visits: 759,
  },
  {
    label: 'IFrame_https://www.sandaya.fr/',
    nb_visits: 737,
  },
  {
    label: 'IFrame_https://arkeaultimchallengebrest.com/',
    nb_visits: 729,
  },
  {
    label: 'IFrame_https://montblanc.utmb.world/',
    nb_visits: 726,
  },
  {
    label: 'IFrame_https://www.luberon-apt.fr/',
    nb_visits: 644,
  },
  {
    label: 'IFrame_https://www.linfodurable.fr/',
    nb_visits: 626,
  },
  {
    label:
      'IFrame_https://agirpourlatransition.ademe.fr/particuliers/maison/economies-denergie-deau/simulateur-impact-carbone-chauffage',
    nb_visits: 608,
  },
  {
    label: 'IFrame_https://insanefestival.com/',
    nb_visits: 566,
  },
  {
    label: 'IFrame_https://www.chatelard-sj.org/',
    nb_visits: 561,
  },
  {
    label: 'IFrame_https://dromolib.fr/',
    nb_visits: 506,
  },
  {
    label: 'IFrame_https://theatre-odeon.eu/',
    nb_visits: 477,
  },
  {
    label: 'IFrame_https://www.menton-riviera-merveilles.fr/',
    nb_visits: 452,
  },
  {
    label: 'IFrame_https://www.sandaya.nl/',
    nb_visits: 442,
  },
]

export const getMatomoStats = async (): Promise<Stats> => {
  const [allVisits, allEventsByCategory, allEventsByAction] = await Promise.all([
    await axios
      .post<
        { label: string; nb_visits: number }[]
      >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&method=Actions.getPageUrls&format=JSON&module=API&period=year&date=2024-01-01&showColumns=nb_visits`)
      .then((response) => response.data),
    await axios
      .post<
        { label: string; nb_visits: number; nb_events: number }[]
      >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&method=Events.getCategory&format=JSON&module=API&period=year&date=2024-01-01&showColumns=nb_visits,nb_events`)
      .then((response) => response.data),
    await axios
      .post<
        { label: string; nb_visits: number }[]
      >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&method=Events.getAction&format=JSON&module=API&period=year&date=2024-01-01&showColumns=nb_visits`)
      .then((response) => response.data),
  ])

  const iframes = allEventsByCategory.filter((event) => event.label.startsWith('IFrame_'))
  previousIframes.forEach((previous) => {
    const iframe = iframes.find((x) => x.label === previous.label)
    if (iframe) {
      iframe.nb_visits += previous.nb_visits
    }
  })

  return {
    visits: allVisits
      .filter((visit) => visit.label !== 'iframes')
      .reduce((acc, visit) => acc + visit.nb_visits, previousStats.visits),
    iframes: iframes.reduce((acc, visit) => acc + visit.nb_visits, 0),
    api: allEventsByCategory
      .filter(
        (event) =>
          event.label.startsWith('API_') &&
          event.label !== 'API_Impact+CO2' &&
          event.label !== 'API_https://impactco2.fr/api-doc'
      )
      .reduce((acc, visit) => acc + visit.nb_events, previousStats.api),
    shared: allEventsByAction
      .filter((event) => event.label === 'Partager')
      .reduce((acc, visit) => acc + visit.nb_visits, previousStats.shared),
    screenshots: allEventsByAction
      .filter((event) => event.label === 'Screenshot')
      .reduce((acc, visit) => acc + visit.nb_visits, previousStats.screenshots),
    topUsers: iframes
      .sort((a, b) => b.nb_visits - a.nb_visits)
      .slice(0, 10)
      .map((event) => ({ label: event.label.replace('IFrame_', ''), visits: event.nb_visits })),
  }
}
