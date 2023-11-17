import { createMocks } from 'node-mocks-http'
import getEmissionsPerDistance from 'pages/api/getEmissionsPerDistance.js'

it('getEmissionPerDistance', async () => {
  // Create mock request and response objects
  const { req, res } = createMocks({
    method: 'GET',
    url: '/api/getEmissionsPerDistance?km=3&fields=description,emoji,display&transportations=14',
  })

  // Call the route function with the mock objects
  await getEmissionsPerDistance(req, res)

  // Assert the expected behavior
  expect(res._getStatusCode()).toBe(200)
  expect(JSON.parse(res._getData())).toEqual([
    {
      description: '4,1 gCO2e/km/personne ; Base Carbone ADEME',
      display: { max: 100, min: 11 },
      emissions: { gco2e: 12.299999999999999, kgco2e: 0.012299999999999998, tco2e: 0.000012299999999999999 },
      emoji: { main: '🚃' },
      id: 14,
      name: 'RER ou Transilien',
    },
  ])
})
