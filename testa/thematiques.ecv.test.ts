/**
 * @jest-environment node
 */

describe('ecv', () => {
  test('get all ecvs', async () => {
    const result = await fetch('http://localhost:3000/api/v1/thematiques/ecv/mobilier')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          ecv: 197.5,
          name: 'Canapé convertible',
          slug: 'canapeconvertible',
        },
        {
          ecv: 18.63,
          name: 'Chaise en bois',
          slug: 'chaiseenbois',
        },
        {
          ecv: 80.22,
          name: 'Table en bois',
          slug: 'tableenbois',
        },
        {
          ecv: 179.1,
          name: 'Canapé en textile',
          slug: 'canapetextile',
        },
        {
          ecv: 906.88,
          name: 'Armoire',
          slug: 'armoire',
        },
        {
          ecv: 443.81000000000006,
          name: 'Lit',
          slug: 'lit',
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })
  test('get all ecvs with detail', async () => {
    const result = await fetch('http://localhost:3000/api/v1/thematiques/ecv/mobilier?detail=1')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          ecv: 197.5,
          footprint: 197.5,
          footprintDetail: [
            {
              id: 1,
              value: 119,
            },
            {
              id: 2,
              value: 16.3,
            },
            {
              id: 3,
              value: 11.2,
            },
            {
              id: 4,
              value: 51,
            },
          ],
          name: 'Canapé convertible',
          slug: 'canapeconvertible',
        },
        {
          ecv: 18.63,
          footprint: 18.63,
          footprintDetail: [
            {
              id: 1,
              value: 4.92,
            },
            {
              id: 2,
              value: 1.78,
            },
            {
              id: 3,
              value: 0.05,
            },
            {
              id: 4,
              value: 11.879999999999999,
            },
          ],
          name: 'Chaise en bois',
          slug: 'chaiseenbois',
        },
        {
          ecv: 80.22,
          footprint: 80.22,
          footprintDetail: [
            {
              id: 1,
              value: 23.6,
            },
            {
              id: 2,
              value: 9.39,
            },
            {
              id: 3,
              value: 0.13,
            },
            {
              id: 4,
              value: 47.1,
            },
          ],
          name: 'Table en bois',
          slug: 'tableenbois',
        },
        {
          ecv: 179.1,
          footprint: 179.1,
          footprintDetail: [
            {
              id: 1,
              value: 99.5,
            },
            {
              id: 2,
              value: 16.7,
            },
            {
              id: 3,
              value: 13.5,
            },
            {
              id: 4,
              value: 49.4,
            },
          ],
          name: 'Canapé en textile',
          slug: 'canapetextile',
        },
        {
          ecv: 906.88,
          footprint: 906.88,
          footprintDetail: [
            {
              id: 1,
              value: 118,
            },
            {
              id: 2,
              value: 70.7,
            },
            {
              id: 3,
              value: 2.18,
            },
            {
              id: 4,
              value: 716,
            },
          ],
          name: 'Armoire',
          slug: 'armoire',
        },
        {
          ecv: 443.81000000000006,
          footprint: 443.81000000000006,
          footprintDetail: [
            {
              id: 1,
              value: 303.20000000000005,
            },
            {
              id: 2,
              value: 38.28,
            },
            {
              id: 3,
              value: 38.43,
            },
            {
              id: 4,
              value: 63.900000000000006,
            },
          ],
          name: 'Lit',
          slug: 'lit',
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })
})
