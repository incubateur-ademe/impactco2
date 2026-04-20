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
      {
        id: 4,
        name: 'Voiture thermique',
        emissions: {
          gco2e: 110.5577600556303,
          kgco2e: 0.1105577600556303,
          tco2e: 0.0001105577600556303,
        },
      },
      {
        id: 5,
        name: 'Voiture électrique',
        emissions: {
          gco2e: 12.08836005563031,
          kgco2e: 0.01208836005563031,
          tco2e: 0.00001208836005563031,
        },
      },
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
      {
        id: 100,
        name: 'Voiture thermique (Petite - Essence)',
        emissions: {
          gco2e: 116.98106005563031,
          kgco2e: 0.1169810600556303,
          tco2e: 0.0001169810600556303,
        },
      },
      {
        id: 105,
        name: 'Voiture thermique (Petite - Diesel)',
        emissions: {
          gco2e: 94.16971630563032,
          kgco2e: 0.09416971630563031,
          tco2e: 0.00009416971630563032,
        },
      },
      {
        id: 110,
        name: 'Voiture électrique (Petite)',
        emissions: {
          gco2e: 11.504485055630312,
          kgco2e: 0.011504485055630311,
          tco2e: 0.00001150448505563031,
        },
      },
      {
        id: 115,
        name: 'Voiture hybride (Petite - Non rechargeable)',
        emissions: {
          gco2e: 106.05143505563031,
          kgco2e: 0.1060514350556303,
          tco2e: 0.0001060514350556303,
        },
      },
      {
        id: 120,
        name: 'Voiture hybride (Petite - Rechargeable)',
        emissions: {
          gco2e: 92.11716005563031,
          kgco2e: 0.09211716005563031,
          tco2e: 0.00009211716005563032,
        },
      },
      {
        id: 125,
        name: 'Voiture thermique (Moyenne - Essence)',
        emissions: {
          gco2e: 138.01237255563032,
          kgco2e: 0.1380123725556303,
          tco2e: 0.00013801237255563033,
        },
      },
      {
        id: 130,
        name: 'Voiture thermique (Moyenne - Diesel)',
        emissions: {
          gco2e: 110.5577600556303,
          kgco2e: 0.1105577600556303,
          tco2e: 0.0001105577600556303,
        },
      },
      {
        id: 135,
        name: 'Voiture électrique (Moyenne)',
        emissions: {
          gco2e: 12.08836005563031,
          kgco2e: 0.01208836005563031,
          tco2e: 0.00001208836005563031,
        },
      },
      {
        id: 140,
        name: 'Voiture hybride (Moyenne - Non rechargeable)',
        emissions: {
          gco2e: 113.4194350556303,
          kgco2e: 0.1134194350556303,
          tco2e: 0.00011341943505563031,
        },
      },
      {
        id: 145,
        name: 'Voiture hybride (Moyenne - Rechargeable)',
        emissions: {
          gco2e: 93.1681350556303,
          kgco2e: 0.0931681350556303,
          tco2e: 0.00009316813505563031,
        },
      },
      {
        id: 150,
        name: 'Voiture thermique (Berline - Essence)',
        emissions: {
          gco2e: 149.6510600556303,
          kgco2e: 0.1496510600556303,
          tco2e: 0.0001496510600556303,
        },
      },
      {
        id: 155,
        name: 'Voiture thermique (Berline - Diesel)',
        emissions: {
          gco2e: 143.7828350556303,
          kgco2e: 0.1437828350556303,
          tco2e: 0.00014378283505563032,
        },
      },
      {
        id: 160,
        name: 'Voiture électrique (Berline)',
        emissions: {
          gco2e: 14.735260055630313,
          kgco2e: 0.014735260055630313,
          tco2e: 0.000014735260055630313,
        },
      },
      {
        id: 165,
        name: 'Voiture hybride (Berline - Non rechargeable)',
        emissions: {
          gco2e: 129.76718505563028,
          kgco2e: 0.12976718505563029,
          tco2e: 0.00012976718505563028,
        },
      },
      {
        id: 170,
        name: 'Voiture hybride (Berline - Rechargeable)',
        emissions: {
          gco2e: 115.80859130563032,
          kgco2e: 0.11580859130563032,
          tco2e: 0.00011580859130563031,
        },
      },
      {
        id: 175,
        name: 'Voiture thermique (SUV - Essence)',
        emissions: {
          gco2e: 206.6193725556303,
          kgco2e: 0.2066193725556303,
          tco2e: 0.0002066193725556303,
        },
      },
      {
        id: 180,
        name: 'Voiture thermique (SUV - Diesel)',
        emissions: {
          gco2e: 130.0887163056303,
          kgco2e: 0.1300887163056303,
          tco2e: 0.00013008871630563028,
        },
      },
      {
        id: 185,
        name: 'Voiture électrique (SUV)',
        emissions: {
          gco2e: 14.112460055630311,
          kgco2e: 0.014112460055630311,
          tco2e: 0.000014112460055630312,
        },
      },
      {
        id: 190,
        name: 'Voiture hybride (SUV - Non rechargeable)',
        emissions: {
          gco2e: 140.8191850556303,
          kgco2e: 0.1408191850556303,
          tco2e: 0.00014081918505563028,
        },
      },
      {
        id: 195,
        name: 'Voiture hybride (SUV - Rechargeable)',
        emissions: {
          gco2e: 137.32413505563028,
          kgco2e: 0.1373241350556303,
          tco2e: 0.00013732413505563028,
        },
      },
      {
        id: 200,
        name: 'Voiture hybride',
        emissions: {
          gco2e: 113.4194350556303,
          kgco2e: 0.1134194350556303,
          tco2e: 0.00011341943505563031,
        },
      },
    ])

    expect(data.length).toBe(40)
  })
})
