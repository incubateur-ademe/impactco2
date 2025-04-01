import axios from 'axios'

export type Stats = {
  visits: number
  iframes: number
  api: number
  shared: number
  screenshots: number
  topUsers: { label: string; visits: number }[]
}

const relais = [
  'https://immobilier.lefigaro.fr',
  'https://www.explorimmoneuf.com',
  'https://www.salon-agriculture.com',
  'https://agirpourlatransition.ademe.fr',
  'https://inscription-event.com',
  'https://www.francetvinfo.fr',
  'https://www.stadefrance.com',
  'https://stream.francetvinfo.fr',
  'https://www.chateaunantes.fr',
  'https://www.zoo-la-fleche.com',
  'https://www.allibert-trekking.com',
  'https://www.arts-et-metiers.net',
  'https://www.belle-ile.com',
  'https://halles-cartoucherie.fr',
  'https://www.padja-hotel-spa.com',
  'https://www.vendeeglobe.org',
  'https://www.aquarium-larochelle.com',
  'https://www.rockenseine.com',
  'https://www.etudiant.gouv.fr',
  'https://avenirclimatique.org',
  'https://www.lesmachines-nantes.fr',
  'https://www.iledere.com',
  'https://www.gaite-lyrique.net',
  'https://www.terrabotanica.fr',
  'https://www.aquarium-st-malo.com',
]

export const getMatomoStats = async (begin: string, end: string) => {
  const allEventsByCategory = await axios
    .post<
      { label: string; nb_visits: number; nb_events: number }[]
    >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&method=Events.getCategory&format=JSON&module=API&period=range&date=${begin},${end}&showColumns=nb_visits,nb_events&filter_limit=-1`)
    .then((response) => response.data)

  const iframes = console.log(
    allEventsByCategory
      .filter((event) => event.label.startsWith('IFrame_'))
      .sort((a, b) => b.nb_visits - a.nb_visits)
      .map((event) => ({ label: event.label.replace('IFrame_', ''), visits: event.nb_visits }))
      .filter(({ label }) => relais.includes(label))
  )
}

getMatomoStats(process.argv[2], process.argv[3])
