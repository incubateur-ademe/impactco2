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
  visits: 174560,
  iframes: 524149,
  api: 279526,
  shared: 1373,
  screenshots: 3356,
}

const previousIframes = [
  { label: 'IFrame_https://immobilier.lefigaro.fr/', nb_visits: 386406 },
  { label: 'IFrame_https://www.explorimmoneuf.com/', nb_visits: 40960 },
  {
    label:
      'IFrame_https://agirpourlatransition.ademe.fr/particuliers/bureau/deplacements/calculer-emissions-carbone-trajets',
    nb_visits: 16003,
  },
  {
    label: 'IFrame_https://agirpourlatransition.ademe.fr/',
    nb_visits: 9666,
  },
  { label: 'IFrame_https://www.allibert-trekking.com/', nb_visits: 8006 },
  { label: 'IFrame_https://avenirclimatique.org/', nb_visits: 7349 },
  {
    label: 'IFrame_https://www.arkeaultimchallengebrest.com/',
    nb_visits: 6908,
  },
  { label: 'IFrame_https://reg-livetrail.net/', nb_visits: 4060 },
  { label: 'IFrame_https://www.theatre-odeon.eu/', nb_visits: 3221 },
  { label: 'IFrame_https://www.theoasishouse.fr/', nb_visits: 2684 },
  { label: 'IFrame_https://app.gobetterway.fr/', nb_visits: 2648 },
  { label: 'IFrame_https://reseauactionclimat.org/', nb_visits: 2629 },
  { label: 'IFrame_https://fresquedelamobilite.org/', nb_visits: 1832 },
  {
    label:
      'IFrame_https://agirpourlatransition.ademe.fr/particuliers/bureau/numerique/calculez-lempreinte-carbone-usages-numeriques',
    nb_visits: 1827,
  },
  { label: 'IFrame_https://www.francetvinfo.fr/', nb_visits: 1797 },
  { label: 'IFrame_https://www.gstatic.com/', nb_visits: 1390 },
  { label: 'IFrame_https://tomo-clothing.com/', nb_visits: 1387 },
  { label: 'IFrame_https://it.normandie-tourisme.fr/', nb_visits: 1038 },
  { label: 'IFrame_https://selectra.info/', nb_visits: 1021 },
  {
    label:
      'IFrame_https://agirpourlatransition.ademe.fr/particuliers/conso/conso-responsable/impact-alimentation-sur-environnement',
    nb_visits: 982,
  },
  { label: 'IFrame_https://www.alpes-bivouac.com/', nb_visits: 920 },
  { label: 'IFrame_https://lavillette.com/', nb_visits: 759 },
  { label: 'IFrame_https://www.sandaya.fr/', nb_visits: 737 },
  {
    label: 'IFrame_https://arkeaultimchallengebrest.com/',
    nb_visits: 729,
  },
  { label: 'IFrame_https://montblanc.utmb.world/', nb_visits: 726 },
  { label: 'IFrame_https://www.luberon-apt.fr/', nb_visits: 644 },
  { label: 'IFrame_https://www.linfodurable.fr/', nb_visits: 626 },
  {
    label:
      'IFrame_https://agirpourlatransition.ademe.fr/particuliers/maison/economies-denergie-deau/simulateur-impact-carbone-chauffage',
    nb_visits: 608,
  },
  { label: 'IFrame_https://insanefestival.com/', nb_visits: 566 },
  { label: 'IFrame_https://www.chatelard-sj.org/', nb_visits: 561 },
  { label: 'IFrame_https://dromolib.fr/', nb_visits: 506 },
  { label: 'IFrame_https://theatre-odeon.eu/', nb_visits: 477 },
  {
    label: 'IFrame_https://www.menton-riviera-merveilles.fr/',
    nb_visits: 452,
  },
  { label: 'IFrame_https://www.sandaya.nl/', nb_visits: 442 },
  { label: 'IFrame_https://www.crussolfestival.com/', nb_visits: 406 },
  {
    label: 'IFrame_https://sirius.isogypfr.saint-gobain.net/',
    nb_visits: 401,
  },
  { label: 'IFrame_https://www.nancy-tourisme.fr/', nb_visits: 400 },
  {
    label:
      'IFrame_https://www.journaldesfemmes.fr/mode/magazine-mode/3156328-ce-drole-d-outil-convertit-vos-achats-de-chaussures-annuels-en-repas-vegetarien-c-est-vertiginieux/',
    nb_visits: 389,
  },
  { label: 'IFrame_https://www.geres.eu/', nb_visits: 377 },
  { label: 'IFrame_https://www.ecoconso.be/', nb_visits: 374 },
  { label: 'IFrame_https://instants-tourisme.fr/', nb_visits: 350 },
  {
    label:
      'IFrame_https://agirpourlatransition.ademe.fr/particuliers/maison/numerique/teletravail-ca-change-quoi-planete',
    nb_visits: 315,
  },
  { label: 'IFrame_https://www.journaldesfemmes.fr/', nb_visits: 305 },
  { label: 'IFrame_https://www.bee-cycle.fr/', nb_visits: 294 },
  { label: 'IFrame_https://alsacegrandest.utmb.world/', nb_visits: 287 },
  { label: 'IFrame_https://nice.utmb.world/', nb_visits: 283 },
  { label: 'IFrame_https://en.theoasishouse.fr/', nb_visits: 253 },
  { label: 'IFrame_https://everyone.eco/', nb_visits: 245 },
  { label: 'IFrame_https://www.esdes.fr/', nb_visits: 240 },
  { label: 'IFrame_https://njuko.net/', nb_visits: 229 },
  { label: 'IFrame_https://www.fete-du-citron.com/', nb_visits: 211 },
  { label: 'IFrame_https://destination-nancy.com/', nb_visits: 209 },
  { label: 'IFrame_https://www.ambassadeurhotel.com/', nb_visits: 206 },
  { label: 'IFrame_https://www.ird.fr/', nb_visits: 201 },
  {
    label: 'IFrame_https://www.cotesdarmor.com/infos-pratiques/comment-venir-se-deplacer/',
    nb_visits: 199,
  },
  { label: 'IFrame_https://consomacteur.accoord.fr/', nb_visits: 188 },
  { label: 'IFrame_https://www.cchautemaurienne.com/', nb_visits: 188 },
  {
    label: 'IFrame_https://386d1b40-3750-44a6-9888-75b82f0ea0a9.usrfiles.com/',
    nb_visits: 187,
  },
  {
    label: 'IFrame_https://www.france.fr/fr/actualite/article/route-napoleon',
    nb_visits: 184,
  },
  {
    label: 'IFrame_https://agenceduclimat-strasbourg.eu/',
    nb_visits: 182,
  },
  { label: 'IFrame_https://www.defiplanet.com/', nb_visits: 166 },
  { label: 'IFrame_https://www.mende-coeur-lozere.fr/', nb_visits: 163 },
  { label: 'IFrame_https://www.sandaya.co.uk/', nb_visits: 162 },
  { label: 'IFrame_https://magistere.education.fr/', nb_visits: 149 },
  { label: 'IFrame_https://cce.fr/', nb_visits: 143 },
  { label: 'IFrame_https://www.france.fr/', nb_visits: 143 },
  { label: 'IFrame_https://petethemonkeyfestival.org/', nb_visits: 139 },
  {
    label: 'IFrame_https://www.fermesolidairelacoste.org/',
    nb_visits: 138,
  },
  { label: 'IFrame_https://www.altergaia.fr/', nb_visits: 135 },
  { label: 'IFrame_https://greenfest.fr/', nb_visits: 132 },
  { label: 'IFrame_https://www.aujourdhui.com/', nb_visits: 130 },
  { label: 'IFrame_https://adel.adrar-formation.eu/', nb_visits: 128 },
  { label: 'IFrame_https://www.sogoodmaiffestival.com/', nb_visits: 124 },
  { label: 'IFrame_https://intranet.avem-groupe.com/', nb_visits: 116 },
  { label: 'IFrame_https://www.ftvi-preprod.fr/', nb_visits: 116 },
  {
    label: 'IFrame_https://www.homeexchange.fr/blog/train-nuit-depuis-paris/',
    nb_visits: 116,
  },
  { label: 'IFrame_https://datagir.ademe.fr/', nb_visits: 110 },
  { label: 'IFrame_https://www.cotesdarmor.com/', nb_visits: 104 },
  {
    label:
      'IFrame_https://agirpourlatransition.ademe.fr/particuliers/entreprises/particuliers/bureau/numerique/calculez-lempreinte-carbone-usages-numeriques',
    nb_visits: 102,
  },
  {
    label: 'IFrame_https://labonneaventurefestival.com/',
    nb_visits: 101,
  },
  { label: 'IFrame_https://lolalala.fr/', nb_visits: 101 },
  { label: 'IFrame_https://www.sogoodfestival.com/', nb_visits: 100 },
  { label: 'IFrame_https://canalplus.coviflex.com/', nb_visits: 99 },
  { label: 'IFrame_https://www.sandaya.de/', nb_visits: 99 },
  { label: 'IFrame_https://groupebpce.sharepoint.com/', nb_visits: 98 },
  { label: 'IFrame_https://caveauxpoetes.com/', nb_visits: 90 },
  { label: 'IFrame_https://www.geomob.fr/', nb_visits: 90 },
  {
    label: 'IFrame_https://www.seineouest.fr/mon-convertisseur-co2',
    nb_visits: 90,
  },
  {
    label: 'IFrame_https://80fe7e00-d93e-49bb-a841-fb2a7e1756b6.usrfiles.com/',
    nb_visits: 88,
  },
  { label: 'IFrame_https://viamedis.coviflex.com/', nb_visits: 87 },
  { label: 'IFrame_https://the-oasis-house.webflow.io/', nb_visits: 86 },
  { label: 'IFrame_https://www.liebherr.i/', nb_visits: 86 },
  { label: 'IFrame_https://www.provenceguide.com/', nb_visits: 86 },
  { label: 'IFrame_https://www.ccserreponcon.com/', nb_visits: 83 },
  { label: 'IFrame_https://www.sudouest.fr/', nb_visits: 82 },
  { label: 'IFrame_https://imm.macapsule.eu/', nb_visits: 80 },
  { label: 'IFrame_https://bacheloract.fr/', nb_visits: 79 },
  { label: 'IFrame_https://www.homeexchange.fr/', nb_visits: 78 },
  {
    label: 'IFrame_https://cetim.notilus-tne.cegid.cloud/',
    nb_visits: 77,
  },
  { label: 'IFrame_https://www.besancon-tourisme.com/', nb_visits: 77 },
  {
    label: 'IFrame_https://www.saint-etienne-hors-cadre.fr/',
    nb_visits: 74,
  },
  {
    label: 'IFrame_https://www.combrailles-auvergne-tourisme.fr/',
    nb_visits: 72,
  },
  { label: 'IFrame_https://www.nouveau-campus-cz.com/', nb_visits: 71 },
  { label: 'IFrame_https://spi.ouest-france.fr/', nb_visits: 67 },
  { label: 'IFrame_https://www.orchestrecolonne.fr/', nb_visits: 66 },
  { label: 'IFrame_https://saintvincent2024.fr/', nb_visits: 65 },
  { label: 'IFrame_https://www.sharvy.com/', nb_visits: 64 },
  { label: 'IFrame_https://velorution-perigourdine.fr/', nb_visits: 60 },
  { label: 'IFrame_https://www.alec-rennes.org/', nb_visits: 60 },
  { label: 'IFrame_https://www.wedemain.fr/', nb_visits: 57 },
  { label: 'IFrame_https://www.atelierdesmobilites.fr/', nb_visits: 54 },
  { label: 'IFrame_https://www.causette.fr/', nb_visits: 52 },
  { label: 'IFrame_https://www.libraka.com/', nb_visits: 52 },
  {
    label: 'IFrame_https://cciara.notilus-tne.cegid.cloud/',
    nb_visits: 51,
  },
  { label: 'IFrame_https://citiz.coop/', nb_visits: 51 },
  { label: 'IFrame_http://localhost:8140/', nb_visits: 48 },
  {
    label: 'IFrame_https://groupecasino.notilus-tne.cegid.cloud/',
    nb_visits: 47,
  },
  { label: 'IFrame_https://intranet/', nb_visits: 47 },
  { label: 'IFrame_https://ressources.antimuonium.com/', nb_visits: 47 },
  { label: 'IFrame_https://www.univ-rennes2.fr/', nb_visits: 44 },
  {
    label: 'IFrame_https://inextenso.notilus-tne.cegid.cloud/',
    nb_visits: 43,
  },
  {
    label: 'IFrame_https://sercel.notilus-tne.cegid.cloud/',
    nb_visits: 43,
  },
  {
    label:
      'IFrame_https://agirpourlatransition.ademe.fr/particuliers/conso/alimentation/mieux-manger-chassez-fausses-idees',
    nb_visits: 42,
  },
  { label: 'IFrame_https://app.imagreen.fr/', nb_visits: 42 },
  { label: 'IFrame_https://www.villedieu-intercom.fr/', nb_visits: 41 },
  {
    label: 'IFrame_https://cegid.notilus-tne.cegid.cloud/',
    nb_visits: 40,
  },
  {
    label: 'IFrame_https://agirpourlatransition.ademe.fr/particuliers/calculateur-impact-livraison-colis',
    nb_visits: 39,
  },
  { label: 'IFrame_https://flexo.havas.com/', nb_visits: 39 },
  { label: 'IFrame_https://vdlassocies.sharepoint.com/', nb_visits: 38 },
  { label: 'IFrame_https://cccps.travaux.korigan.fr/', nb_visits: 36 },
  {
    label: 'IFrame_https://sogoodmaiffestival.webflow.io/',
    nb_visits: 36,
  },
  { label: 'IFrame_https://www.alec-plaineco.org/', nb_visits: 36 },
  { label: 'IFrame_https://app.nouslouons.fr/', nb_visits: 35 },
  { label: 'IFrame_https://betterway.fr/', nb_visits: 35 },
  {
    label: 'IFrame_https://www.douarnenez-communaute.fr/',
    nb_visits: 34,
  },
  {
    label: 'IFrame_https://www.tourismeendomitienne.com/',
    nb_visits: 34,
  },
  {
    label: 'IFrame_https://cnpassurancesfr.sharepoint.com/',
    nb_visits: 32,
  },
  {
    label: 'IFrame_https://www.france.fr/fr/provence/article/route-napoleon',
    nb_visits: 29,
  },
  { label: 'IFrame_http://www.cchautemaurienne.com/', nb_visits: 28 },
  {
    label: 'IFrame_https://legrand.notilus-tne.cegid.cloud/',
    nb_visits: 28,
  },
  { label: 'IFrame_https://www.reims-tourisme.com/', nb_visits: 28 },
  { label: 'IFrame_https://dev.lolalala.fr/', nb_visits: 26 },
  {
    label: 'IFrame_https://meet-opentravail.lamutuellegenerale.fr/',
    nb_visits: 26,
  },
  {
    label:
      'IFrame_https://agirpourlatransition.ademe.fr/particuliers/bureau/deplacements/calculer-emissions-carbone-trajets?utm_source=substack&utm_medium=email',
    nb_visits: 25,
  },
  { label: 'IFrame_https://www.livrado.fr/', nb_visits: 25 },
  { label: 'IFrame_https://www.vedservices.fr/', nb_visits: 25 },
  { label: 'IFrame_https://foad.ams-grandsud.fr/', nb_visits: 24 },
  { label: 'IFrame_https://myflex.alten.ma/', nb_visits: 24 },
  { label: 'IFrame_https://www.oser-la-rse.fr/', nb_visits: 24 },
]

export const getMatomoStats = async (): Promise<Stats> => {
  const [allVisits, allEventsByCategory, allEventsByAction] = await Promise.all([
    await axios
      .post<
        { label: string; nb_visits: number }[]
      >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&method=Actions.getPageUrls&format=JSON&module=API&period=year&date=2024-01-01&showColumns=nb_visits&filter_limit=-1`)
      .then((response) => response.data),
    await axios
      .post<
        { label: string; nb_visits: number; nb_events: number }[]
      >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&method=Events.getCategory&format=JSON&module=API&period=year&date=2024-01-01&showColumns=nb_visits,nb_events&filter_limit=-1`)
      .then((response) => response.data),
    await axios
      .post<
        { label: string; nb_visits: number }[]
      >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&method=Events.getAction&format=JSON&module=API&period=year&date=2024-01-01&showColumns=nb_visits&filter_limit=-1`)
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
          event.label !== 'API_https://impactco2.fr/api-doc' &&
          event.label !== 'API_https://impactco2.fr/doc/api'
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
