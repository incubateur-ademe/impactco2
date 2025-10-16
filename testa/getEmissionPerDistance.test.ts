/**
 * @jest-environment node
 */

describe('getEmissionPerDistance', () => {
  test('peut être filtré par champ', async () => {
    const result = await fetch(
      'http://localhost:3000/api/getEmissionsPerDistance?km=3&fields=emoji,display&transportations=14'
    )

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual([
      {
        display: { max: 100, min: 11 },
        emissions: { gco2e: 19.799999999999997, kgco2e: 0.019799999999999998, tco2e: 0.000019799999999999997 },
        id: 14,
        name: 'RER ou Transilien',
      },
    ])
  })

  test('peut renvoyer toutes les données de manière brute', async () => {
    const result = await fetch('http://localhost:3000/api/getEmissionsPerDistance')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual([
      {
        emissions: {
          gco2e: 224.20000000000002,
          kgco2e: 0.2242,
          tco2e: 0.0002242,
        },
        id: 1,
        name: 'Avion trajet court',
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
      { id: 4, name: 'Voiture thermique', emissions: { gco2e: 192, kgco2e: 0.192, tco2e: 0.000192 } },
      { id: 5, name: 'Voiture électrique', emissions: { gco2e: 19.8, kgco2e: 0.0198, tco2e: 0.0000198 } },
      {
        emissions: {
          gco2e: 33.14,
          kgco2e: 0.03314,
          tco2e: 0.000033140000000000005,
        },
        id: 6,
        name: 'Autocar thermique',
      },
      { id: 30, name: 'Marche', emissions: { gco2e: 0, kgco2e: 0, tco2e: 0 } },
      { id: 7, name: 'Vélo mécanique', emissions: { gco2e: 0, kgco2e: 0, tco2e: 0 } },
      {
        id: 8,
        name: 'Vélo à assistance électrique',
        emissions: { gco2e: 2.2300000000000004, kgco2e: 0.00223, tco2e: 0.0000022300000000000002 },
      },
      {
        id: 9,
        name: 'Bus thermique',
        emissions: {
          gco2e: 113.5,
          kgco2e: 0.1135,
          tco2e: 0.00011350000000000001,
        },
      },
      { id: 10, name: 'Tramway', emissions: { gco2e: 3.8, kgco2e: 0.0038, tco2e: 0.0000038 } },
      { id: 11, name: 'Métro', emissions: { gco2e: 4.2, kgco2e: 0.0042, tco2e: 0.0000042 } },
      {
        id: 12,
        name: 'Scooter ou moto légère thermique',
        emissions: { gco2e: 60.400000000000006, kgco2e: 0.0604, tco2e: 0.000060400000000000004 },
      },

      {
        emissions: {
          gco2e: 187.5,
          kgco2e: 0.1875,
          tco2e: 0.0001875,
        },
        id: 13,
        name: 'Moto thermique',
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
      { id: 16, name: 'Bus électrique', emissions: { gco2e: 9.5, kgco2e: 0.0095, tco2e: 0.0000095 } },
      {
        emissions: {
          gco2e: 2,
          kgco2e: 0.002,
          tco2e: 0.000002,
        },
        id: 17,
        name: 'Trottinette à assistance électrique',
      },
      { id: 21, name: 'Bus (GNV)', emissions: { gco2e: 112.8, kgco2e: 0.1128, tco2e: 0.0001128 } },
    ])
  })
})
