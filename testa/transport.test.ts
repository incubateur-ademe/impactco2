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
          id: 22,
          name: 'Covoiturage thermique (1 passager)',
          value: 9.6,
        },
        {
          id: 23,
          name: 'Covoiturage thermique (2 passagers)',
          value: 6.3999999999999995,
        },
        {
          id: 24,
          name: 'Covoiturage thermique (3 passagers)',
          value: 4.8,
        },
        {
          id: 25,
          name: 'Covoiturage thermique (4 passagers)',
          value: 3.84,
        },
        {
          id: 4,
          name: 'Voiture thermique',
          value: 19.2,
        },
        {
          id: 26,
          name: 'Covoiturage électrique (1 passager)',
          value: 0.9900000000000001,
        },
        {
          id: 27,
          name: 'Covoiturage électrique (2 passagers)',
          value: 0.66,
        },
        {
          id: 28,
          name: 'Covoiturage électrique (3 passagers)',
          value: 0.49500000000000005,
        },
        {
          id: 29,
          name: 'Covoiturage électrique (4 passagers)',
          value: 0.396,
        },
        {
          id: 5,
          name: 'Voiture électrique',
          value: 1.9800000000000002,
        },
        {
          id: 6,
          name: 'Autocar thermique',
          value: 2.5,
        },
        {
          id: 13,
          name: 'Moto thermique',
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
          id: 22,
          name: 'Carpooling combustion (1 passenger)',
          value: 9.6,
        },
        {
          id: 23,
          name: 'Carpooling combustion (2 passengers)',
          value: 6.3999999999999995,
        },
        {
          id: 24,
          name: 'Carpooling combustion (3 passengers)',
          value: 4.8,
        },
        {
          id: 25,
          name: 'Carpooling combustion (4 passengers)',
          value: 3.84,
        },
        {
          id: 4,
          name: 'Combustion car',
          value: 19.2,
        },
        {
          id: 26,
          name: 'Carpooling electric (1 passenger)',
          value: 0.9900000000000001,
        },
        {
          id: 27,
          name: 'Carpooling electric (2 passengers)',
          value: 0.66,
        },
        {
          id: 28,
          name: 'Carpooling electric (3 passengers)',
          value: 0.49500000000000005,
        },
        {
          id: 29,
          name: 'Carpooling electric (4 passengers)',
          value: 0.396,
        },
        {
          id: 5,
          name: 'Electric car',
          value: 1.9800000000000002,
        },
        {
          id: 6,
          name: 'Combustion coach',
          value: 2.5,
        },
        {
          id: 13,
          name: 'Combustion motorcycle',
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
          id: 22,
          name: 'Covoiturage thermique (1 passager)',
          value: 9.6,
        },
        {
          id: 23,
          name: 'Covoiturage thermique (2 passagers)',
          value: 6.3999999999999995,
        },
        {
          id: 24,
          name: 'Covoiturage thermique (3 passagers)',
          value: 4.8,
        },
        {
          id: 25,
          name: 'Covoiturage thermique (4 passagers)',
          value: 3.84,
        },
        {
          id: 4,
          name: 'Voiture thermique',
          value: 19.2,
        },
        {
          id: 26,
          name: 'Covoiturage électrique (1 passager)',
          value: 0.9900000000000001,
        },
        {
          id: 27,
          name: 'Covoiturage électrique (2 passagers)',
          value: 0.66,
        },
        {
          id: 28,
          name: 'Covoiturage électrique (3 passagers)',
          value: 0.49500000000000005,
        },
        {
          id: 29,
          name: 'Covoiturage électrique (4 passagers)',
          value: 0.396,
        },
        {
          id: 5,
          name: 'Voiture électrique',
          value: 1.9800000000000002,
        },
        {
          id: 6,
          name: 'Autocar thermique',
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
          name: 'Scooter ou moto légère thermique',
          value: 6.04,
        },
        {
          id: 13,
          name: 'Moto thermique',
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

  test('get all values with carpool and numberOfPassenger', async () => {
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
          name: 'Autocar thermique',
          value: 2.5,
        },
        {
          id: 13,
          name: 'Moto thermique',
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

  test('get all values with carpool and occupencyRate', async () => {
    const result = await fetch('http://localhost:3000/api/v1/transport?km=100&numberOfPassenger=2&occupencyRate=4')

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
          name: 'Autocar thermique',
          value: 2.5,
        },
        {
          id: 13,
          name: 'Moto thermique',
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
        { id: 22, name: 'Covoiturage thermique (1 passager)', value: 10.88 },
        {
          id: 23,
          name: 'Covoiturage thermique (2 passagers)',
          value: 7.253333333333334,
        },
        {
          id: 24,
          name: 'Covoiturage thermique (3 passagers)',
          value: 5.44,
        },
        {
          id: 25,
          name: 'Covoiturage thermique (4 passagers)',
          value: 4.352,
        },
        {
          id: 4,
          name: 'Voiture thermique',
          value: 21.76,
        },
        {
          id: 26,
          name: 'Covoiturage électrique (1 passager)',
          value: 5.17,
        },
        {
          id: 27,
          name: 'Covoiturage électrique (2 passagers)',
          value: 3.4466666666666668,
        },
        {
          id: 28,
          name: 'Covoiturage électrique (3 passagers)',
          value: 2.585,
        },
        {
          id: 29,
          name: 'Covoiturage électrique (4 passagers)',
          value: 2.068,
        },
        {
          id: 5,
          name: 'Voiture électrique',
          value: 10.34,
        },
        {
          id: 6,
          name: 'Autocar thermique',
          value: 2.942130627,
        },
        {
          id: 13,
          name: 'Moto thermique',
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
