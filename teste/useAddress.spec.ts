import { expect, test } from '@playwright/test'
import { searchAddress } from 'hooks/useAddress'

// On se permet de tester directement l'api Photomon parceque ce n'est pas tres bien documenté
// On teste donc les use cases en entier
test('search for an adress', async () => {
  const result = await searchAddress('6 rue du chemin vert')

  expect(result.length).toEqual(15)
  expect(result[0].geometry.coordinates).toEqual([1.6386030000000045, 46.901450499999996])
  expect(result[0].properties).toEqual({
    city: 'Vineuil',
    county: 'Indre',
    district: 'Montabord',
    extent: [1.638497, 46.901526, 1.638693, 46.901388],
    housenumber: '6',
    locality: 'Vineuil',
    osm_id: 188630915,
    osm_key: 'building',
    osm_type: 'W',
    osm_value: 'yes',
    postcode: '36110',
    state: 'Centre-Val de Loire',
    street: 'Rue du Chemin Vert',
    type: 'house',
    country: 'France',
    countrycode: 'FR',
  })
})

test('limit number of results', async () => {
  const result = await searchAddress('6 rue du chemin vert', 2)
  expect(result.length).toEqual(2)
})

test('search for a street', async () => {
  const result = await searchAddress('rue auvry')

  expect(result.length).toEqual(1)
  expect(result[0].geometry.coordinates).toEqual([2.3878640930207595, 48.90383561069475])
  expect(result[0].properties).toEqual({
    extent: [2.3867991, 48.9040244, 2.3889291, 48.9036469],
    name: 'Rue Auvry',
    osm_id: 31298936,
    osm_key: 'highway',
    osm_type: 'W',
    osm_value: 'residential',
    postcode: '93300',
    state: 'Île-de-France',
    type: 'street',
    city: 'Aubervilliers',
    country: 'France',
    countrycode: 'FR',
    county: 'Seine-Saint-Denis',
    district: 'Villette - Quatre-Chemins',
  })
})

test('search for a city', async () => {
  const result = await searchAddress('paris')

  expect(result.length).toEqual(15)
  expect(result[0].geometry.coordinates).toEqual([2.3483915, 48.8534951])
  expect(result[0].properties).toEqual({
    extent: [2.224122, 48.902156, 2.4697602, 48.8155755],
    name: 'Paris',
    osm_id: 71525,
    osm_key: 'place',
    osm_type: 'R',
    osm_value: 'city',
    state: 'Île-de-France',
    type: 'city',
    country: 'France',
    countrycode: 'FR',
  })
})

test('return french results first', async () => {
  const result = await searchAddress('bern')

  expect(result.length).toEqual(15)
  expect(result[0].properties).toEqual({
    extent: [0.1505383, 46.0758734, 0.1874942, 46.0327634],
    osm_key: 'place',
    osm_type: 'R',
    type: 'city',
    country: 'France',
    countrycode: 'FR',
    osm_value: 'village',
    postcode: '16700',
    state: 'Nouvelle-Aquitaine',
    name: 'Bernac',
    osm_id: 254307,
    county: 'Charente',
  })
})
