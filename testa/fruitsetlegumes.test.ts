/**
 * @jest-environment node
 */
import { fruitsEtLegumes } from 'data/categories/fruitsetlegumes'
import { getName } from 'utils/Equivalent/equivalent'
import { computeECV } from 'utils/computeECV'

describe('fruitsetlegumes', () => {
  test('get default values', async () => {
    const result = await fetch('http://localhost:3000/api/v1/fruitsetlegumes')

    expect(result.status).toBe(200)
    const data = await result.json()
    const month = new Date().getMonth()

    expect(data).toEqual({
      data: fruitsEtLegumes
        .filter((value) => value.months.includes(month))
        .map((value) => {
          return {
            name: getName('fr', value),
            slug: value.slug,
            months: value.months.map((month) => month + 1),
            ecv: computeECV(value),
          }
        }),
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })

  test('get values in english', async () => {
    const result = await fetch('http://localhost:3000/api/v1/fruitsetlegumes?language=en')

    expect(result.status).toBe(200)
    const data = await result.json()
    const month = new Date().getMonth()

    expect(data).toEqual({
      data: fruitsEtLegumes
        .filter((value) => value.months.includes(month))
        .map((value) => {
          return {
            name: getName('en', value),
            slug: value.slug,
            months: value.months.map((month) => month + 1),
            ecv: computeECV(value),
          }
        }),
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })

  test('get specific month', async () => {
    const result = await fetch('http://localhost:3000/api/v1/fruitsetlegumes?month=10')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          ecv: 0.396515083,
          months: [1, 2, 3, 4, 8, 9, 10, 11, 12],
          name: 'Pomme',
          slug: 'pomme',
        },
        {
          ecv: 0.358042894,
          months: [7, 8, 9, 10, 11, 12],
          name: 'Ail',
          slug: 'ail',
        },
        {
          ecv: 0.3643210989999999,
          months: [1, 2, 3, 10, 11, 12],
          name: 'Betterave',
          slug: 'betterave',
        },
        {
          ecv: 0.542753575,
          months: [6, 7, 8, 9, 10, 11],
          name: 'Blette',
          slug: 'blette',
        },
        {
          ecv: 0.3643210989999999,
          months: [1, 2, 3, 9, 10, 11, 12],
          name: 'Carotte',
          slug: 'carotte',
        },
        {
          ecv: 0.6770180851000002,
          months: [1, 2, 3, 10, 11, 12],
          name: 'Céleri',
          slug: 'celeri',
        },
        {
          ecv: 0.4937143989999999,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Champignon (morille crue)',
          slug: 'champignonmorille',
        },
        {
          ecv: 0.862097522,
          months: [1, 2, 3, 10, 11, 12],
          name: 'Chou',
          slug: 'chou',
        },
        {
          ecv: 0.5758186729,
          months: [1, 2, 3, 10, 11, 12],
          name: 'Chou de Bruxelles',
          slug: 'choudebruxelles',
        },
        {
          ecv: 0.735512212,
          months: [1, 2, 3, 9, 10, 11, 12],
          name: 'Chou-fleur',
          slug: 'choufleur',
        },
        {
          ecv: 0.473201203,
          months: [5, 6, 7, 8, 9, 10],
          name: 'Concombre',
          slug: 'concombre',
        },
        {
          ecv: 0.618848881,
          months: [1, 9, 10, 11, 12],
          name: 'Courge',
          slug: 'courge',
        },
        {
          ecv: 0.48351979,
          months: [5, 6, 7, 8, 9, 10],
          name: 'Courgette',
          slug: 'courgette',
        },
        {
          ecv: 0.9410662189999999,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Cresson',
          slug: 'cresson',
        },
        {
          ecv: 0.3648632602000001,
          months: [10, 11, 12],
          name: 'Échalote',
          slug: 'echalote',
        },
        {
          ecv: 0.9380277949999998,
          months: [1, 2, 3, 4, 5, 10],
          name: 'Endive',
          slug: 'endive',
        },
        {
          ecv: 0.3912991521,
          months: [1, 2, 3, 4, 5, 9, 10, 11, 12],
          name: 'Épinard',
          slug: 'epinard',
        },
        {
          ecv: 10.641545366999999,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Mangue',
          slug: 'mangue',
        },
        {
          ecv: 0.962528871,
          months: [4, 6, 7, 8, 9, 10, 11],
          name: 'Fenouil',
          slug: 'fenouil',
        },
        {
          ecv: 0.41306197199999994,
          months: [6, 7, 8, 9, 10],
          name: 'Haricot vert (cru)',
          slug: 'haricotvert',
        },
        {
          ecv: 0.9410662189999999,
          months: [1, 2, 10, 11, 12],
          name: 'Mâche',
          slug: 'mache',
        },
        {
          ecv: 0.364321099,
          months: [1, 2, 3, 4, 5, 10, 11, 12],
          name: 'Navet',
          slug: 'navet',
        },
        {
          ecv: 0.38953612800000015,
          months: [1, 2, 3, 4, 9, 10, 11, 12],
          name: 'Oignon',
          slug: 'oignon',
        },
        {
          ecv: 0.45782909000000005,
          months: [1, 2, 3, 10, 11, 12],
          name: 'Panais',
          slug: 'panais',
        },
        {
          ecv: 0.768865685,
          months: [1, 2, 3, 4, 9, 10, 11, 12],
          name: 'Poireau',
          slug: 'poireau',
        },
        {
          ecv: 0.618848881,
          months: [1, 9, 10, 11, 12],
          name: 'Potiron',
          slug: 'potiron',
        },
        {
          ecv: 1.880205125,
          months: [10, 11],
          name: 'Châtaigne',
          slug: 'chataigne',
        },
        {
          ecv: 0.5410901117000001,
          months: [10],
          name: 'Coing',
          slug: 'coing',
        },
        {
          ecv: 0.6135498970000001,
          months: [7, 8, 9, 10],
          name: 'Figue',
          slug: 'figue',
        },
        {
          ecv: 4.652965420999999,
          months: [9, 10, 11],
          name: 'Noisette',
          slug: 'noisette',
        },
        {
          ecv: 4.164838912,
          months: [9, 10],
          name: 'Noix',
          slug: 'noix',
        },
        {
          ecv: 0.36428259399999996,
          months: [1, 2, 3, 8, 9, 10, 11, 12],
          name: 'Poire',
          slug: 'poire',
        },
        {
          ecv: 0.45672809300000006,
          months: [9, 10],
          name: 'Raisin',
          slug: 'raisin',
        },
        {
          ecv: 0.9025554719999999,
          months: [9, 10, 11],
          name: 'Brocoli',
          slug: 'brocoli',
        },
        {
          ecv: 1.292282106,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Ananas',
          slug: 'ananas',
        },
        {
          ecv: 0.8806108929999997,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Banane',
          slug: 'banane',
        },
        {
          ecv: 1.4804702330000001,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Avocat',
          slug: 'avocat',
        },
        {
          ecv: 2.7601109879999997,
          months: [1, 10, 11, 12],
          name: 'Datte',
          slug: 'datte',
        },
        {
          ecv: 0.89281737,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Fruit de la passion',
          slug: 'fruitdelapassion',
        },
        {
          ecv: 0.9004313517,
          months: [1, 10, 11, 12],
          name: 'Kaki',
          slug: 'kaki',
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })
})
