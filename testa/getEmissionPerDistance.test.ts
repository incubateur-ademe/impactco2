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
        id: 14,
        name: 'RER ou Transilien',
        emissions: { gco2e: 19.799999999999997, kgco2e: 0.019799999999999998, tco2e: 0.000019799999999999997 },
        display: { min: 11, max: 100 },
      },
    ])
  })

  test('peut renvoyer toutes les données de manière brute', async () => {
    const result = await fetch('http://localhost:3000/api/getEmissionsPerDistance')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual([
      { id: 1, name: 'Avion trajet court', emissions: { gco2e: 224.20000000000002, kgco2e: 0.2242, tco2e: 0.0002242 } },
      { id: 2, name: 'TGV', emissions: { gco2e: 2.3, kgco2e: 0.0023, tco2e: 0.0000023 } },
      { id: 3, name: 'Intercités', emissions: { gco2e: 5.8, kgco2e: 0.0058, tco2e: 0.0000057999999999999995 } },
      {
        id: 4,
        name: 'Voiture thermique',
        emissions: { gco2e: 176.8941916693085, kgco2e: 0.1768941916693085, tco2e: 0.0001768941916693085 },
      },
      {
        id: 5,
        name: 'Voiture électrique',
        emissions: { gco2e: 19.3431516693085, kgco2e: 0.0193431516693085, tco2e: 0.000019343151669308502 },
      },
      {
        id: 6,
        name: 'Autocar thermique',
        emissions: { gco2e: 33.14, kgco2e: 0.03314, tco2e: 0.000033140000000000005 },
      },
      { id: 30, name: 'Marche', emissions: { gco2e: 0, kgco2e: 0, tco2e: 0 } },
      { id: 7, name: 'Vélo mécanique', emissions: { gco2e: 0, kgco2e: 0, tco2e: 0 } },
      {
        id: 8,
        name: 'Vélo à assistance électrique',
        emissions: { gco2e: 2.2300000000000004, kgco2e: 0.00223, tco2e: 0.0000022300000000000002 },
      },
      { id: 9, name: 'Bus thermique', emissions: { gco2e: 113.5, kgco2e: 0.1135, tco2e: 0.00011350000000000001 } },
      { id: 10, name: 'Tramway', emissions: { gco2e: 3.8, kgco2e: 0.0038, tco2e: 0.0000038 } },
      { id: 11, name: 'Métro', emissions: { gco2e: 4.2, kgco2e: 0.0042, tco2e: 0.0000042 } },
      {
        id: 12,
        name: 'Scooter thermique',
        emissions: { gco2e: 60.400000000000006, kgco2e: 0.0604, tco2e: 0.000060400000000000004 },
      },
      {
        id: 13,
        name: 'Moto thermique (> 250 cm³)',
        emissions: { gco2e: 140, kgco2e: 0.14, tco2e: 0.00014000000000000001 },
      },
      { id: 14, name: 'RER ou Transilien', emissions: { gco2e: 6.6, kgco2e: 0.0066, tco2e: 0.0000066 } },
      { id: 15, name: 'TER', emissions: { gco2e: 22.9, kgco2e: 0.0229, tco2e: 0.0000229 } },
      { id: 16, name: 'Bus électrique', emissions: { gco2e: 9.5, kgco2e: 0.0095, tco2e: 0.0000095 } },
      { id: 17, name: 'Trottinette à assistance électrique', emissions: { gco2e: 2, kgco2e: 0.002, tco2e: 0.000002 } },
      {
        id: 31,
        name: 'Camping-car thermique (1 personne)',
        emissions: { gco2e: 377.1932716693085, kgco2e: 0.3771932716693085, tco2e: 0.0003771932716693085 },
      },
      { id: 32, name: 'Moto thermique (<= 250 cm³)', emissions: { gco2e: 53, kgco2e: 0.053, tco2e: 0.000053 } },
      { id: 33, name: 'Scooter électrique', emissions: { gco2e: 20.7, kgco2e: 0.0207, tco2e: 0.0000207 } },
      {
        id: 34,
        name: 'Vélo cargo triporteur',
        emissions: { gco2e: 2.997, kgco2e: 0.002997, tco2e: 0.0000029970000000000003 },
      },
      {
        id: 35,
        name: 'Van thermique (1 personne)',
        emissions: { gco2e: 237.14601166930848, kgco2e: 0.2371460116693085, tco2e: 0.0002371460116693085 },
      },
      {
        id: 100,
        name: 'Voiture thermique (Petite - Essence - 1 personne)',
        emissions: { gco2e: 187.17147166930852, kgco2e: 0.1871714716693085, tco2e: 0.0001871714716693085 },
      },
      {
        id: 105,
        name: 'Voiture thermique (Petite - Diesel - 1 personne)',
        emissions: { gco2e: 150.6733216693085, kgco2e: 0.1506733216693085, tco2e: 0.0001506733216693085 },
      },
      {
        id: 110,
        name: 'Voiture électrique (Petite - 1 personne)',
        emissions: { gco2e: 18.4089516693085, kgco2e: 0.0184089516693085, tco2e: 0.0000184089516693085 },
      },
      {
        id: 115,
        name: 'Voiture hybride (Petite - Non rechargeable - 1 personne)',
        emissions: { gco2e: 169.68407166930848, kgco2e: 0.1696840716693085, tco2e: 0.00016968407166930848 },
      },
      {
        id: 120,
        name: 'Voiture hybride (Petite - Rechargeable - 1 personne)',
        emissions: { gco2e: 147.38923166930851, kgco2e: 0.1473892316693085, tco2e: 0.00014738923166930851 },
      },
      {
        id: 125,
        name: 'Voiture thermique (Moyenne - Essence - 1 personne)',
        emissions: { gco2e: 220.8215716693085, kgco2e: 0.2208215716693085, tco2e: 0.0002208215716693085 },
      },
      {
        id: 130,
        name: 'Voiture thermique (Moyenne - Diesel - 1 personne)',
        emissions: { gco2e: 176.8941916693085, kgco2e: 0.1768941916693085, tco2e: 0.0001768941916693085 },
      },
      {
        id: 135,
        name: 'Voiture électrique (Moyenne - 1 personne)',
        emissions: { gco2e: 19.3431516693085, kgco2e: 0.0193431516693085, tco2e: 0.000019343151669308502 },
      },
      {
        id: 140,
        name: 'Voiture hybride (Moyenne - Non rechargeable - 1 personne)',
        emissions: { gco2e: 181.47287166930852, kgco2e: 0.1814728716693085, tco2e: 0.0001814728716693085 },
      },
      {
        id: 145,
        name: 'Voiture hybride (Moyenne - Rechargeable - 1 personne)',
        emissions: { gco2e: 149.0707916693085, kgco2e: 0.1490707916693085, tco2e: 0.0001490707916693085 },
      },
      {
        id: 150,
        name: 'Voiture thermique (Berline - Essence - 1 personne)',
        emissions: { gco2e: 239.44347166930848, kgco2e: 0.2394434716693085, tco2e: 0.0002394434716693085 },
      },
      {
        id: 155,
        name: 'Voiture thermique (Berline - Diesel - 1 personne)',
        emissions: { gco2e: 230.0543116693085, kgco2e: 0.2300543116693085, tco2e: 0.00023005431166930852 },
      },
      {
        id: 160,
        name: 'Voiture électrique (Berline - 1 personne)',
        emissions: { gco2e: 23.5781916693085, kgco2e: 0.0235781916693085, tco2e: 0.0000235781916693085 },
      },
      {
        id: 165,
        name: 'Voiture hybride (Berline - Non rechargeable - 1 personne)',
        emissions: { gco2e: 207.6292716693085, kgco2e: 0.2076292716693085, tco2e: 0.0002076292716693085 },
      },
      {
        id: 170,
        name: 'Voiture hybride (Berline - Rechargeable - 1 personne)',
        emissions: { gco2e: 185.2955216693085, kgco2e: 0.1852955216693085, tco2e: 0.00018529552166930848 },
      },
      {
        id: 175,
        name: 'Voiture thermique (SUV - Essence - 1 personne)',
        emissions: { gco2e: 330.5927716693085, kgco2e: 0.3305927716693085, tco2e: 0.0003305927716693085 },
      },
      {
        id: 180,
        name: 'Voiture thermique (SUV - Diesel - 1 personne)',
        emissions: { gco2e: 208.1437216693085, kgco2e: 0.2081437216693085, tco2e: 0.0002081437216693085 },
      },
      {
        id: 185,
        name: 'Voiture électrique (SUV - 1 personne)',
        emissions: { gco2e: 22.581711669308497, kgco2e: 0.0225817116693085, tco2e: 0.0000225817116693085 },
      },
      {
        id: 190,
        name: 'Voiture hybride (SUV - Non rechargeable - 1 personne)',
        emissions: { gco2e: 225.3124716693085, kgco2e: 0.2253124716693085, tco2e: 0.0002253124716693085 },
      },
      {
        id: 195,
        name: 'Voiture hybride (SUV - Rechargeable - 1 personne)',
        emissions: { gco2e: 219.72039166930853, kgco2e: 0.2197203916693085, tco2e: 0.00021972039166930852 },
      },
      {
        id: 200,
        name: 'Voiture hybride',
        emissions: { gco2e: 181.47287166930852, kgco2e: 0.1814728716693085, tco2e: 0.0001814728716693085 },
      },
    ])

    expect(data.length).toBe(44)
  })
})
