/**
 * @jest-environment node
 */

describe('thematiques', () => {
  test('get all thematiques', async () => {
    const result = await fetch('http://localhost:3000/api/v1/thematiques')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          id: 1,
          name: 'Numérique',
          slug: 'numerique',
        },
        {
          id: 2,
          name: 'Alimentation',
          slug: 'alimentation',
        },
        {
          id: 3,
          name: 'Boisson',
          slug: 'boisson',
        },
        {
          id: 4,
          name: 'Transport',
          slug: 'transport',
        },
        {
          id: 5,
          name: 'Habillement',
          slug: 'habillement',
        },
        {
          id: 6,
          name: 'Électroménager',
          slug: 'electromenager',
        },
        {
          id: 7,
          name: 'Mobilier',
          slug: 'mobilier',
        },
        {
          id: 8,
          name: 'Chauffage',
          slug: 'chauffage',
        },
        {
          id: 9,
          name: 'Fruits et légumes',
          slug: 'fruitsetlegumes',
        },
        {
          id: 10,
          name: 'Usage numérique',
          slug: 'usagenumerique',
        },
        {
          id: 13,
          name: 'Cas pratiques',
          slug: 'caspratiques',
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })
})
