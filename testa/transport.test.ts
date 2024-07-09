/**
 * @jest-environment node
 */

describe('transport', () => {
  test('get default values for 100 km', async () => {
    const result = await fetch('http://localhost:3000/api/v1/transport?km=100')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          id: 3,
          name: 'Intercités',
          value: 0.58,
        },
        {
          id: 4,
          name: 'Voiture thermique',
          value: 19.2,
        },
        {
          id: 5,
          name: 'Voiture électrique',
          value: 1.9800000000000002,
        },
        {
          id: 6,
          name: 'Autocar',
          value: 2.5,
        },
        {
          id: 13,
          name: 'Moto',
          value: 16.48,
        },
        {
          id: 14,
          name: 'RER ou Transilien',
          value: 0.66,
        },
        {
          id: 15,
          name: 'TER',
          value: 2.29,
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })

  test('get values for 100 km in english', async () => {
    const result = await fetch('http://localhost:3000/api/v1/transport?km=100&language=en')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          id: 3,
          name: 'Intercity train',
          value: 0.58,
        },
        {
          id: 4,
          name: 'Combustion car',
          value: 19.2,
        },
        {
          id: 5,
          name: 'Electric car',
          value: 1.9800000000000002,
        },
        {
          id: 6,
          name: 'Coach',
          value: 2.5,
        },
        {
          id: 13,
          name: 'Motorcycle',
          value: 16.48,
        },
        {
          id: 14,
          name: 'RER or suburban train',
          value: 0.66,
        },
        {
          id: 15,
          name: 'Regional train',
          value: 2.29,
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })

  test('get all values for 100 km', async () => {
    const result = await fetch('http://localhost:3000/api/v1/transport?km=100&displayAll=1')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          id: 1,
          name: 'Avion court courrier',
          value: 25.82,
        },
        {
          id: 2,
          name: 'TGV',
          value: 0.22999999999999998,
        },
        {
          id: 3,
          name: 'Intercités',
          value: 0.58,
        },
        {
          id: 4,
          name: 'Voiture thermique',
          value: 19.2,
        },
        {
          id: 5,
          name: 'Voiture électrique',
          value: 1.9800000000000002,
        },
        {
          id: 6,
          name: 'Autocar',
          value: 2.5,
        },
        {
          id: 7,
          name: 'Vélo ou marche',
          value: 0,
        },
        {
          id: 8,
          name: 'Vélo à assistance électrique',
          value: 0.22300000000000003,
        },
        {
          id: 9,
          name: 'Bus thermique',
          value: 10.43,
        },
        {
          id: 10,
          name: 'Tramway',
          value: 0.38,
        },
        {
          id: 11,
          name: 'Métro',
          value: 0.42,
        },
        {
          id: 12,
          name: 'Scooter ou moto légère',
          value: 6.04,
        },
        {
          id: 13,
          name: 'Moto',
          value: 16.48,
        },
        {
          id: 14,
          name: 'RER ou Transilien',
          value: 0.66,
        },
        {
          id: 15,
          name: 'TER',
          value: 2.29,
        },
        {
          id: 16,
          name: 'Bus électrique',
          value: 0.95,
        },
        {
          id: 17,
          name: 'Trottinette à assistance électrique',
          value: 0.2,
        },
        {
          id: 21,
          name: 'Bus (GNV)',
          value: 11.28,
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })

  test('get some values for 100 km', async () => {
    const result = await fetch('http://localhost:3000/api/v1/transport?km=100&transports=1,3,5')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          id: 1,
          name: 'Avion court courrier',
          value: 25.82,
        },
        {
          id: 3,
          name: 'Intercités',
          value: 0.58,
        },
        {
          id: 5,
          name: 'Voiture électrique',
          value: 1.9800000000000002,
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })

  test('get plane values without radiative forcing', async () => {
    const result = await fetch('http://localhost:3000/api/v1/transport?km=100&transports=1&ignoreRadiativeForcing=1')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          id: 1,
          name: 'Avion court courrier',
          value: 14.12,
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })

  test('get all values with carpool', async () => {
    const result = await fetch('http://localhost:3000/api/v1/transport?km=100&numberOfPassenger=3')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          id: 3,
          name: 'Intercités',
          value: 0.58,
        },
        {
          id: 4,
          name: 'Voiture thermique',
          value: 4.8,
        },
        {
          id: 5,
          name: 'Voiture électrique',
          value: 0.49500000000000005,
        },
        {
          id: 6,
          name: 'Autocar',
          value: 2.5,
        },
        {
          id: 13,
          name: 'Moto',
          value: 16.48,
        },
        {
          id: 14,
          name: 'RER ou Transilien',
          value: 0.66,
        },
        {
          id: 15,
          name: 'TER',
          value: 2.29,
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })

  test('get all values with construction', async () => {
    const result = await fetch('http://localhost:3000/api/v1/transport?km=100&includeConstruction=1')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          id: 3,
          name: 'Intercités',
          value: 0.898,
        },
        {
          id: 4,
          name: 'Voiture thermique',
          value: 21.76,
        },
        {
          id: 5,
          name: 'Voiture électrique',
          value: 10.34,
        },
        {
          id: 6,
          name: 'Autocar',
          value: 2.942130627,
        },
        {
          id: 13,
          name: 'Moto',
          value: 19.13,
        },
        {
          id: 14,
          name: 'RER ou Transilien',
          value: 0.9780000000000001,
        },
        {
          id: 15,
          name: 'TER',
          value: 2.769,
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })
})
