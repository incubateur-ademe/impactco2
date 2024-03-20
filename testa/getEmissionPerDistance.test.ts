import { NextApiRequest, NextApiResponse } from 'next'
import { createMocks } from 'node-mocks-http'
import getEmissionsPerDistance from 'pages/api/getEmissionsPerDistance'

describe('getEmissionPerDistance', () => {
  test('peut être filtré par champ', async () => {
    // Given
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      url: '/api/getEmissionsPerDistance?km=3&fields=emoji,display&transportations=14',
    })

    // When
    await getEmissionsPerDistance(req, res)

    // Then
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual([
      {
        display: { max: 100, min: 11 },
        emissions: { gco2e: 19.799999999999997, kgco2e: 0.019799999999999998, tco2e: 0.000019799999999999997 },
        emoji: '🚃',
        id: 14,
        name: 'RER ou Transilien',
      },
    ])
  })
  test('peut renvoyer toutes les données de manière brute', async () => {
    // Given
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      url: '/api/getEmissionsPerDistance',
    })

    // When
    await getEmissionsPerDistance(req, res)

    // Then
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual([
      {
        emissions: {
          gco2e: 258.2,
          kgco2e: 0.2582,
          tco2e: 0.0002582,
        },
        id: 1,
        name: 'Avion (court courrier)',
      },
      {
        emissions: {
          gco2e: 2.3,
          kgco2e: 0.0023,
          tco2e: 0.0000023,
        },
        id: 2,
        name: 'TGV',
      },
      {
        emissions: {
          gco2e: 5.8,
          kgco2e: 0.0058,
          tco2e: 0.0000057999999999999995,
        },
        id: 3,
        name: 'Intercités',
      },
      { id: 4, name: 'Voiture (Moteur thermique)', emissions: { gco2e: 192, kgco2e: 0.192, tco2e: 0.000192 } },
      { id: 5, name: 'Voiture (Moteur électrique)', emissions: { gco2e: 19.8, kgco2e: 0.0198, tco2e: 0.0000198 } },
      {
        emissions: {
          gco2e: 25,
          kgco2e: 0.025,
          tco2e: 0.000025,
        },
        id: 6,
        name: 'Autocar',
      },
      { id: 7, name: 'Vélo ou marche', emissions: { gco2e: 0, kgco2e: 0, tco2e: 0 } },
      {
        id: 8,
        name: 'Vélo (ou trottinette) à assistance électrique',
        emissions: { gco2e: 2.2300000000000004, kgco2e: 0.00223, tco2e: 0.0000022300000000000002 },
      },
      { id: 9, name: 'Bus (Moteur thermique)', emissions: { gco2e: 104.3, kgco2e: 0.1043, tco2e: 0.0001043 } },
      { id: 10, name: 'Tramway', emissions: { gco2e: 3.8, kgco2e: 0.0038, tco2e: 0.0000038 } },
      { id: 11, name: 'Métro', emissions: { gco2e: 4.2, kgco2e: 0.0042, tco2e: 0.0000042 } },
      {
        id: 12,
        name: 'Scooter ou moto légère',
        emissions: { gco2e: 60.400000000000006, kgco2e: 0.0604, tco2e: 0.000060400000000000004 },
      },

      {
        emissions: {
          gco2e: 164.8,
          kgco2e: 0.1648,
          tco2e: 0.0001648,
        },
        id: 13,
        name: 'Moto',
      },
      {
        emissions: {
          gco2e: 6.6,
          kgco2e: 0.0066,
          tco2e: 0.0000066,
        },
        id: 14,
        name: 'RER ou Transilien',
      },
      { id: 15, name: 'TER', emissions: { gco2e: 22.9, kgco2e: 0.0229, tco2e: 0.0000229 } },
      { id: 16, name: 'Bus (Moteur électrique)', emissions: { gco2e: 9.5, kgco2e: 0.0095, tco2e: 0.0000095 } },
      { id: 21, name: 'Bus (GNV)', emissions: { gco2e: 112.8, kgco2e: 0.1128, tco2e: 0.0001128 } },
    ])
  })
})
