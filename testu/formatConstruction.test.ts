import formatConstruction from 'utils/formatConstruction'

describe('formatConstruction', () => {
  test("Calcule l'équivalent carbone de la construction", () => {
    const res = formatConstruction(exampleOfEquivalent)
    expect(res).toEqual(134.702872533555)
  })
  const exampleOfEquivalent = {
    id: 'ordinateurportable',
    name: 'Ordinateur[s] portable[s]',
    slug: 'ordinateurportable',
    emoji: '💻',
    category: 1,
    ecv: [
      {
        value: 100.126651822594,
        id: 1,
      },
      {
        value: 0.405069298638844,
        id: 2,
      },
      {
        value: 0.763849328522349,
        id: 3,
      },
      {
        value: 33.4073020837998,
        id: 4,
      },
    ],
    usage: {
      peryear: 4.58940987,
      defaultyears: 6,
    },
    end: -5.78881336720088,
    default: true,
    tile: false,
    meta: {
      title: 'Ordinateur portable',
      description:
        "Quel est l'empreinte carbone d'un ordinateur portable ? Découvrez son poids en CO₂e et mesurez ainsi votre impact sur le climat",
    },
    source:
      'https://librairie.ademe.fr/dechets-economie-circulaire/127-modelisation-et-evaluation-environnementale-de-produits-de-consommation-et-biens-d-equipement.html',
  }
})
