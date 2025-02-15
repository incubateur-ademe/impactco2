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
          ecv: 0.40819489999999997,
          months: [1, 2, 3, 4, 8, 9, 10, 11, 12],
          name: 'Pomme',
          slug: 'pomme',
          category: 'fruits',
        },
        {
          ecv: 0.38349300000000003,
          months: [7, 8, 9, 10, 11, 12],
          name: 'Ail',
          slug: 'ail',
          category: 'herbes',
        },
        {
          ecv: 0.40736649999999996,
          months: [1, 2, 3, 10, 11, 12],
          name: 'Betterave',
          slug: 'betterave',
          category: 'légumes',
        },
        {
          ecv: 0.5811,
          months: [6, 7, 8, 9, 10, 11],
          name: 'Blette',
          slug: 'blette',
          category: 'légumes',
        },
        {
          ecv: 0.3960665,
          months: [1, 2, 3, 9, 10, 11, 12],
          name: 'Carotte',
          slug: 'carotte',
          category: 'légumes',
        },
        {
          ecv: 0.7157324,
          months: [1, 2, 3, 10, 11, 12],
          name: 'Céleri',
          slug: 'celeri',
          category: 'légumes',
        },
        {
          ecv: 6.175009000000001,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Champignon (morille crue)',
          slug: 'champignonmorille',
          category: 'légumes',
        },
        {
          ecv: 0.8476329999999999,
          months: [1, 2, 3, 10, 11, 12],
          name: 'Chou',
          slug: 'chou',
          category: 'légumes',
        },
        {
          ecv: 0.562147,
          months: [1, 2, 3, 10, 11, 12],
          name: 'Chou de Bruxelles',
          slug: 'choudebruxelles',
          category: 'légumes',
        },
        {
          ecv: 0.720705,
          months: [1, 2, 3, 9, 10, 11, 12],
          name: 'Chou-fleur',
          slug: 'choufleur',
          category: 'légumes',
        },
        {
          ecv: 0.5122949,
          months: [5, 6, 7, 8, 9, 10],
          name: 'Concombre',
          slug: 'concombre',
          category: 'légumes',
        },
        {
          ecv: 0.6382,
          months: [1, 9, 10, 11, 12],
          name: 'Courge',
          slug: 'courge',
          category: 'légumes',
        },
        {
          ecv: 0.49850700000000003,
          months: [5, 6, 7, 8, 9, 10],
          name: 'Courgette',
          slug: 'courgette',
          category: 'légumes',
        },
        {
          ecv: 0.868145,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Cresson',
          slug: 'cresson',
          category: 'légumes',
        },
        {
          ecv: 0.3935757,
          months: [10, 11, 12],
          name: 'Échalote',
          slug: 'echalote',
          category: 'légumes',
        },
        {
          ecv: 0.861009,
          months: [1, 2, 3, 4, 5, 10],
          name: 'Endive',
          slug: 'endive',
          category: 'légumes',
        },
        {
          ecv: 0.42256999999999995,
          months: [1, 2, 3, 4, 5, 9, 10, 11, 12],
          name: 'Épinard',
          slug: 'epinard',
          category: 'légumes',
        },
        {
          ecv: 11.655508000000001,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Mangue (importée par avion)',
          slug: 'mangue',
          category: 'fruits',
        },
        {
          ecv: 0.727508,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Mangue (importée par bateau)',
          slug: 'manguebateau',
          category: 'fruits',
        },
        {
          ecv: 1.018233,
          months: [4, 6, 7, 8, 9, 10, 11],
          name: 'Fenouil',
          slug: 'fenouil',
          category: 'légumes',
        },
        {
          ecv: 0.44645700000000005,
          months: [6, 7, 8, 9, 10],
          name: 'Haricot vert (cru)',
          slug: 'haricotvert',
          category: 'légumes',
        },
        {
          ecv: 0.868145,
          months: [1, 2, 10, 11, 12],
          name: 'Mâche',
          slug: 'mache',
          category: 'légumes',
        },
        {
          ecv: 0.3961,
          months: [1, 2, 3, 4, 5, 10, 11, 12],
          name: 'Navet',
          slug: 'navet',
          category: 'légumes',
        },
        {
          ecv: 0.4204685,
          months: [1, 2, 3, 4, 9, 10, 11, 12],
          name: 'Oignon',
          slug: 'oignon',
          category: 'légumes',
        },
        {
          ecv: 0.4942756,
          months: [1, 2, 3, 10, 11, 12],
          name: 'Panais',
          slug: 'panais',
          category: 'légumes',
        },
        {
          ecv: 0.6113778000000001,
          months: [1, 2, 3, 4, 9, 10, 11, 12],
          name: 'Poireau',
          slug: 'poireau',
          category: 'légumes',
        },
        {
          ecv: 0.6382329999999999,
          months: [1, 9, 10, 11, 12],
          name: 'Potiron',
          slug: 'potiron',
          category: 'légumes',
        },
        {
          ecv: 1.943945,
          months: [10, 11],
          name: 'Châtaigne',
          slug: 'chataigne',
          category: 'fruits à coque et graines oléagineuses',
        },
        {
          ecv: 0.5615215,
          months: [10],
          name: 'Coing',
          slug: 'coing',
          category: 'fruits',
        },
        {
          ecv: 0.611508,
          months: [7, 8, 9, 10],
          name: 'Figue',
          slug: 'figue',
          category: 'fruits',
        },
        {
          ecv: 4.8111999999999995,
          months: [9, 10, 11],
          name: 'Noisette',
          slug: 'noisette',
          category: 'fruits à coque et graines oléagineuses',
        },
        {
          ecv: 4.114,
          months: [9, 10],
          name: 'Noix',
          slug: 'noix',
          category: 'fruits à coque et graines oléagineuses',
        },
        {
          ecv: 0.387319,
          months: [1, 2, 3, 8, 9, 10, 11, 12],
          name: 'Poire',
          slug: 'poire',
          category: 'fruits',
        },
        {
          ecv: 0.5092949,
          months: [9, 10],
          name: 'Raisin',
          slug: 'raisin',
          category: 'fruits',
        },
        {
          ecv: 0.950705,
          months: [9, 10, 11],
          name: 'Brocoli',
          slug: 'brocoli',
          category: 'légumes',
        },
        {
          ecv: 1.3614345,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Ananas',
          slug: 'ananas',
          category: 'fruits',
        },
        {
          ecv: 0.908523,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Banane',
          slug: 'banane',
          category: 'fruits',
        },
        {
          ecv: 1.5525229999999999,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Avocat',
          slug: 'avocat',
          category: 'légumes',
        },
        {
          ecv: 2.8927609999999997,
          months: [1, 10, 11, 12],
          name: 'Datte',
          slug: 'datte',
          category: 'fruits',
        },
        {
          ecv: 0.937608,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Fruit de la passion',
          slug: 'fruitdelapassion',
          category: 'fruits',
        },
        {
          ecv: 0.9495215,
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
          ecv: 0.40819489999999997,
          months: [1, 2, 3, 4, 8, 9, 10, 11, 12],
          name: 'Pomme',
          slug: 'pomme',
          category: 'fruits',
        },
        {
          ecv: 0.38349300000000003,
          months: [7, 8, 9, 10, 11, 12],
          name: 'Ail',
          slug: 'ail',
          category: 'herbes',
        },
        {
          ecv: 11.655508000000001,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Mangue (importée par avion)',
          slug: 'mangue',
          category: 'fruits',
        },
        {
          ecv: 0.727508,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Mangue (importée par bateau)',
          slug: 'manguebateau',
          category: 'fruits',
        },
        {
          ecv: 0.5615215,
          months: [10],
          name: 'Coing',
          slug: 'coing',
          category: 'fruits',
        },
        {
          ecv: 0.611508,
          months: [7, 8, 9, 10],
          name: 'Figue',
          slug: 'figue',
          category: 'fruits',
        },
        {
          ecv: 0.387319,
          months: [1, 2, 3, 8, 9, 10, 11, 12],
          name: 'Poire',
          slug: 'poire',
          category: 'fruits',
        },
        {
          ecv: 0.5092949,
          months: [9, 10],
          name: 'Raisin',
          slug: 'raisin',
          category: 'fruits',
        },
        {
          ecv: 1.3614345,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Ananas',
          slug: 'ananas',
          category: 'fruits',
        },
        {
          ecv: 0.908523,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Banane',
          slug: 'banane',
          category: 'fruits',
        },
        {
          ecv: 2.8927609999999997,
          months: [1, 10, 11, 12],
          name: 'Datte',
          slug: 'datte',
          category: 'fruits',
        },
        {
          ecv: 0.937608,
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          name: 'Fruit de la passion',
          slug: 'fruitdelapassion',
          category: 'fruits',
        },
        {
          ecv: 0.9495215,
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
