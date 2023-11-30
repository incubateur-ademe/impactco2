import { expect, test } from '@playwright/test'
import { searchAddress } from 'hooks/useAddress'

test('search for an adress', async () => {
  const result = await searchAddress('6 rue du chemin vert')

  expect(result.length).toEqual(15)
  expect(result[0].geometry.coordinates).toEqual([3.1162161, 49.5861023])
  expect(result[0].properties).toEqual({
    extent: [3.11406, 49.5872215, 3.1183041, 49.5845896],
    type: 'street',
    osm_type: 'W',
    osm_key: 'highway',
    name: 'Rue du Chemin Vert',
    osm_value: 'track',
    postcode: '60400',
    state: 'Hauts-de-France',
    osm_id: 40880992,
    city: 'Appilly',
    country: 'France',
    countrycode: 'FR',
    county: 'Oise',
  })
})

test('limit number of results', async () => {
  const result = await searchAddress('6 rue du chemin vert', 2)
  expect(result.length).toEqual(2)
})

test('search for a street', async () => {
  const result = await searchAddress('rue auvry')

  expect(result.length).toEqual(1)
  expect(result[0].geometry.coordinates).toEqual([2.3867991, 48.9040244])
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
    extent: [2.0097893, 43.9648686, 2.0524487, 43.9414185],
    osm_key: 'place',
    osm_type: 'R',
    type: 'city',
    country: 'France',
    countrycode: 'FR',
    osm_value: 'village',
    postcode: '81150',
    state: 'Occitanie',
    name: 'Bernac',
    osm_id: 135610,
    county: 'Tarn',
  })
})
