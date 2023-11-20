import { createMocks } from 'node-mocks-http'
import getEmissionsPerDistance from 'pages/api/getEmissionsPerDistance.js'

describe('getEmissionPerDistance', () => {
  test('peut être filtré par champ', async () => {
    // Given
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/getEmissionsPerDistance?km=3&fields=description,emoji,display&transportations=14',
    })

    // When
    await getEmissionsPerDistance(req, res)

    // Then
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
  test('peut renvoyer toutes les données de manière brute', async () => {
    // Given
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/getEmissionsPerDistance',
    })

    // When
    await getEmissionsPerDistance(req, res)

    // Then
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual([
      { id: 4, name: 'Voiture (thermique)', emissions: { gco2e: 193, kgco2e: 0.193, tco2e: 0.000193 } },
      { id: 5, name: 'Voiture (électrique)', emissions: { gco2e: 19.8, kgco2e: 0.0198, tco2e: 0.0000198 } },
      { id: 7, name: 'Vélo ou marche', emissions: { gco2e: 0, kgco2e: 0, tco2e: 0 } },
      {
        id: 8,
        name: 'Vélo (ou trottinette) à assistance électrique',
        emissions: { gco2e: 2, kgco2e: 0.002, tco2e: 0.000002 },
      },
      { id: 9, name: 'Bus (thermique)', emissions: { gco2e: 103, kgco2e: 0.103, tco2e: 0.000103 } },
      { id: 10, name: 'Tramway', emissions: { gco2e: 2.2, kgco2e: 0.0022, tco2e: 0.0000022 } },
      { id: 11, name: 'Métro', emissions: { gco2e: 2.5, kgco2e: 0.0025, tco2e: 0.0000025 } },
      { id: 12, name: 'Scooter et moto légère', emissions: { gco2e: 61.6, kgco2e: 0.0616, tco2e: 0.0000616 } },
      { id: 15, name: 'TER', emissions: { gco2e: 24.8, kgco2e: 0.0248, tco2e: 0.0000248 } },
      { id: 16, name: 'Bus (électrique)', emissions: { gco2e: 9.5, kgco2e: 0.0095, tco2e: 0.0000095 } },
      { id: 21, name: 'Bus (GNV)', emissions: { gco2e: 113, kgco2e: 0.113, tco2e: 0.000113 } },
    ])
  })
})
