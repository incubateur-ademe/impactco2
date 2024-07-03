import { getMonthsLabel } from 'utils/months'

describe('months', () => {
  test('With december and january', () => {
    expect(getMonthsLabel([0, 1, 10, 11], 'fr')).toEqual('De novembre à février.')
    expect(getMonthsLabel([0, 1, 10, 11], 'en')).toEqual('From November to February.')
  })
  test('random order', () => {
    expect(getMonthsLabel([1, 11, 0, 10], 'fr')).toEqual('De novembre à février.')
    expect(getMonthsLabel([1, 11, 0, 10], 'en')).toEqual('From November to February.')
  })
  test('continuous period', () => {
    expect(getMonthsLabel([5, 6, 7, 8, 9], 'fr')).toEqual('De juin à octobre.')
    expect(getMonthsLabel([5, 6, 7, 8, 9], 'en')).toEqual('From June to October.')
  })
  test('single month', () => {
    expect(getMonthsLabel([6], 'fr')).toEqual('En juillet.')
    expect(getMonthsLabel([6], 'en')).toEqual('In July.')
  })
  test('multiple values', () => {
    expect(getMonthsLabel([7, 10], 'fr')).toEqual('En août, en novembre.')
    expect(getMonthsLabel([7, 10], 'en')).toEqual('In August, in November.')
  })
  test('all months', () => {
    expect(getMonthsLabel([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 'fr')).toEqual("Toute l'année.")
    expect(getMonthsLabel([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 'en')).toEqual('All year long.')
  })
  test('no months', () => {
    expect(getMonthsLabel([], 'fr')).toEqual("Toute l'année.")
    expect(getMonthsLabel([], 'en')).toEqual('All year long.')
  })
})
