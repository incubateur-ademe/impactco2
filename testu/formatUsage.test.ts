import formatUsage from 'utils/formatUsage'

describe('formatUsage', () => {
  test("Calcule l'équivalent carbone d'un usage", () => {
    const res = formatUsage(exampleOfEquivalent)
    expect(res).toEqual(0.0604)
  })
  const exampleOfEquivalent = {
    name: 'Scooter ou moto légère',
    prefix: 'km en ',
    synonyms: ['transport', 'déplacement', 'déplacer'],
    slug: 'scooter',
    type: 'car',
    category: 4,
    ecv: [
      {
        value: 0.0604,
        id: 6,
      },
      {
        value: 0.0159,
        id: 5,
      },
    ],
    default: true,
    tile: false,
    display: {
      max: 50,
    },
    source: 'https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=Routier2',
    meta: {
      title: 'Scooter-moto légère',
      description:
        "Découvrez l'impact CO₂e d'un trajet en scooter et grâce à Impact CO₂ choisissez le moyen de transport le plus écologique pour vos déplacements. ",
    },
    id: 'scooter',
  }
})
