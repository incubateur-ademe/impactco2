import axios from 'axios'
import { config } from 'dotenv'
import fs from 'fs'

config()

const internalPages: Record<string, string> = {
  quiz: 'Quiz',
  transport: 'Transport',
  'transport/itineraire': 'Transport',
  comparateur: 'Comparateur',
  fruitsetlegumes: 'Fruits et légumes',
  usagenumerique: 'Usage numérique',
  alimentation: 'Alimentation',
  numerique: 'Numérique',
  habillement: 'Habillement',
  boisson: 'Boisson',
  mobilier: 'Mobilier',
  chauffage: 'Chauffage',
  livraison: 'Livraison',
  teletravail: 'Télétravail',
}

const iframeToSimulateur: Record<string, string> = {
  '/iframes/%C2%ABtransport%C2%BB%C2%AB': 'Transport',
  '/iframes/%E2%80%9Etransport%E2%80%9C%E2%80%9E': 'Transport',
  '/iframes/%E2%80%98transport%E2%80%99%E2%80%98': 'Transport',
  '/iframes/transport/itineraire': 'Transport',
  '/iframes/transport': 'Transport',
  '/iframes/transport/marche': 'Marche',
  '/iframes/transport/ter': 'TER',
  '/iframes/transport/tramway': 'Tramway',
  '/iframes/transport/voitureelectrique': 'Voiture électrique',
  '/iframes/transport/voiturethermique': 'Voiture thermique',
  '/iframes/transport/voiturethermique+1': 'Voiture thermique (1 passager)',
  '/iframes/transport/autocar': 'Autocar',
  '/iframes/transport/avion-longcourrier': 'Avion long-courrier',
  '/iframes/transport/metro': 'Métro',
  '/iframes/transport/trottinette': 'Trottinette',
  '/iframes/comparateur/etiquette-animee': 'Étiquette',
  '/iframes/comparateur/etiquette': 'Étiquette',
  '/iframes/comparateur': 'Comparateur',
  '/iframes/habillement': 'Habillement',
  '/iframes/habillement/osez-changer': 'OsezChanger',
  '/iframes/habillement/chaussuresencuir': 'Paire de chaussures en cuir',
  '/iframes/habillement/vesteimpermeable': 'Veste imperméable',
  '/iframes/chauffage': 'Chauffage',
  '/iframes/chauffage/pompeachaleur': 'Pompe à chaleur',
  '/iframes/quiz': 'Quiz',
  '/iframes/quiz-infographie': 'Quiz infographie',
  '/iframes/repas': 'Repas',
  '/iframes/usagenumerique': 'Usage numérique',
  '/iframes/usagenumerique/email': 'Email',
  '/iframes/alimentation': 'Alimentation',
  '/iframes/alimentation/cheeseburger': 'Cheeseburger',
  '/iframes/alimentation/mozarella': 'Mozarella',
  '/iframes/alimentation/yaourt': 'Yaourt',
  '/iframes/fruitsetlegumes': 'Fruits et légumes',
  '/iframes/fruitsetlegumes/carotte': 'Carotte',
  '/iframes/fruitsetlegumes/laitue': 'Laitue',
  '/iframes/fruitsetlegumes/pomme': 'Pomme',
  '/iframes/livraison': 'Livraison',
  '/iframes/livraison/etiquette': 'Livraison étiquette',
  '/iframes/livraison/pointrelais': 'Livraison point relais',
  '/iframes/livraison/pointrelaisdouce': 'Livraison point relais douce',
  '/iframes/livraison/etiquette-animee': 'Livraison étiquette',
  '/iframes/teletravail': 'Télétravail',
  '/iframes/boisson': 'Boisson',
  '/iframes/boisson/cafe': 'Café',
  '/iframes/numerique': 'Numérique',
  '/iframes/numerique/alimentationsmartphone': 'Alimentation smartphone',
  '/iframes/numerique/smartphone': 'Smartphone',
  '/iframes/numerique/ordinateurportable': 'Ordinateur portable',
  '/iframes/numerique/ordinateurfixeparticulier': 'Ordinateur fixe particulier',
  '/iframes/mobilier': 'Mobilier',
  '/iframes/electromenager': 'Électroménager',
  '/iframes/electromenager/cafetieredosette': 'Cafetière dosette',
  '/iframes/electromenager/lavelinge': 'Lave-linge',
  '/iframes/detecteur': 'Détecteur',
  '/iframes/image-infographie/mangue/1': 'Mangue (infographie)',
  '/iframes/caspratiques': 'Cas pratiques',
  '/iframes/caspratiques/hotel': 'Cas pratiques hôtel',
  '/iframes/caspratiques/populationfrancaise': 'Cas pratiques population française',
  '/iframes/infographie': 'Infographie',
  '/iframes/electromenager/refrigirateur': 'Réfrigérateur',
  '/iframes/electromenager/climatiseur': 'Climatiseur',
  '/iframes/alimentation/fromagedure': 'Fromage dur',
  '/iframes/alimentation/poulet': 'Poulet',
  '/iframes/usagenumerique/streamingvideo': 'Streaming vidéo',
  '/iframes/caspratiques/camping': 'Nuit au camping',
  '/iframes/caspratiques/location': 'Nuit dans une location saisonnière',
  '/iframes/caspratiques/residencesecondaire': 'Nuit dans une résidence secondaire',
  '/iframes/usagenumerique/rechercheweb': 'Recherche web',
  '/iframes/alimentation/repasvegetalien': 'Repas végétalien',
  '/iframes/image-infographie/hotel/0': 'Hôtel (infographie)',
  '/iframes/electromenager/fourelectrique': 'Four électrique',
  '/iframes/image-infographie/hotel/1': 'Hôtel (infographie)',
  '/iframes/numerique/tabletteclassique': 'Tablette classique',
  '/iframes/electromenager/lavevaisselle': 'Lave-vaisselle',
  '/iframes/transport/avion-courtcourrier': 'Avion court-courrier',
  '/iframes/transport/teletravail': 'Télétravail',
  '/iframes/comparateur/etiquette-animee%3C': 'Étiquette',
  '/iframes/numerique/ecran': 'Écran',
  '/iframes/transport/itinerary': 'Transport',
  '/iframes/transport/tgv': 'TGV',
  '/iframes/numerique/television': 'Télévision',
}

