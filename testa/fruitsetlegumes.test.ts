/**
 * @jest-environment node
 */
import { fruitsEtLegumes } from 'data/categories/fruitsetlegumes'
import { getName } from 'utils/Equivalent/equivalent'
import { computeECV } from 'utils/computeECV'
import { fldsCategories } from 'utils/fruitsetlegumes'

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
            category: fldsCategories[value.slug],
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
            category: fldsCategories[value.slug],
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
          ecv: 0.39651508300000005,
          months: [1, 2, 3, 4, 8, 9, 10, 11, 12],
          name: 'Pomme',
          slug: 'pomme',
          category: 'fruits',
        },
        {
          ecv: 0.35804289400000006,
          months: [7, 8, 9, 10, 11, 12],
          name: 'Ail',
          slug: 'ail',
          category: 'herbes',
        },
        {
          ecv: 0.364321099,
          months: [1, 2, 3, 10, 11, 12],
          name: 'Betterave',
          slug: 'betterave',
          category: 'légumes',
        },
        {
          ecv: 0.542753575,
          months: [6, 7, 8, 9, 10, 11],
          name: 'Blette',
          slug: 'blette',
          category: 'légumes',
        },
        {
          ecv: 0.364321099,
          months: [1, 2, 3, 9, 10, 11, 12],
          name: 'Carotte',
          slug: 'carotte',
          category: 'légumes',
        },
        {
          ecv: 0.6770180851,
          months: [1, 2, 3, 10, 11, 12],
          name: 'Céleri',
          slug: 'celeri',
          category: 'légumes',
        },
        {
          ecv: 0.493714399,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Champignon (morille crue)',
          slug: 'champignonmorille',
          category: 'légumes',
        },
        {
          ecv: 0.8620975220000001,
          months: [1, 2, 3, 10, 11, 12],
          name: 'Chou',
          slug: 'chou',
          category: 'légumes',
        },
        {
          ecv: 0.5758186729,
          months: [1, 2, 3, 10, 11, 12],
          name: 'Chou de Bruxelles',
          slug: 'choudebruxelles',
          category: 'légumes',
        },
        {
          ecv: 0.735512212,
          months: [1, 2, 3, 9, 10, 11, 12],
          name: 'Chou-fleur',
          slug: 'choufleur',
          category: 'légumes',
        },
        {
          ecv: 0.473201203,
          months: [5, 6, 7, 8, 9, 10],
          name: 'Concombre',
          slug: 'concombre',
          category: 'légumes',
        },
        {
          ecv: 0.618848881,
          months: [1, 9, 10, 11, 12],
          name: 'Courge',
          slug: 'courge',
          category: 'légumes',
        },
        {
          ecv: 0.48351979,
          months: [5, 6, 7, 8, 9, 10],
          name: 'Courgette',
          slug: 'courgette',
          category: 'légumes',
        },
        {
          ecv: 0.941066219,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Cresson',
          slug: 'cresson',
          category: 'légumes',
        },
        {
          ecv: 0.36486326020000004,
          months: [10, 11, 12],
          name: 'Échalote',
          slug: 'echalote',
          category: 'légumes',
        },
        {
          ecv: 0.9380277949999999,
          months: [1, 2, 3, 4, 5, 10],
          name: 'Endive',
          slug: 'endive',
          category: 'légumes',
        },
        {
          ecv: 0.3912991521,
          months: [1, 2, 3, 4, 5, 9, 10, 11, 12],
          name: 'Épinard',
          slug: 'epinard',
          category: 'légumes',
        },
        {
          ecv: 10.641545367,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Mangue',
          slug: 'mangue',
          category: 'fruits',
        },
        {
          ecv: 0.9625288710000001,
          months: [4, 6, 7, 8, 9, 10, 11],
          name: 'Fenouil',
          slug: 'fenouil',
          category: 'légumes',
        },
        {
          ecv: 0.41306197199999994,
          months: [6, 7, 8, 9, 10],
          name: 'Haricot vert (cru)',
          slug: 'haricotvert',
          category: 'légumes',
        },
        {
          ecv: 0.941066219,
          months: [1, 2, 10, 11, 12],
          name: 'Mâche',
          slug: 'mache',
          category: 'légumes',
        },
        {
          ecv: 0.364321099,
          months: [1, 2, 3, 4, 5, 10, 11, 12],
          name: 'Navet',
          slug: 'navet',
          category: 'légumes',
        },
        {
          ecv: 0.38953612800000004,
          months: [1, 2, 3, 4, 9, 10, 11, 12],
          name: 'Oignon',
          slug: 'oignon',
          category: 'légumes',
        },
        {
          ecv: 0.45782909000000005,
          months: [1, 2, 3, 10, 11, 12],
          name: 'Panais',
          slug: 'panais',
          category: 'légumes',
        },
        {
          ecv: 0.768865685,
          months: [1, 2, 3, 4, 9, 10, 11, 12],
          name: 'Poireau',
          slug: 'poireau',
          category: 'légumes',
        },
        {
          ecv: 0.618848881,
          months: [1, 9, 10, 11, 12],
          name: 'Potiron',
          slug: 'potiron',
          category: 'légumes',
        },
        {
          ecv: 1.880205125,
          months: [10, 11],
          name: 'Châtaigne',
          slug: 'chataigne',
          category: 'fruits à coque et graines oléagineuses',
        },
        {
          ecv: 0.5410901117,
          months: [10],
          name: 'Coing',
          slug: 'coing',
          category: 'fruits',
        },
        {
          ecv: 0.6135498970000001,
          months: [7, 8, 9, 10],
          name: 'Figue',
          slug: 'figue',
          category: 'fruits',
        },
        {
          ecv: 4.652965420999999,
          months: [9, 10, 11],
          name: 'Noisette',
          slug: 'noisette',
          category: 'fruits à coque et graines oléagineuses',
        },
        {
          ecv: 4.164838912,
          months: [9, 10],
          name: 'Noix',
          slug: 'noix',
          category: 'fruits à coque et graines oléagineuses',
        },
        {
          ecv: 0.36428259399999996,
          months: [1, 2, 3, 8, 9, 10, 11, 12],
          name: 'Poire',
          slug: 'poire',
          category: 'fruits',
        },
        {
          ecv: 0.45672809300000006,
          months: [9, 10],
          name: 'Raisin',
          slug: 'raisin',
          category: 'fruits',
        },
        {
          ecv: 0.9025554720000001,
          months: [9, 10, 11],
          name: 'Brocoli',
          slug: 'brocoli',
          category: 'légumes',
        },
        {
          ecv: 1.292282106,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Ananas',
          slug: 'ananas',
          category: 'fruits',
        },
        {
          ecv: 0.8806108929999998,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Banane',
          slug: 'banane',
          category: 'fruits',
        },
        {
          ecv: 1.4804702330000001,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Avocat',
          slug: 'avocat',
          category: 'légumes',
        },
        {
          ecv: 2.7601109879999997,
          months: [1, 10, 11, 12],
          name: 'Datte',
          slug: 'datte',
          category: 'fruits',
        },
        {
          ecv: 0.89281737,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Fruit de la passion',
          slug: 'fruitdelapassion',
          category: 'fruits',
        },
        {
          ecv: 0.9004313517,
          months: [1, 10, 11, 12],
          name: 'Kaki',
          slug: 'kaki',
          category: 'fruits',
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })

  test('get specific categories', async () => {
    const result = await fetch('http://localhost:3000/api/v1/fruitsetlegumes?month=10&categories=1,3')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          ecv: 0.39651508300000005,
          months: [1, 2, 3, 4, 8, 9, 10, 11, 12],
          name: 'Pomme',
          slug: 'pomme',
          category: 'fruits',
        },
        {
          ecv: 0.35804289400000006,
          months: [7, 8, 9, 10, 11, 12],
          name: 'Ail',
          slug: 'ail',
          category: 'herbes',
        },
        {
          ecv: 10.641545367,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Mangue',
          slug: 'mangue',
          category: 'fruits',
        },
        {
          ecv: 0.5410901117,
          months: [10],
          name: 'Coing',
          slug: 'coing',
          category: 'fruits',
        },
        {
          ecv: 0.6135498970000001,
          months: [7, 8, 9, 10],
          name: 'Figue',
          slug: 'figue',
          category: 'fruits',
        },
        {
          ecv: 0.36428259399999996,
          months: [1, 2, 3, 8, 9, 10, 11, 12],
          name: 'Poire',
          slug: 'poire',
          category: 'fruits',
        },
        {
          ecv: 0.45672809300000006,
          months: [9, 10],
          name: 'Raisin',
          slug: 'raisin',
          category: 'fruits',
        },
        {
          ecv: 1.292282106,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Ananas',
          slug: 'ananas',
          category: 'fruits',
        },
        {
          ecv: 0.8806108929999998,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Banane',
          slug: 'banane',
          category: 'fruits',
        },
        {
          ecv: 2.7601109879999997,
          months: [1, 10, 11, 12],
          name: 'Datte',
          slug: 'datte',
          category: 'fruits',
        },
        {
          ecv: 0.89281737,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Fruit de la passion',
          slug: 'fruitdelapassion',
          category: 'fruits',
        },
        {
          ecv: 0.9004313517,
          months: [1, 10, 11, 12],
          name: 'Kaki',
          slug: 'kaki',
          category: 'fruits',
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })
})
