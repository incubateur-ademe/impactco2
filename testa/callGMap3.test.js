// import mockAxios from 'jest-mock-axios'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createMocks } from 'node-mocks-http'
import callGMap from 'pages/api/callGMap'
import matrixjson from 'test-mock/matrix.json'

describe.only('CallGMap with mocks', () => {
  let mock
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env, GMAP_API_KEY: 'MOCKED_GMAP_KEY' }
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    process.env = env
    mock.reset()
  })
  it('200: Should reach the distancematrix API', async () => {
    // Create mock request and response objects
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/callGMap?nantes',
    })

    mock
      .onGet('https://maps.googleapis.com/maps/api/distancematrix/json?nantes=&key=MOCKED_GMAP_KEY')
      .reply(200, matrixjson)

    // Call the route function with the mock objects
    await callGMap(req, res)

    // Assert the expected behavior
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toStrictEqual(matrixjson)
    // expect(mockAxios.get).toHaveBeenCalledWith('/web-service-url/', { data: 'clientMessage' })
  })
})
