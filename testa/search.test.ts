// Import the route file and the library
import { http } from 'msw'
import { setupServer } from 'msw/node'
import { createMocks } from 'node-mocks-http'
import search from 'pages/api/search'

describe('Search', () => {
  test('should return a 400 with zod when wrong inputs', async () => {
    // Given
    const { req, res } = createMocks({
      method: 'POST',
      url: '/api/search',
      body: {
        search: 12,
      },
    })
    // When
    //@ts-expect-error: Wrong createMocks type
    await search(req, res)
    // Then
    expect(res._getStatusCode()).toBe(400)
    expect(res._getData()).toStrictEqual(
      '{"issues":[{"code":"invalid_type","expected":"string","received":"number","path":["search"],"message":"Expected string, received number"}],"name":"ZodError"}'
    )
  })
  test('search for an adress', async () => {
    // Given
    const { req, res } = createMocks({
      method: 'POST',
      url: '/api/search',
      body: {
        search: '6 rue du chemin vert',
      },
    })
    // When
    //@ts-expect-error: Wrong createMocks type
    await search(req, res)
    // Then
    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.features.length).toEqual(15)
    expect(data.features[0].geometry.coordinates).toEqual([4.4419203, 50.4274485])
    expect(data.features[0].properties).toEqual({
      osm_id: 252349916,
      extent: [4.4418593, 50.4279623, 4.4419926, 50.4270333],
      country: 'Belgique',
      city: 'Charleroi',
      countrycode: 'BE',
      postcode: '6042',
      county: 'Charleroi',
      type: 'street',
      osm_type: 'W',
      osm_key: 'highway',
      district: 'Lodelinsart',
      osm_value: 'residential',
      name: 'Rue du Chemin Vert',
      state: 'Hainaut',
    })
  })
  test('limit number of results', async () => {
    // Given
    const { req, res } = createMocks({
      method: 'POST',
      url: '/api/search',
      body: {
        search: '6 rue du chemin vert',
        limit: 2,
      },
    })
    // When
    //@ts-expect-error: Wrong createMocks type
    await search(req, res)
    // Then
    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.features.length).toEqual(2)
  })

  test('search for a street', async () => {
    // Given
    const { req, res } = createMocks({
      method: 'POST',
      url: '/api/search',
      body: {
        search: 'rue auvry',
      },
    })
    // When
    //@ts-expect-error: Wrong createMocks type
    await search(req, res)
    // Then
    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.features.length).toEqual(1)
    expect(data.features[0].geometry.coordinates).toEqual([2.3867991, 48.9040244])
    expect(data.features[0].properties).toEqual({
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
    // Given
    const { req, res } = createMocks({
      method: 'POST',
      url: '/api/search',
      body: {
        search: 'paris',
      },
    })
    // When
    //@ts-expect-error: Wrong createMocks type
    await search(req, res)
    // Then
    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.features.length).toEqual(15)
    expect(data.features[0].geometry.coordinates).toEqual([2.3483915, 48.8534951])
    expect(data.features[0].properties).toEqual({
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
  //---------
  // STUBBING PART BELOW
  //----------
  const server = setupServer(
    http.options('https://photon.komoot.io/api/', () => {}),
    http.get('https://photon.komoot.io/api/', () => {})
  )
  beforeAll(() => server.listen())
  afterAll(() => server.close())
})
