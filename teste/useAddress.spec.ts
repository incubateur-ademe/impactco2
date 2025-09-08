import { expect, test } from '@playwright/test'
import { searchAddress } from 'hooks/useAddress'

// On se permet de tester directement l'api Photomon parceque ce n'est pas tres bien documenté
// On teste donc les use cases en entier
test('search for an adress', async () => {
  const result = await searchAddress('6 rue du chemin vert')

  expect(result.length).toEqual(15)
  expect(result[0].geometry.coordinates).toEqual([4.052435, 49.2461621])
  expect(result[0].properties).toEqual({
    city: 'Reims',
    county: 'Marne',
    district: 'Chemin-Vert',
    housenumber: '6',
    osm_id: 5857342241,
    osm_key: 'place',
    osm_type: 'N',
    osm_value: 'house',
    postcode: '51100',
    state: 'Grand Est',
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
  expect(result[0].geometry.coordinates).toEqual([2.388846, 48.9036616])
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
