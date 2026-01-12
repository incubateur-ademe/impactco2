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
        { ecv: 1123.735932762777, name: 'Chaudière à gaz', slug: 'chauffagegaz' },
        { ecv: 2203.184061208831, name: 'Chaudière au fioul', slug: 'chauffagefioul' },
        { ecv: 151.81056915609627, name: 'Électricité', slug: 'chauffageelectrique' },
        { ecv: 102.9031975493033, name: 'Pompe à chaleur', slug: 'pompeachaleur' },
        { ecv: 372.7681482247014, name: 'Poêle à granulés', slug: 'poeleagranule' },
        { ecv: 535.8542130730084, name: 'Poêle à bûches', slug: 'poeleabois' },
        { ecv: 697.873276136477, name: 'Réseau de chaleur', slug: 'reseaudechaleur' },
        {
          ecv: 376.53291212280124,
          name: 'Chaudière à granulés',
          slug: 'chaudiereagranule',
        },
        {
          ecv: 541.2660611765268,
          name: 'Chaudière à bûches',
          slug: 'chaudiereabois',
        },
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
        { ecv: 1123.735932762777, name: 'Gas boiler', slug: 'chauffagegaz' },
        { ecv: 2203.184061208831, name: 'Oil boiler', slug: 'chauffagefioul' },
        { ecv: 151.81056915609627, name: 'Electricity', slug: 'chauffageelectrique' },
        { ecv: 102.9031975493033, name: 'Heat pump', slug: 'pompeachaleur' },
        { ecv: 372.7681482247014, name: 'Pellet stove', slug: 'poeleagranule' },
        { ecv: 535.8542130730084, name: 'Wood stove', slug: 'poeleabois' },
        { ecv: 697.873276136477, name: 'District heating', slug: 'reseaudechaleur' },
        {
          ecv: 376.53291212280124,
          name: 'Pellet boiler',
          slug: 'chaudiereagranule',
        },
        {
          ecv: 541.2660611765268,
          name: 'Wood boiler',
          slug: 'chaudiereabois',
        },
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
        { ecv: 102.9031975493033, name: 'Pompe à chaleur', slug: 'pompeachaleur' },
        { ecv: 535.8542130730084, name: 'Poêle à bûches', slug: 'poeleabois' },
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
        { ecv: 1783.7078297821858, name: 'Chaudière à gaz', slug: 'chauffagegaz' },
        { ecv: 3497.1175574743347, name: 'Chaudière au fioul', slug: 'chauffagefioul' },
        { ecv: 240.969157390629, name: 'Électricité', slug: 'chauffageelectrique' },
        { ecv: 163.33840880841795, name: 'Pompe à chaleur', slug: 'pompeachaleur' },
        { ecv: 591.695473372542, name: 'Poêle à granulés', slug: 'poeleagranule' },
        { ecv: 850.5622429730291, name: 'Poêle à bûches', slug: 'poeleabois' },
        { ecv: 1107.7353589467888, name: 'Réseau de chaleur', slug: 'reseaudechaleur' },
        {
          ecv: 597.6712890838115,
          name: 'Chaudière à granulés',
          slug: 'chaudiereagranule',
        },
        {
          ecv: 859.1524780579791,
          name: 'Chaudière à bûches',
          slug: 'chaudiereabois',
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })
})