type Row = {
  label: string
  nb_visits: number
  nb_events: number
  Events_EventCategory: string
  Events_EventName: string
}

const getStatsForMonth = async (month: string) => {
  const startDate = `${month}-01`

  const [pageVisits, events, devEvents] = await Promise.all([
    await axios
      .post<
        { label: string; nb_visits: number; url: string }[]
      >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&method=Actions.getPageUrls&format=JSON&module=API&period=month&date=${startDate}&showColumns=nb_visits&filter_limit=-1&flat=1`)
      .then((response) => response.data),
    axios
      .post<
        Row[]
      >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&method=Events.getCategory&secondaryDimension=eventName&format=JSON&module=API&period=month&date=${startDate}&showColumns=nb_visits,nb_events&filter_limit=-1&flat=1`)
      .then((r) => r.data),
    await axios
      .post<
        {
          label: string
          nb_visits: number
          nb_events: number
          Events_EventAction: string
          Events_EventCategory: string
        }[]
      >(
        `${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=156&method=Events.getCategory&secondaryDimension=eventAction&flat=1&format=JSON&module=API&period=month&date=${startDate}&showColumns=nb_visits,nb_events&filter_limit=-1`
      )
      .then((response) => response.data),
  ])
  const rows: Record<string, Record<string, { visit: number; engagement: number }>> = {}
  for (const page of pageVisits) {
    const segments = page.label.split('?')
    let simulateur =
      internalPages[(segments[0].startsWith('/') ? segments[0].slice(1) : segments[0]).replace('outils/', '')]
    if (!simulateur) {
      simulateur = 'Autres'
    }

    const site = 'Impact CO₂'
    if (!rows[site]) {
      rows[site] = {}
    }
    if (!rows[site][simulateur]) {
      rows[site][simulateur] = { visit: 0, engagement: 0 }
    }
    rows[site][simulateur].visit += page.nb_visits
  }

  for (const event of events) {
    if (event.Events_EventName === 'Autres') {
      continue
    }
    const values = event.Events_EventCategory.split('_')
    if (values[0] === 'Engagement') {
      let site = values.length === 3 ? values[2] : 'Impact CO₂'
      if (site.endsWith('/')) {
        site = site.slice(0, -1)
      }
      const simulateur = values[1]
      if (!rows[site]) {
        rows[site] = {}
      }
      if (!rows[site][simulateur]) {
        rows[site][simulateur] = { visit: 0, engagement: 0 }
      }
      rows[site][simulateur].engagement += event.nb_visits
    } else if (values[0] === 'IFrame') {
      let site = values[1]
      if (!site) {
        continue
      }
      if (site.endsWith('/')) {
        site = site.slice(0, -1)
      }
      if (!rows[site]) {
        rows[site] = {}
      }

      const simulateur = iframeToSimulateur[event.Events_EventName.split('?')[0]]
      if (!simulateur) {
        console.log(`Simulateur non mappé pour l'iframe : ${event.Events_EventName.split('?')[0]}`)
        return
      }
      if (!rows[site][simulateur]) {
        rows[site][simulateur] = { visit: 0, engagement: 0 }
      }
      rows[site][simulateur].visit += event.nb_visits
    }
  }

  for (const event of devEvents) {
    if (!event.Events_EventCategory.startsWith('Detecteur carbone_')) {
      continue
    }
    const values = event.Events_EventCategory.split('_')
    const site = values[1]
    if (!site) {
      continue
    }
    if (!rows[site]) {
      rows[site] = {}
    }
    const simulateur = 'Détecteur carbone'
    if (!rows[site][simulateur]) {
      rows[site][simulateur] = { visit: 0, engagement: 0 }
    }
    if (event.Events_EventAction === 'Click') {
      rows[site][simulateur].engagement += event.nb_visits
    } else if (event.Events_EventAction === 'View') {
      rows[site][simulateur].visit += event.nb_visits
    }
  }

  const filePath = `stats.csv`
  const dataRows = Object.entries(rows).flatMap(([site, simulateurs]) =>
    Object.entries(simulateurs).map(([simulateur, stats]) => {
      return `${month.split('-')[0]},${month.split('-')[1]},${site},"${simulateur}",${stats.visit},${stats.engagement}`
    })
  )

  fs.writeFileSync(filePath, dataRows.join('\n') + '\n')
  console.log(`Données ajoutées à : ${filePath}`)
}

const month = process.argv[2]

getStatsForMonth(month)
