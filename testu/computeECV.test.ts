import { computeECV, computeECVWithMultiplier } from 'utils/computeECV'

const equivalent = {
  name: 'test',
  slug: 'test',
  emoji: 'test',
  category: 1,
  default: false,
  tile: false,
  meta: {
    title: 'Test',
    description: 'Test ',
  },
}

describe('computeECV', () => {
  test('compute ecv with total (ignore ecv), usage and end of life', () => {
    expect(
      computeECV({
        ...equivalent,
        total: 25,
        ecv: [
          {
            id: 1,
            value: 5000,
          },
        ],
        usage: {
          defaultyears: 2,
          peryear: 11,
        },
        end: -30,
      })
    ).toEqual(17)
  })

  test('compute ecv with only total', () => {
    expect(
      computeECV({
        ...equivalent,
        total: 25,
      })
    ).toEqual(25)
  })

  test('compute ecv with total and end of life', () => {
    expect(
      computeECV({
        ...equivalent,
        total: 25,
        end: 10,
      })
    ).toEqual(35)
  })

  test('compute ecv with total and usage', () => {
    expect(
      computeECV({
        ...equivalent,
        total: 25,
        usage: {
          defaultyears: 10,
          peryear: 5,
        },
      })
    ).toEqual(75)
  })

  test('compute ecv with total, usage and non defaut years of usage', () => {
    expect(
      computeECV(
        {
          ...equivalent,
          total: 25,
          usage: {
            defaultyears: 10,
            peryear: 5,
          },
        },
        5
      )
    ).toEqual(50)
  })

  test('compute ecv with ecv, usage and end of life', () => {
    expect(
      computeECV({
        ...equivalent,
        ecv: [
          {
            id: 1,
            value: 1,
          },
          {
            id: 2,
            value: 3,
          },
          {
            id: 5,
            value: 10,
          },
        ],
        usage: {
          defaultyears: 2,
          peryear: 11,
        },
        end: -30,
      })
    ).toEqual(6)
  })
})

describe('computeECVWithMultiplier', () => {
  test('compute regular ecv if no multiplier', () => {
    expect(computeECVWithMultiplier({ ...equivalent, total: 5 })).toEqual(5)
  })

  test('compute ecv times multiplier', () => {
    expect(computeECVWithMultiplier({ ...equivalent, total: 5, multiplier: 10 })).toEqual(50)
  })
})