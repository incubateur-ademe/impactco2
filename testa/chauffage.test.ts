/**
 * @jest-environment node
 */

describe('chauffage', () => {
  test('get default values', async () => {
    const result = await fetch('http://localhost:3000/api/v1/chauffage')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        { ecv: 2457, name: 'Chauffage au gaz', slug: 'chauffagegaz' },
        { ecv: 3601.71, name: 'Chauffage au fioul', slug: 'chauffagefioul' },
        { ecv: 746.55, name: 'Chauffage électrique', slug: 'chauffageelectrique' },
        { ecv: 248.85000000000002, name: 'Chauffage avec une pompe à chaleur', slug: 'pompeachaleur' },
        { ecv: 355.32, name: 'Chauffage avec un poêle à granulés', slug: 'poeleagranule' },
        { ecv: 579.5999999999999, name: 'Chauffage avec un poêle à bois', slug: 'poeleabois' },
        { ecv: 1176.21, name: 'Chauffage via un réseau de chaleur', slug: 'reseaudechaleur' },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })

  test('get values in english', async () => {
    const result = await fetch('http://localhost:3000/api/v1/chauffage?language=en')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        { ecv: 2457, name: 'Gas heating', slug: 'chauffagegaz' },
        { ecv: 3601.71, name: 'Oil heating', slug: 'chauffagefioul' },
        { ecv: 746.55, name: 'Electric heating', slug: 'chauffageelectrique' },
        { ecv: 248.85000000000002, name: 'Heating with a heat pump', slug: 'pompeachaleur' },
        { ecv: 355.32, name: 'Heating with a pellet stove', slug: 'poeleagranule' },
        { ecv: 579.5999999999999, name: 'Heating with a wood stove', slug: 'poeleabois' },
        { ecv: 1176.21, name: 'Heating via a district heating network', slug: 'reseaudechaleur' },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })

  test('get specific values', async () => {
    const result = await fetch('http://localhost:3000/api/v1/chauffage?chauffages=4,6')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        { ecv: 248.85000000000002, name: 'Chauffage avec une pompe à chaleur', slug: 'pompeachaleur' },
        { ecv: 579.5999999999999, name: 'Chauffage avec un poêle à bois', slug: 'poeleabois' },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })

  test('get specific surface', async () => {
    const result = await fetch('http://localhost:3000/api/v1/chauffage?m2=100')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        { ecv: 3900, name: 'Chauffage au gaz', slug: 'chauffagegaz' },
        { ecv: 5717, name: 'Chauffage au fioul', slug: 'chauffagefioul' },
        { ecv: 1185, name: 'Chauffage électrique', slug: 'chauffageelectrique' },
        { ecv: 395, name: 'Chauffage avec une pompe à chaleur', slug: 'pompeachaleur' },
        { ecv: 564, name: 'Chauffage avec un poêle à granulés', slug: 'poeleagranule' },
        { ecv: 919.9999999999999, name: 'Chauffage avec un poêle à bois', slug: 'poeleabois' },
        { ecv: 1867.0000000000002, name: 'Chauffage via un réseau de chaleur', slug: 'reseaudechaleur' },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })
})
