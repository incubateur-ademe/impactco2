import { Equivalent } from 'types/equivalent'
import formatUsage from 'utils/formatUsage'

describe('formatUsage', () => {
  const exampleOfEquivalent = {
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
    display: {
      max: 50,
    },
    id: 20,
  } satisfies Equivalent

  test("Calcule l'équivalent carbone d'un usage", () => {
    const res = formatUsage(exampleOfEquivalent)
    expect(res).toEqual(0.0604)
  })
})
