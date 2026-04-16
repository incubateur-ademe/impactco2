/**
 * @jest-environment node
 */

describe('transport', () => {
  test('get default values for 100 km', async () => {
    const result = await fetch('http://localhost:3000/api/v1/transport?km=100')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          id: 3,
          name: 'Intercités',
          value: 0.58,
        },
        {
          id: 22,
          name: 'Covoiturage thermique (2 personnes)',
          value: 5.5278880027815145,
        },
        {
          id: 23,
          name: 'Covoiturage thermique (3 personnes)',
          value: 3.68525866852101,
        },
        {
          id: 24,
          name: 'Covoiturage thermique (4 personnes)',
          value: 2.7639440013907572,
        },
        {
          id: 25,
          name: 'Covoiturage thermique (5 personnes)',
          value: 2.211155201112606,
        },
        {
          id: 4,
          name: 'Voiture thermique',
          value: 11.055776005563029,
        },
        {
          id: 26,
          name: 'Covoiturage électrique (2 personnes)',
          value: 0.6044180027815155,
        },
        {
          id: 27,
          name: 'Covoiturage électrique (3 personnes)',
          value: 0.402945335187677,
        },
        {
          id: 28,
          name: 'Covoiturage électrique (4 personnes)',
          value: 0.30220900139075774,
        },
        {
          id: 29,
          name: 'Covoiturage électrique (5 personnes)',
          value: 0.2417672011126062,
        },
        {
          id: 5,
          name: 'Voiture électrique',
          value: 1.208836005563031,
        },
        {
          id: 6,
          name: 'Autocar thermique',
          value: 3.314,
        },
        {
          id: 13,
          name: 'Moto thermique',
          value: 18.75,
        },
        {
          id: 14,
          name: 'RER ou Transilien',
          value: 0.66,
        },
        {
          id: 15,
          name: 'TER',
          value: 2.29,
        },
        {
          id: 101,
          name: 'Covoiturage thermique (Petite - Essence - 2 personnes)',
          value: 5.849053002781515,
        },
        {
          id: 102,
          name: 'Covoiturage thermique (Petite - Essence - 3 personnes)',
          value: 3.89936866852101,
        },
        {
          id: 103,
          name: 'Covoiturage thermique (Petite - Essence - 4 personnes)',
          value: 2.9245265013907575,
        },
        {
          id: 104,
          name: 'Covoiturage thermique (Petite - Essence - 5 personnes)',
          value: 2.339621201112606,
        },
        {
          id: 100,
          name: 'Voiture thermique (Petite - Essence)',
          value: 11.69810600556303,
        },
        {
          id: 106,
          name: 'Covoiturage thermique (Petite - Diesel - 2 personnes)',
          value: 4.708485815281516,
        },
        {
          id: 107,
          name: 'Covoiturage thermique (Petite - Diesel - 3 personnes)',
          value: 3.1389905435210106,
        },
        {
          id: 108,
          name: 'Covoiturage thermique (Petite - Diesel - 4 personnes)',
          value: 2.354242907640758,
        },
        {
          id: 109,
          name: 'Covoiturage thermique (Petite - Diesel - 5 personnes)',
          value: 1.8833943261126063,
        },
        {
          id: 105,
          name: 'Voiture thermique (Petite - Diesel)',
          value: 9.416971630563031,
        },
        {
          id: 111,
          name: 'Covoiturage électrique (Petite - Électrique - 2 personnes)',
          value: 0.5752242527815156,
        },
        {
          id: 112,
          name: 'Covoiturage électrique (Petite - Électrique - 3 personnes)',
          value: 0.38348283518767706,
        },
        {
          id: 113,
          name: 'Covoiturage électrique (Petite - Électrique - 4 personnes)',
          value: 0.2876121263907578,
        },
        {
          id: 114,
          name: 'Covoiturage électrique (Petite - Électrique - 5 personnes)',
          value: 0.23008970111260624,
        },
        {
          id: 110,
          name: 'Voiture électrique (Petite - Électrique)',
          value: 1.1504485055630311,
        },
        {
          id: 116,
          name: 'Covoiturage hybride (Petite - Non rechargeable - 2 personnes)',
          value: 5.302571752781516,
        },
        {
          id: 117,
          name: 'Covoiturage hybride (Petite - Non rechargeable - 3 personnes)',
          value: 3.5350478351876773,
        },
        {
          id: 118,
          name: 'Covoiturage hybride (Petite - Non rechargeable - 4 personnes)',
          value: 2.651285876390758,
        },
        {
          id: 119,
          name: 'Covoiturage hybride (Petite - Non rechargeable - 5 personnes)',
          value: 2.121028701112606,
        },
        {
          id: 115,
          name: 'Voiture hybride (Petite - Non rechargeable)',
          value: 10.605143505563031,
        },
        {
          id: 121,
          name: 'Covoiturage hybride (Petite - Rechargeable - 2 personnes)',
          value: 4.605858002781515,
        },
        {
          id: 122,
          name: 'Covoiturage hybride (Petite - Rechargeable - 3 personnes)',
          value: 3.070572001854343,
        },
        {
          id: 123,
          name: 'Covoiturage hybride (Petite - Rechargeable - 4 personnes)',
          value: 2.3029290013907575,
        },
        {
          id: 124,
          name: 'Covoiturage hybride (Petite - Rechargeable - 5 personnes)',
          value: 1.842343201112606,
        },
        {
          id: 120,
          name: 'Voiture hybride (Petite - Rechargeable)',
          value: 9.21171600556303,
        },
        {
          id: 126,
          name: 'Covoiturage thermique (Moyenne - Essence - 2 personnes)',
          value: 6.900618627781515,
        },
        {
          id: 127,
          name: 'Covoiturage thermique (Moyenne - Essence - 3 personnes)',
          value: 4.60041241852101,
        },
        {
          id: 128,
          name: 'Covoiturage thermique (Moyenne - Essence - 4 personnes)',
          value: 3.4503093138907577,
        },
        {
          id: 129,
          name: 'Covoiturage thermique (Moyenne - Essence - 5 personnes)',
          value: 2.760247451112606,
        },
        {
          id: 125,
          name: 'Voiture thermique (Moyenne - Essence)',
          value: 13.80123725556303,
        },
        {
          id: 131,
          name: 'Covoiturage thermique (Moyenne - Diesel - 2 personnes)',
          value: 5.5278880027815145,
        },
        {
          id: 132,
          name: 'Covoiturage thermique (Moyenne - Diesel - 3 personnes)',
          value: 3.68525866852101,
        },
        {
          id: 133,
          name: 'Covoiturage thermique (Moyenne - Diesel - 4 personnes)',
          value: 2.7639440013907572,
        },
        {
          id: 134,
          name: 'Covoiturage thermique (Moyenne - Diesel - 5 personnes)',
          value: 2.211155201112606,
        },
        {
          id: 130,
          name: 'Voiture thermique (Moyenne - Diesel)',
          value: 11.055776005563029,
        },
        {
          id: 136,
          name: 'Covoiturage électrique (Moyenne - Électrique - 2 personnes)',
          value: 0.6044180027815155,
        },
        {
          id: 137,
          name: 'Covoiturage électrique (Moyenne - Électrique - 3 personnes)',
          value: 0.402945335187677,
        },
        {
          id: 138,
          name: 'Covoiturage électrique (Moyenne - Électrique - 4 personnes)',
          value: 0.30220900139075774,
        },
        {
          id: 139,
          name: 'Covoiturage électrique (Moyenne - Électrique - 5 personnes)',
          value: 0.2417672011126062,
        },
        {
          id: 135,
          name: 'Compacte électrique (Moyenne - Électrique)',
          value: 1.208836005563031,
        },
        {
          id: 141,
          name: 'Covoiturage hybride (Moyenne - Non rechargeable - 2 personnes)',
          value: 5.670971752781515,
        },
        {
          id: 142,
          name: 'Covoiturage hybride (Moyenne - Non rechargeable - 3 personnes)',
          value: 3.780647835187677,
        },
        {
          id: 143,
          name: 'Covoiturage hybride (Moyenne - Non rechargeable - 4 personnes)',
          value: 2.8354858763907576,
        },
        {
          id: 144,
          name: 'Covoiturage hybride (Moyenne - Non rechargeable - 5 personnes)',
          value: 2.268388701112606,
        },
        {
          id: 140,
          name: 'Voiture hybride (Moyenne - Non rechargeable)',
          value: 11.34194350556303,
        },
        {
          id: 146,
          name: 'Covoiturage hybride (Moyenne - Rechargeable - 2 personnes)',
          value: 4.658406752781516,
        },
        {
          id: 147,
          name: 'Covoiturage hybride (Moyenne - Rechargeable - 3 personnes)',
          value: 3.105604501854344,
        },
        {
          id: 148,
          name: 'Covoiturage hybride (Moyenne - Rechargeable - 4 personnes)',
          value: 2.329203376390758,
        },
        {
          id: 149,
          name: 'Covoiturage hybride (Moyenne - Rechargeable - 5 personnes)',
          value: 1.8633627011126062,
        },
        {
          id: 145,
          name: 'Voiture hybride (Moyenne - Rechargeable)',
          value: 9.316813505563031,
        },
        {
          id: 151,
          name: 'Covoiturage thermique (Berline - Essence - 2 personnes)',
          value: 7.482553002781516,
        },
        {
          id: 152,
          name: 'Covoiturage thermique (Berline - Essence - 3 personnes)',
          value: 4.9883686685210105,
        },
        {
          id: 153,
          name: 'Covoiturage thermique (Berline - Essence - 4 personnes)',
          value: 3.741276501390758,
        },
        {
          id: 154,
          name: 'Covoiturage thermique (Berline - Essence - 5 personnes)',
          value: 2.9930212011126063,
        },
        {
          id: 150,
          name: 'Voiture thermique (Berline - Essence)',
          value: 14.965106005563031,
        },
        {
          id: 156,
          name: 'Covoiturage thermique (Berline - Diesel - 2 personnes)',
          value: 7.189141752781516,
        },
        {
          id: 157,
          name: 'Covoiturage thermique (Berline - Diesel - 3 personnes)',
          value: 4.79276116852101,
        },
        {
          id: 158,
          name: 'Covoiturage thermique (Berline - Diesel - 4 personnes)',
          value: 3.594570876390758,
        },
        {
          id: 159,
          name: 'Covoiturage thermique (Berline - Diesel - 5 personnes)',
          value: 2.8756567011126064,
        },
        {
          id: 155,
          name: 'Voiture thermique (Berline - Diesel)',
          value: 14.378283505563031,
        },
        {
          id: 161,
          name: 'Covoiturage électrique (Berline - Électrique - 2 personnes)',
          value: 0.7367630027815156,
        },
        {
          id: 162,
          name: 'Covoiturage électrique (Berline - Électrique - 3 personnes)',
          value: 0.4911753351876771,
        },
        {
          id: 163,
          name: 'Covoiturage électrique (Berline - Électrique - 4 personnes)',
          value: 0.3683815013907578,
        },
        {
          id: 164,
          name: 'Covoiturage électrique (Berline - Électrique - 5 personnes)',
          value: 0.29470520111260623,
        },
        {
          id: 160,
          name: 'Voiture électrique (Berline - Électrique)',
          value: 1.4735260055630313,
        },
        {
          id: 166,
          name: 'Covoiturage hybride (Berline - Non rechargeable - 2 personnes)',
          value: 6.488359252781514,
        },
        {
          id: 167,
          name: 'Covoiturage hybride (Berline - Non rechargeable - 3 personnes)',
          value: 4.325572835187676,
        },
        {
          id: 168,
          name: 'Covoiturage hybride (Berline - Non rechargeable - 4 personnes)',
          value: 3.244179626390757,
        },
        {
          id: 169,
          name: 'Covoiturage hybride (Berline - Non rechargeable - 5 personnes)',
          value: 2.5953437011126055,
        },
        {
          id: 165,
          name: 'Voiture hybride (Berline - Non rechargeable)',
          value: 12.976718505563028,
        },
        {
          id: 171,
          name: 'Covoiturage hybride (Berline - Rechargeable - 2 personnes)',
          value: 5.790429565281515,
        },
        {
          id: 172,
          name: 'Covoiturage hybride (Berline - Rechargeable - 3 personnes)',
          value: 3.8602863768543436,
        },
        {
          id: 173,
          name: 'Covoiturage hybride (Berline - Rechargeable - 4 personnes)',
          value: 2.8952147826407577,
        },
        {
          id: 174,
          name: 'Covoiturage hybride (Berline - Rechargeable - 5 personnes)',
          value: 2.316171826112606,
        },
        {
          id: 170,
          name: 'Voiture hybride (Berline - Rechargeable)',
          value: 11.58085913056303,
        },
        {
          id: 176,
          name: 'Covoiturage thermique (SUV - Essence - 2 personnes)',
          value: 10.330968627781514,
        },
        {
          id: 177,
          name: 'Covoiturage thermique (SUV - Essence - 3 personnes)',
          value: 6.8873124185210095,
        },
        {
          id: 178,
          name: 'Covoiturage thermique (SUV - Essence - 4 personnes)',
          value: 5.165484313890757,
        },
        {
          id: 179,
          name: 'Covoiturage thermique (SUV - Essence - 5 personnes)',
          value: 4.1323874511126055,
        },
        {
          id: 175,
          name: 'Voiture thermique (SUV - Essence)',
          value: 20.66193725556303,
        },
        {
          id: 181,
          name: 'Covoiturage thermique (SUV - Diesel - 2 personnes)',
          value: 6.504435815281514,
        },
        {
          id: 182,
          name: 'Covoiturage thermique (SUV - Diesel - 3 personnes)',
          value: 4.3362905435210095,
        },
        {
          id: 183,
          name: 'Covoiturage thermique (SUV - Diesel - 4 personnes)',
          value: 3.252217907640757,
        },
        {
          id: 184,
          name: 'Covoiturage thermique (SUV - Diesel - 5 personnes)',
          value: 2.6017743261126056,
        },
        {
          id: 180,
          name: 'Voiture thermique (SUV - Diesel)',
          value: 13.008871630563029,
        },
        {
          id: 186,
          name: 'Covoiturage électrique (SUV - Électrique - 2 personnes)',
          value: 0.7056230027815156,
        },
        {
          id: 187,
          name: 'Covoiturage électrique (SUV - Électrique - 3 personnes)',
          value: 0.47041533518767703,
        },
        {
          id: 188,
          name: 'Covoiturage électrique (SUV - Électrique - 4 personnes)',
          value: 0.3528115013907578,
        },
        {
          id: 189,
          name: 'Covoiturage électrique (SUV - Électrique - 5 personnes)',
          value: 0.2822492011126062,
        },
        {
          id: 185,
          name: 'Voiture électrique (SUV - Électrique)',
          value: 1.4112460055630311,
        },
        {
          id: 191,
          name: 'Covoiturage hybride (SUV - Non rechargeable - 2 personnes)',
          value: 7.040959252781515,
        },
        {
          id: 192,
          name: 'Covoiturage hybride (SUV - Non rechargeable - 3 personnes)',
          value: 4.693972835187677,
        },
        {
          id: 193,
          name: 'Covoiturage hybride (SUV - Non rechargeable - 4 personnes)',
          value: 3.5204796263907574,
        },
        {
          id: 194,
          name: 'Covoiturage hybride (SUV - Non rechargeable - 5 personnes)',
          value: 2.816383701112606,
        },
        {
          id: 190,
          name: 'Voiture hybride (SUV - Non rechargeable)',
          value: 14.08191850556303,
        },
        {
          id: 196,
          name: 'Covoiturage hybride (SUV - Rechargeable - 2 personnes)',
          value: 6.8662067527815145,
        },
        {
          id: 197,
          name: 'Covoiturage hybride (SUV - Rechargeable - 3 personnes)',
          value: 4.57747116852101,
        },
        {
          id: 198,
          name: 'Covoiturage hybride (SUV - Rechargeable - 4 personnes)',
          value: 3.4331033763907572,
        },
        {
          id: 199,
          name: 'Covoiturage hybride (SUV - Rechargeable - 5 personnes)',
          value: 2.7464827011126056,
        },
        {
          id: 195,
          name: 'Voiture hybride (SUV - Rechargeable)',
          value: 13.732413505563029,
        },
        {
          id: 201,
          name: 'Covoiturage hybride (2 personnes)',
          value: 4.658406752781516,
        },
        {
          id: 202,
          name: 'Covoiturage hybride (3 personnes)',
          value: 3.105604501854344,
        },
        {
          id: 203,
          name: 'Covoiturage hybride (4 personnes)',
          value: 2.329203376390758,
        },
        {
          id: 204,
          name: 'Covoiturage hybride (5 personnes)',
          value: 1.8633627011126062,
        },
        {
          id: 200,
          name: 'Voiture hybride',
          value: 9.316813505563031,
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })

  test('get values for 100 km in english', async () => {
    const result = await fetch('http://localhost:3000/api/v1/transport?km=100&language=en')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          id: 3,
          name: 'Intercity train',
          value: 0.58,
        },
        {
          id: 22,
          name: 'Carpooling combustion (2 people)',
          value: 5.5278880027815145,
        },
        {
          id: 23,
          name: 'Carpooling combustion (3 people)',
          value: 3.68525866852101,
        },
        {
          id: 24,
          name: 'Carpooling combustion (4 people)',
          value: 2.7639440013907572,
        },
        {
          id: 25,
          name: 'Carpooling combustion (5 people)',
          value: 2.211155201112606,
        },
        {
          id: 4,
          name: 'Combustion car',
          value: 11.055776005563029,
        },
        {
          id: 26,
          name: 'Carpooling electric (2 people)',
          value: 0.6044180027815155,
        },
        {
          id: 27,
          name: 'Carpooling electric (3 people)',
          value: 0.402945335187677,
        },
        {
          id: 28,
          name: 'Carpooling electric (4 people)',
          value: 0.30220900139075774,
        },
        {
          id: 29,
          name: 'Carpooling electric (5 people)',
          value: 0.2417672011126062,
        },
        {
          id: 5,
          name: 'Electric car',
          value: 1.208836005563031,
        },
        {
          id: 6,
          name: 'Combustion coach',
          value: 3.314,
        },
        {
          id: 13,
          name: 'Combustion motorcycle',
          value: 18.75,
        },
        {
          id: 14,
          name: 'RER or suburban train',
          value: 0.66,
        },
        {
          id: 15,
          name: 'Regional train',
          value: 2.29,
        },
        {
          id: 101,
          name: 'Carpooling combustion (Small - Gasoline - 2 people)',
          value: 5.849053002781515,
        },
        {
          id: 102,
          name: 'Carpooling combustion (Small - Gasoline - 3 people)',
          value: 3.89936866852101,
        },
        {
          id: 103,
          name: 'Carpooling combustion (Small - Gasoline - 4 people)',
          value: 2.9245265013907575,
        },
        {
          id: 104,
          name: 'Carpooling combustion (Small - Gasoline - 5 people)',
          value: 2.339621201112606,
        },
        {
          id: 100,
          name: 'Combustion car (Small - Gasoline)',
          value: 11.69810600556303,
        },
        {
          id: 106,
          name: 'Carpooling combustion (Small - Diesel - 2 people)',
          value: 4.708485815281516,
        },
        {
          id: 107,
          name: 'Carpooling combustion (Small - Diesel - 3 people)',
          value: 3.1389905435210106,
        },
        {
          id: 108,
          name: 'Carpooling combustion (Small - Diesel - 4 people)',
          value: 2.354242907640758,
        },
        {
          id: 109,
          name: 'Carpooling combustion (Small - Diesel - 5 people)',
          value: 1.8833943261126063,
        },
        {
          id: 105,
          name: 'Combustion car (Small - Diesel)',
          value: 9.416971630563031,
        },
        {
          id: 111,
          name: 'Carpooling electric (Small - Electric - 2 people)',
          value: 0.5752242527815156,
        },
        {
          id: 112,
          name: 'Carpooling electric (Small - Electric - 3 people)',
          value: 0.38348283518767706,
        },
        {
          id: 113,
          name: 'Carpooling electric (Small - Electric - 4 people)',
          value: 0.2876121263907578,
        },
        {
          id: 114,
          name: 'Carpooling electric (Small - Electric - 5 people)',
          value: 0.23008970111260624,
        },
        {
          id: 110,
          name: 'Electric car (Small - Electric)',
          value: 1.1504485055630311,
        },
        {
          id: 116,
          name: 'Carpooling hybrid (Small - Non rechargeable - 2 people)',
          value: 5.302571752781516,
        },
        {
          id: 117,
          name: 'Carpooling hybrid (Small - Non rechargeable - 3 people)',
          value: 3.5350478351876773,
        },
        {
          id: 118,
          name: 'Carpooling hybrid (Small - Non rechargeable - 4 people)',
          value: 2.651285876390758,
        },
        {
          id: 119,
          name: 'Carpooling hybrid (Small - Non rechargeable - 5 people)',
          value: 2.121028701112606,
        },
        {
          id: 115,
          name: 'Hybrid car (Small - Non rechargeable)',
          value: 10.605143505563031,
        },
        {
          id: 121,
          name: 'Carpooling hybrid (Small - Plug-in - 2 people)',
          value: 4.605858002781515,
        },
        {
          id: 122,
          name: 'Carpooling hybrid (Small - Plug-in - 3 people)',
          value: 3.070572001854343,
        },
        {
          id: 123,
          name: 'Carpooling hybrid (Small - Plug-in - 4 people)',
          value: 2.3029290013907575,
        },
        {
          id: 124,
          name: 'Carpooling hybrid (Small - Plug-in - 5 people)',
          value: 1.842343201112606,
        },
        {
          id: 120,
          name: 'Hybrid car (Small - Plug-in)',
          value: 9.21171600556303,
        },
        {
          id: 126,
          name: 'Carpooling combustion (Medium - Gasoline - 2 people)',
          value: 6.900618627781515,
        },
        {
          id: 127,
          name: 'Carpooling combustion (Medium - Gasoline - 3 people)',
          value: 4.60041241852101,
        },
        {
          id: 128,
          name: 'Carpooling combustion (Medium - Gasoline - 4 people)',
          value: 3.4503093138907577,
        },
        {
          id: 129,
          name: 'Carpooling combustion (Medium - Gasoline - 5 people)',
          value: 2.760247451112606,
        },
        {
          id: 125,
          name: 'Combustion compact car (Medium - Gasoline)',
          value: 13.80123725556303,
        },
        {
          id: 131,
          name: 'Carpooling combustion (Medium - Diesel - 2 people)',
          value: 5.5278880027815145,
        },
        {
          id: 132,
          name: 'Carpooling combustion (Medium - Diesel - 3 people)',
          value: 3.68525866852101,
        },
        {
          id: 133,
          name: 'Carpooling combustion (Medium - Diesel - 4 people)',
          value: 2.7639440013907572,
        },
        {
          id: 134,
          name: 'Carpooling combustion (Medium - Diesel - 5 people)',
          value: 2.211155201112606,
        },
        {
          id: 130,
          name: 'Diesel compact car (Medium - Diesel)',
          value: 11.055776005563029,
        },
        {
          id: 136,
          name: 'Carpooling electric (Medium - Electric - 2 people)',
          value: 0.6044180027815155,
        },
        {
          id: 137,
          name: 'Carpooling electric (Medium - Electric - 3 people)',
          value: 0.402945335187677,
        },
        {
          id: 138,
          name: 'Carpooling electric (Medium - Electric - 4 people)',
          value: 0.30220900139075774,
        },
        {
          id: 139,
          name: 'Carpooling electric (Medium - Electric - 5 people)',
          value: 0.2417672011126062,
        },
        {
          id: 135,
          name: 'Electric compact car (Medium - Electric)',
          value: 1.208836005563031,
        },
        {
          id: 141,
          name: 'Carpooling hybrid (Medium - Non rechargeable - 2 people)',
          value: 5.670971752781515,
        },
        {
          id: 142,
          name: 'Carpooling hybrid (Medium - Non rechargeable - 3 people)',
          value: 3.780647835187677,
        },
        {
          id: 143,
          name: 'Carpooling hybrid (Medium - Non rechargeable - 4 people)',
          value: 2.8354858763907576,
        },
        {
          id: 144,
          name: 'Carpooling hybrid (Medium - Non rechargeable - 5 people)',
          value: 2.268388701112606,
        },
        {
          id: 140,
          name: 'Hybrid car (Medium - Non rechargeable)',
          value: 11.34194350556303,
        },
        {
          id: 146,
          name: 'Carpooling hybrid (Medium - Plug-in - 2 people)',
          value: 4.658406752781516,
        },
        {
          id: 147,
          name: 'Carpooling hybrid (Medium - Plug-in - 3 people)',
          value: 3.105604501854344,
        },
        {
          id: 148,
          name: 'Carpooling hybrid (Medium - Plug-in - 4 people)',
          value: 2.329203376390758,
        },
        {
          id: 149,
          name: 'Carpooling hybrid (Medium - Plug-in - 5 people)',
          value: 1.8633627011126062,
        },
        {
          id: 145,
          name: 'Hybrid car (Medium - Plug-in)',
          value: 9.316813505563031,
        },
        {
          id: 151,
          name: 'Carpooling combustion (Sedan - Gasoline - 2 people)',
          value: 7.482553002781516,
        },
        {
          id: 152,
          name: 'Carpooling combustion (Sedan - Gasoline - 3 people)',
          value: 4.9883686685210105,
        },
        {
          id: 153,
          name: 'Carpooling combustion (Sedan - Gasoline - 4 people)',
          value: 3.741276501390758,
        },
        {
          id: 154,
          name: 'Carpooling combustion (Sedan - Gasoline - 5 people)',
          value: 2.9930212011126063,
        },
        {
          id: 150,
          name: 'Combustionn (Sedan - Gasoline)',
          value: 14.965106005563031,
        },
        {
          id: 156,
          name: 'Carpooling combustion (Sedan - Diesel - 2 people)',
          value: 7.189141752781516,
        },
        {
          id: 157,
          name: 'Carpooling combustion (Sedan - Diesel - 3 people)',
          value: 4.79276116852101,
        },
        {
          id: 158,
          name: 'Carpooling combustion (Sedan - Diesel - 4 people)',
          value: 3.594570876390758,
        },
        {
          id: 159,
          name: 'Carpooling combustion (Sedan - Diesel - 5 people)',
          value: 2.8756567011126064,
        },
        {
          id: 155,
          name: 'Combustion car (Sedan - Diesel)',
          value: 14.378283505563031,
        },
        {
          id: 161,
          name: 'Carpooling electric (Sedan - Electric - 2 people)',
          value: 0.7367630027815156,
        },
        {
          id: 162,
          name: 'Carpooling electric (Sedan - Electric - 3 people)',
          value: 0.4911753351876771,
        },
        {
          id: 163,
          name: 'Carpooling electric (Sedan - Electric - 4 people)',
          value: 0.3683815013907578,
        },
        {
          id: 164,
          name: 'Carpooling electric (Sedan - Electric - 5 people)',
          value: 0.29470520111260623,
        },
        {
          id: 160,
          name: 'Electric car (Sedan - Electric)',
          value: 1.4735260055630313,
        },
        {
          id: 166,
          name: 'Carpooling hybrid (Sedan - Non rechargeable - 2 people)',
          value: 6.488359252781514,
        },
        {
          id: 167,
          name: 'Carpooling hybrid (Sedan - Non rechargeable - 3 people)',
          value: 4.325572835187676,
        },
        {
          id: 168,
          name: 'Carpooling hybrid (Sedan - Non rechargeable - 4 people)',
          value: 3.244179626390757,
        },
        {
          id: 169,
          name: 'Carpooling hybrid (Sedan - Non rechargeable - 5 people)',
          value: 2.5953437011126055,
        },
        {
          id: 165,
          name: 'Hybrid car (Sedan - Non rechargeable)',
          value: 12.976718505563028,
        },
        {
          id: 171,
          name: 'Carpooling hybrid (Sedan - Plug-in - 2 people)',
          value: 5.790429565281515,
        },
        {
          id: 172,
          name: 'Carpooling hybrid (Sedan - Plug-in - 3 people)',
          value: 3.8602863768543436,
        },
        {
          id: 173,
          name: 'Carpooling hybrid (Sedan - Plug-in - 4 people)',
          value: 2.8952147826407577,
        },
        {
          id: 174,
          name: 'Carpooling hybrid (Sedan - Plug-in - 5 people)',
          value: 2.316171826112606,
        },
        {
          id: 170,
          name: 'Hybrid car (Sedan - Plug-in)',
          value: 11.58085913056303,
        },
        {
          id: 176,
          name: 'Carpooling combustion (SUV - Gasoline - 2 people)',
          value: 10.330968627781514,
        },
        {
          id: 177,
          name: 'Carpooling combustion (SUV - Gasoline - 3 people)',
          value: 6.8873124185210095,
        },
        {
          id: 178,
          name: 'Carpooling combustion (SUV - Gasoline - 4 people)',
          value: 5.165484313890757,
        },
        {
          id: 179,
          name: 'Carpooling combustion (SUV - Gasoline - 5 people)',
          value: 4.1323874511126055,
        },
        {
          id: 175,
          name: 'Combustion car (SUV - Gasoline)',
          value: 20.66193725556303,
        },
        {
          id: 181,
          name: 'Carpooling combustion (SUV - Diesel - 2 people)',
          value: 6.504435815281514,
        },
        {
          id: 182,
          name: 'Carpooling combustion (SUV - Diesel - 3 people)',
          value: 4.3362905435210095,
        },
        {
          id: 183,
          name: 'Carpooling combustion (SUV - Diesel - 4 people)',
          value: 3.252217907640757,
        },
        {
          id: 184,
          name: 'Carpooling combustion (SUV - Diesel - 5 people)',
          value: 2.6017743261126056,
        },
        {
          id: 180,
          name: 'Combustion car (SUV - Diesel)',
          value: 13.008871630563029,
        },
        {
          id: 186,
          name: 'Carpooling electric (SUV - Electric - 2 people)',
          value: 0.7056230027815156,
        },
        {
          id: 187,
          name: 'Carpooling electric (SUV - Electric - 3 people)',
          value: 0.47041533518767703,
        },
        {
          id: 188,
          name: 'Carpooling electric (SUV - Electric - 4 people)',
          value: 0.3528115013907578,
        },
        {
          id: 189,
          name: 'Carpooling electric (SUV - Electric - 5 people)',
          value: 0.2822492011126062,
        },
        {
          id: 185,
          name: 'Electric car (SUV - Electric)',
          value: 1.4112460055630311,
        },
        {
          id: 191,
          name: 'Carpooling hybrid (SUV - Non rechargeable - 2 people)',
          value: 7.040959252781515,
        },
        {
          id: 192,
          name: 'Carpooling hybrid (SUV - Non rechargeable - 3 people)',
          value: 4.693972835187677,
        },
        {
          id: 193,
          name: 'Carpooling hybrid (SUV - Non rechargeable - 4 people)',
          value: 3.5204796263907574,
        },
        {
          id: 194,
          name: 'Carpooling hybrid (SUV - Non rechargeable - 5 people)',
          value: 2.816383701112606,
        },
        {
          id: 190,
          name: 'Hybrid car (SUV - Non rechargeable)',
          value: 14.08191850556303,
        },
        {
          id: 196,
          name: 'Carpooling hybrid (SUV - Plug-in - 2 people)',
          value: 6.8662067527815145,
        },
        {
          id: 197,
          name: 'Carpooling hybrid (SUV - Plug-in - 3 people)',
          value: 4.57747116852101,
        },
        {
          id: 198,
          name: 'Carpooling hybrid (SUV - Plug-in - 4 people)',
          value: 3.4331033763907572,
        },
        {
          id: 199,
          name: 'Carpooling hybrid (SUV - Plug-in - 5 people)',
          value: 2.7464827011126056,
        },
        {
          id: 195,
          name: 'Hybrid car (SUV - Plug-in)',
          value: 13.732413505563029,
        },
        {
          id: 201,
          name: 'Carpooling hybrid (2 people)',
          value: 4.658406752781516,
        },
        {
          id: 202,
          name: 'Carpooling hybrid (3 people)',
          value: 3.105604501854344,
        },
        {
          id: 203,
          name: 'Carpooling hybrid (4 people)',
          value: 2.329203376390758,
        },
        {
          id: 204,
          name: 'Carpooling hybrid (5 people)',
          value: 1.8633627011126062,
        },
        {
          id: 200,
          name: 'Hybrid car',
          value: 9.316813505563031,
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })

  test('get all values for 100 km', async () => {
    const result = await fetch('http://localhost:3000/api/v1/transport?km=100&displayAll=1')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          id: 1,
          name: 'Avion trajet court',
          value: 22.42,
        },
        {
          id: 2,
          name: 'TGV',
          value: 0.22999999999999998,
        },
        {
          id: 3,
          name: 'Intercités',
          value: 0.58,
        },
        {
          id: 22,
          name: 'Covoiturage thermique (2 personnes)',
          value: 5.5278880027815145,
        },
        {
          id: 23,
          name: 'Covoiturage thermique (3 personnes)',
          value: 3.68525866852101,
        },
        {
          id: 24,
          name: 'Covoiturage thermique (4 personnes)',
          value: 2.7639440013907572,
        },
        {
          id: 25,
          name: 'Covoiturage thermique (5 personnes)',
          value: 2.211155201112606,
        },
        {
          id: 4,
          name: 'Voiture thermique',
          value: 11.055776005563029,
        },
        {
          id: 26,
          name: 'Covoiturage électrique (2 personnes)',
          value: 0.6044180027815155,
        },
        {
          id: 27,
          name: 'Covoiturage électrique (3 personnes)',
          value: 0.402945335187677,
        },
        {
          id: 28,
          name: 'Covoiturage électrique (4 personnes)',
          value: 0.30220900139075774,
        },
        {
          id: 29,
          name: 'Covoiturage électrique (5 personnes)',
          value: 0.2417672011126062,
        },
        {
          id: 5,
          name: 'Voiture électrique',
          value: 1.208836005563031,
        },
        {
          id: 6,
          name: 'Autocar thermique',
          value: 3.314,
        },
        {
          id: 30,
          name: 'Marche',
          value: 0,
        },
        {
          id: 7,
          name: 'Vélo mécanique',
          value: 0,
        },
        {
          id: 8,
          name: 'Vélo à assistance électrique',
          value: 0.22300000000000003,
        },
        {
          id: 9,
          name: 'Bus thermique',
          value: 11.35,
        },
        {
          id: 10,
          name: 'Tramway',
          value: 0.38,
        },
        {
          id: 11,
          name: 'Métro',
          value: 0.42,
        },
        {
          id: 12,
          name: 'Scooter ou moto légère thermique',
          value: 6.04,
        },
        {
          id: 13,
          name: 'Moto thermique',
          value: 18.75,
        },
        {
          id: 14,
          name: 'RER ou Transilien',
          value: 0.66,
        },
        {
          id: 15,
          name: 'TER',
          value: 2.29,
        },
        {
          id: 16,
          name: 'Bus électrique',
          value: 0.95,
        },
        {
          id: 17,
          name: 'Trottinette à assistance électrique',
          value: 0.2,
        },
        {
          id: 21,
          name: 'Bus (GNV)',
          value: 11.28,
        },
        {
          id: 101,
          name: 'Covoiturage thermique (Petite - Essence - 2 personnes)',
          value: 5.849053002781515,
        },
        {
          id: 102,
          name: 'Covoiturage thermique (Petite - Essence - 3 personnes)',
          value: 3.89936866852101,
        },
        {
          id: 103,
          name: 'Covoiturage thermique (Petite - Essence - 4 personnes)',
          value: 2.9245265013907575,
        },
        {
          id: 104,
          name: 'Covoiturage thermique (Petite - Essence - 5 personnes)',
          value: 2.339621201112606,
        },
        {
          id: 100,
          name: 'Voiture thermique (Petite - Essence)',
          value: 11.69810600556303,
        },
        {
          id: 106,
          name: 'Covoiturage thermique (Petite - Diesel - 2 personnes)',
          value: 4.708485815281516,
        },
        {
          id: 107,
          name: 'Covoiturage thermique (Petite - Diesel - 3 personnes)',
          value: 3.1389905435210106,
        },
        {
          id: 108,
          name: 'Covoiturage thermique (Petite - Diesel - 4 personnes)',
          value: 2.354242907640758,
        },
        {
          id: 109,
          name: 'Covoiturage thermique (Petite - Diesel - 5 personnes)',
          value: 1.8833943261126063,
        },
        {
          id: 105,
          name: 'Voiture thermique (Petite - Diesel)',
          value: 9.416971630563031,
        },
        {
          id: 111,
          name: 'Covoiturage électrique (Petite - Électrique - 2 personnes)',
          value: 0.5752242527815156,
        },
        {
          id: 112,
          name: 'Covoiturage électrique (Petite - Électrique - 3 personnes)',
          value: 0.38348283518767706,
        },
        {
          id: 113,
          name: 'Covoiturage électrique (Petite - Électrique - 4 personnes)',
          value: 0.2876121263907578,
        },
        {
          id: 114,
          name: 'Covoiturage électrique (Petite - Électrique - 5 personnes)',
          value: 0.23008970111260624,
        },
        {
          id: 110,
          name: 'Voiture électrique (Petite - Électrique)',
          value: 1.1504485055630311,
        },
        {
          id: 116,
          name: 'Covoiturage hybride (Petite - Non rechargeable - 2 personnes)',
          value: 5.302571752781516,
        },
        {
          id: 117,
          name: 'Covoiturage hybride (Petite - Non rechargeable - 3 personnes)',
          value: 3.5350478351876773,
        },
        {
          id: 118,
          name: 'Covoiturage hybride (Petite - Non rechargeable - 4 personnes)',
          value: 2.651285876390758,
        },
        {
          id: 119,
          name: 'Covoiturage hybride (Petite - Non rechargeable - 5 personnes)',
          value: 2.121028701112606,
        },
        {
          id: 115,
          name: 'Voiture hybride (Petite - Non rechargeable)',
          value: 10.605143505563031,
        },
        {
          id: 121,
          name: 'Covoiturage hybride (Petite - Rechargeable - 2 personnes)',
          value: 4.605858002781515,
        },
        {
          id: 122,
          name: 'Covoiturage hybride (Petite - Rechargeable - 3 personnes)',
          value: 3.070572001854343,
        },
        {
          id: 123,
          name: 'Covoiturage hybride (Petite - Rechargeable - 4 personnes)',
          value: 2.3029290013907575,
        },
        {
          id: 124,
          name: 'Covoiturage hybride (Petite - Rechargeable - 5 personnes)',
          value: 1.842343201112606,
        },
        {
          id: 120,
          name: 'Voiture hybride (Petite - Rechargeable)',
          value: 9.21171600556303,
        },
        {
          id: 126,
          name: 'Covoiturage thermique (Moyenne - Essence - 2 personnes)',
          value: 6.900618627781515,
        },
        {
          id: 127,
          name: 'Covoiturage thermique (Moyenne - Essence - 3 personnes)',
          value: 4.60041241852101,
        },
        {
          id: 128,
          name: 'Covoiturage thermique (Moyenne - Essence - 4 personnes)',
          value: 3.4503093138907577,
        },
        {
          id: 129,
          name: 'Covoiturage thermique (Moyenne - Essence - 5 personnes)',
          value: 2.760247451112606,
        },
        {
          id: 125,
          name: 'Voiture thermique (Moyenne - Essence)',
          value: 13.80123725556303,
        },
        {
          id: 131,
          name: 'Covoiturage thermique (Moyenne - Diesel - 2 personnes)',
          value: 5.5278880027815145,
        },
        {
          id: 132,
          name: 'Covoiturage thermique (Moyenne - Diesel - 3 personnes)',
          value: 3.68525866852101,
        },
        {
          id: 133,
          name: 'Covoiturage thermique (Moyenne - Diesel - 4 personnes)',
          value: 2.7639440013907572,
        },
        {
          id: 134,
          name: 'Covoiturage thermique (Moyenne - Diesel - 5 personnes)',
          value: 2.211155201112606,
        },
        {
          id: 130,
          name: 'Voiture thermique (Moyenne - Diesel)',
          value: 11.055776005563029,
        },
        {
          id: 136,
          name: 'Covoiturage électrique (Moyenne - Électrique - 2 personnes)',
          value: 0.6044180027815155,
        },
        {
          id: 137,
          name: 'Covoiturage électrique (Moyenne - Électrique - 3 personnes)',
          value: 0.402945335187677,
        },
        {
          id: 138,
          name: 'Covoiturage électrique (Moyenne - Électrique - 4 personnes)',
          value: 0.30220900139075774,
        },
        {
          id: 139,
          name: 'Covoiturage électrique (Moyenne - Électrique - 5 personnes)',
          value: 0.2417672011126062,
        },
        {
          id: 135,
          name: 'Compacte électrique (Moyenne - Électrique)',
          value: 1.208836005563031,
        },
        {
          id: 141,
          name: 'Covoiturage hybride (Moyenne - Non rechargeable - 2 personnes)',
          value: 5.670971752781515,
        },
        {
          id: 142,
          name: 'Covoiturage hybride (Moyenne - Non rechargeable - 3 personnes)',
          value: 3.780647835187677,
        },
        {
          id: 143,
          name: 'Covoiturage hybride (Moyenne - Non rechargeable - 4 personnes)',
          value: 2.8354858763907576,
        },
        {
          id: 144,
          name: 'Covoiturage hybride (Moyenne - Non rechargeable - 5 personnes)',
          value: 2.268388701112606,
        },
        {
          id: 140,
          name: 'Voiture hybride (Moyenne - Non rechargeable)',
          value: 11.34194350556303,
        },
        {
          id: 146,
          name: 'Covoiturage hybride (Moyenne - Rechargeable - 2 personnes)',
          value: 4.658406752781516,
        },
        {
          id: 147,
          name: 'Covoiturage hybride (Moyenne - Rechargeable - 3 personnes)',
          value: 3.105604501854344,
        },
        {
          id: 148,
          name: 'Covoiturage hybride (Moyenne - Rechargeable - 4 personnes)',
          value: 2.329203376390758,
        },
        {
          id: 149,
          name: 'Covoiturage hybride (Moyenne - Rechargeable - 5 personnes)',
          value: 1.8633627011126062,
        },
        {
          id: 145,
          name: 'Voiture hybride (Moyenne - Rechargeable)',
          value: 9.316813505563031,
        },
        {
          id: 151,
          name: 'Covoiturage thermique (Berline - Essence - 2 personnes)',
          value: 7.482553002781516,
        },
        {
          id: 152,
          name: 'Covoiturage thermique (Berline - Essence - 3 personnes)',
          value: 4.9883686685210105,
        },
        {
          id: 153,
          name: 'Covoiturage thermique (Berline - Essence - 4 personnes)',
          value: 3.741276501390758,
        },
        {
          id: 154,
          name: 'Covoiturage thermique (Berline - Essence - 5 personnes)',
          value: 2.9930212011126063,
        },
        {
          id: 150,
          name: 'Voiture thermique (Berline - Essence)',
          value: 14.965106005563031,
        },
        {
          id: 156,
          name: 'Covoiturage thermique (Berline - Diesel - 2 personnes)',
          value: 7.189141752781516,
        },
        {
          id: 157,
          name: 'Covoiturage thermique (Berline - Diesel - 3 personnes)',
          value: 4.79276116852101,
        },
        {
          id: 158,
          name: 'Covoiturage thermique (Berline - Diesel - 4 personnes)',
          value: 3.594570876390758,
        },
        {
          id: 159,
          name: 'Covoiturage thermique (Berline - Diesel - 5 personnes)',
          value: 2.8756567011126064,
        },
        {
          id: 155,
          name: 'Voiture thermique (Berline - Diesel)',
          value: 14.378283505563031,
        },
        {
          id: 161,
          name: 'Covoiturage électrique (Berline - Électrique - 2 personnes)',
          value: 0.7367630027815156,
        },
        {
          id: 162,
          name: 'Covoiturage électrique (Berline - Électrique - 3 personnes)',
          value: 0.4911753351876771,
        },
        {
          id: 163,
          name: 'Covoiturage électrique (Berline - Électrique - 4 personnes)',
          value: 0.3683815013907578,
        },
        {
          id: 164,
          name: 'Covoiturage électrique (Berline - Électrique - 5 personnes)',
          value: 0.29470520111260623,
        },
        {
          id: 160,
          name: 'Voiture électrique (Berline - Électrique)',
          value: 1.4735260055630313,
        },
        {
          id: 166,
          name: 'Covoiturage hybride (Berline - Non rechargeable - 2 personnes)',
          value: 6.488359252781514,
        },
        {
          id: 167,
          name: 'Covoiturage hybride (Berline - Non rechargeable - 3 personnes)',
          value: 4.325572835187676,
        },
        {
          id: 168,
          name: 'Covoiturage hybride (Berline - Non rechargeable - 4 personnes)',
          value: 3.244179626390757,
        },
        {
          id: 169,
          name: 'Covoiturage hybride (Berline - Non rechargeable - 5 personnes)',
          value: 2.5953437011126055,
        },
        {
          id: 165,
          name: 'Voiture hybride (Berline - Non rechargeable)',
          value: 12.976718505563028,
        },
        {
          id: 171,
          name: 'Covoiturage hybride (Berline - Rechargeable - 2 personnes)',
          value: 5.790429565281515,
        },
        {
          id: 172,
          name: 'Covoiturage hybride (Berline - Rechargeable - 3 personnes)',
          value: 3.8602863768543436,
        },
        {
          id: 173,
          name: 'Covoiturage hybride (Berline - Rechargeable - 4 personnes)',
          value: 2.8952147826407577,
        },
        {
          id: 174,
          name: 'Covoiturage hybride (Berline - Rechargeable - 5 personnes)',
          value: 2.316171826112606,
        },
        {
          id: 170,
          name: 'Voiture hybride (Berline - Rechargeable)',
          value: 11.58085913056303,
        },
        {
          id: 176,
          name: 'Covoiturage thermique (SUV - Essence - 2 personnes)',
          value: 10.330968627781514,
        },
        {
          id: 177,
          name: 'Covoiturage thermique (SUV - Essence - 3 personnes)',
          value: 6.8873124185210095,
        },
        {
          id: 178,
          name: 'Covoiturage thermique (SUV - Essence - 4 personnes)',
          value: 5.165484313890757,
        },
        {
          id: 179,
          name: 'Covoiturage thermique (SUV - Essence - 5 personnes)',
          value: 4.1323874511126055,
        },
        {
          id: 175,
          name: 'Voiture thermique (SUV - Essence)',
          value: 20.66193725556303,
        },
        {
          id: 181,
          name: 'Covoiturage thermique (SUV - Diesel - 2 personnes)',
          value: 6.504435815281514,
        },
        {
          id: 182,
          name: 'Covoiturage thermique (SUV - Diesel - 3 personnes)',
          value: 4.3362905435210095,
        },
        {
          id: 183,
          name: 'Covoiturage thermique (SUV - Diesel - 4 personnes)',
          value: 3.252217907640757,
        },
        {
          id: 184,
          name: 'Covoiturage thermique (SUV - Diesel - 5 personnes)',
          value: 2.6017743261126056,
        },
        {
          id: 180,
          name: 'Voiture thermique (SUV - Diesel)',
          value: 13.008871630563029,
        },
        {
          id: 186,
          name: 'Covoiturage électrique (SUV - Électrique - 2 personnes)',
          value: 0.7056230027815156,
        },
        {
          id: 187,
          name: 'Covoiturage électrique (SUV - Électrique - 3 personnes)',
          value: 0.47041533518767703,
        },
        {
          id: 188,
          name: 'Covoiturage électrique (SUV - Électrique - 4 personnes)',
          value: 0.3528115013907578,
        },
        {
          id: 189,
          name: 'Covoiturage électrique (SUV - Électrique - 5 personnes)',
          value: 0.2822492011126062,
        },
        {
          id: 185,
          name: 'Voiture électrique (SUV - Électrique)',
          value: 1.4112460055630311,
        },
        {
          id: 191,
          name: 'Covoiturage hybride (SUV - Non rechargeable - 2 personnes)',
          value: 7.040959252781515,
        },
        {
          id: 192,
          name: 'Covoiturage hybride (SUV - Non rechargeable - 3 personnes)',
          value: 4.693972835187677,
        },
        {
          id: 193,
          name: 'Covoiturage hybride (SUV - Non rechargeable - 4 personnes)',
          value: 3.5204796263907574,
        },
        {
          id: 194,
          name: 'Covoiturage hybride (SUV - Non rechargeable - 5 personnes)',
          value: 2.816383701112606,
        },
        {
          id: 190,
          name: 'Voiture hybride (SUV - Non rechargeable)',
          value: 14.08191850556303,
        },
        {
          id: 196,
          name: 'Covoiturage hybride (SUV - Rechargeable - 2 personnes)',
          value: 6.8662067527815145,
        },
        {
          id: 197,
          name: 'Covoiturage hybride (SUV - Rechargeable - 3 personnes)',
          value: 4.57747116852101,
        },
        {
          id: 198,
          name: 'Covoiturage hybride (SUV - Rechargeable - 4 personnes)',
          value: 3.4331033763907572,
        },
        {
          id: 199,
          name: 'Covoiturage hybride (SUV - Rechargeable - 5 personnes)',
          value: 2.7464827011126056,
        },
        {
          id: 195,
          name: 'Voiture hybride (SUV - Rechargeable)',
          value: 13.732413505563029,
        },
        {
          id: 201,
          name: 'Covoiturage hybride (2 personnes)',
          value: 4.658406752781516,
        },
        {
          id: 202,
          name: 'Covoiturage hybride (3 personnes)',
          value: 3.105604501854344,
        },
        {
          id: 203,
          name: 'Covoiturage hybride (4 personnes)',
          value: 2.329203376390758,
        },
        {
          id: 204,
          name: 'Covoiturage hybride (5 personnes)',
          value: 1.8633627011126062,
        },
        {
          id: 200,
          name: 'Voiture hybride',
          value: 9.316813505563031,
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })

  test('get some values for 100 km', async () => {
    const result = await fetch('http://localhost:3000/api/v1/transport?km=100&transports=1,3,5')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          id: 1,
          name: 'Avion trajet court',
          value: 22.42,
        },
        {
          id: 3,
          name: 'Intercités',
          value: 0.58,
        },
        {
          id: 5,
          name: 'Voiture électrique',
          value: 1.208836005563031,
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })

  test('get plane values without radiative forcing', async () => {
    const result = await fetch('http://localhost:3000/api/v1/transport?km=100&transports=1&ignoreRadiativeForcing=1')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          id: 1,
          name: 'Avion trajet court',
          value: 12.32,
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })

  test('get all values with carpool and numberOfPassenger', async () => {
    const result = await fetch('http://localhost:3000/api/v1/transport?km=100&numberOfPassenger=3')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          id: 3,
          name: 'Intercités',
          value: 0.58,
        },
        {
          id: 4,
          name: 'Voiture thermique',
          value: 2.7639440013907572,
        },
        {
          id: 5,
          name: 'Voiture électrique',
          value: 0.30220900139075774,
        },
        {
          id: 6,
          name: 'Autocar thermique',
          value: 3.314,
        },
        {
          id: 13,
          name: 'Moto thermique',
          value: 18.75,
        },
        {
          id: 14,
          name: 'RER ou Transilien',
          value: 0.66,
        },
        {
          id: 15,
          name: 'TER',
          value: 2.29,
        },
        {
          id: 100,
          name: 'Voiture thermique (Petite - Essence)',
          value: 2.9245265013907575,
        },
        {
          id: 105,
          name: 'Voiture thermique (Petite - Diesel)',
          value: 2.354242907640758,
        },
        {
          id: 110,
          name: 'Voiture électrique (Petite - Électrique)',
          value: 0.2876121263907578,
        },
        {
          id: 115,
          name: 'Voiture hybride (Petite - Non rechargeable)',
          value: 2.651285876390758,
        },
        {
          id: 120,
          name: 'Voiture hybride (Petite - Rechargeable)',
          value: 2.3029290013907575,
        },
        {
          id: 125,
          name: 'Voiture thermique (Moyenne - Essence)',
          value: 3.4503093138907577,
        },
        {
          id: 130,
          name: 'Voiture thermique (Moyenne - Diesel)',
          value: 2.7639440013907572,
        },
        {
          id: 135,
          name: 'Compacte électrique (Moyenne - Électrique)',
          value: 0.30220900139075774,
        },
        {
          id: 140,
          name: 'Voiture hybride (Moyenne - Non rechargeable)',
          value: 2.8354858763907576,
        },
        {
          id: 145,
          name: 'Voiture hybride (Moyenne - Rechargeable)',
          value: 2.329203376390758,
        },
        {
          id: 150,
          name: 'Voiture thermique (Berline - Essence)',
          value: 3.741276501390758,
        },
        {
          id: 155,
          name: 'Voiture thermique (Berline - Diesel)',
          value: 3.594570876390758,
        },
        {
          id: 160,
          name: 'Voiture électrique (Berline - Électrique)',
          value: 0.3683815013907578,
        },
        {
          id: 165,
          name: 'Voiture hybride (Berline - Non rechargeable)',
          value: 3.244179626390757,
        },
        {
          id: 170,
          name: 'Voiture hybride (Berline - Rechargeable)',
          value: 2.8952147826407577,
        },
        {
          id: 175,
          name: 'Voiture thermique (SUV - Essence)',
          value: 5.165484313890757,
        },
        {
          id: 180,
          name: 'Voiture thermique (SUV - Diesel)',
          value: 3.252217907640757,
        },
        {
          id: 185,
          name: 'Voiture électrique (SUV - Électrique)',
          value: 0.3528115013907578,
        },
        {
          id: 190,
          name: 'Voiture hybride (SUV - Non rechargeable)',
          value: 3.5204796263907574,
        },
        {
          id: 195,
          name: 'Voiture hybride (SUV - Rechargeable)',
          value: 3.4331033763907572,
        },
        {
          id: 200,
          name: 'Voiture hybride',
          value: 2.329203376390758,
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })

  test('get all values with carpool and occupencyRate', async () => {
    const result = await fetch('http://localhost:3000/api/v1/transport?km=100&numberOfPassenger=2&occupencyRate=4')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          id: 3,
          name: 'Intercités',
          value: 0.58,
        },
        {
          id: 4,
          name: 'Voiture thermique',
          value: 2.7639440013907572,
        },
        {
          id: 5,
          name: 'Voiture électrique',
          value: 0.30220900139075774,
        },
        {
          id: 6,
          name: 'Autocar thermique',
          value: 3.314,
        },
        {
          id: 13,
          name: 'Moto thermique',
          value: 18.75,
        },
        {
          id: 14,
          name: 'RER ou Transilien',
          value: 0.66,
        },
        {
          id: 15,
          name: 'TER',
          value: 2.29,
        },
        {
          id: 100,
          name: 'Voiture thermique (Petite - Essence)',
          value: 2.9245265013907575,
        },
        {
          id: 105,
          name: 'Voiture thermique (Petite - Diesel)',
          value: 2.354242907640758,
        },
        {
          id: 110,
          name: 'Voiture électrique (Petite - Électrique)',
          value: 0.2876121263907578,
        },
        {
          id: 115,
          name: 'Voiture hybride (Petite - Non rechargeable)',
          value: 2.651285876390758,
        },
        {
          id: 120,
          name: 'Voiture hybride (Petite - Rechargeable)',
          value: 2.3029290013907575,
        },
        {
          id: 125,
          name: 'Voiture thermique (Moyenne - Essence)',
          value: 3.4503093138907577,
        },
        {
          id: 130,
          name: 'Voiture thermique (Moyenne - Diesel)',
          value: 2.7639440013907572,
        },
        {
          id: 135,
          name: 'Compacte électrique (Moyenne - Électrique)',
          value: 0.30220900139075774,
        },
        {
          id: 140,
          name: 'Voiture hybride (Moyenne - Non rechargeable)',
          value: 2.8354858763907576,
        },
        {
          id: 145,
          name: 'Voiture hybride (Moyenne - Rechargeable)',
          value: 2.329203376390758,
        },
        {
          id: 150,
          name: 'Voiture thermique (Berline - Essence)',
          value: 3.741276501390758,
        },
        {
          id: 155,
          name: 'Voiture thermique (Berline - Diesel)',
          value: 3.594570876390758,
        },
        {
          id: 160,
          name: 'Voiture électrique (Berline - Électrique)',
          value: 0.3683815013907578,
        },
        {
          id: 165,
          name: 'Voiture hybride (Berline - Non rechargeable)',
          value: 3.244179626390757,
        },
        {
          id: 170,
          name: 'Voiture hybride (Berline - Rechargeable)',
          value: 2.8952147826407577,
        },
        {
          id: 175,
          name: 'Voiture thermique (SUV - Essence)',
          value: 5.165484313890757,
        },
        {
          id: 180,
          name: 'Voiture thermique (SUV - Diesel)',
          value: 3.252217907640757,
        },
        {
          id: 185,
          name: 'Voiture électrique (SUV - Électrique)',
          value: 0.3528115013907578,
        },
        {
          id: 190,
          name: 'Voiture hybride (SUV - Non rechargeable)',
          value: 3.5204796263907574,
        },
        {
          id: 195,
          name: 'Voiture hybride (SUV - Rechargeable)',
          value: 3.4331033763907572,
        },
        {
          id: 200,
          name: 'Voiture hybride',
          value: 2.329203376390758,
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })

  test('get all values with construction', async () => {
    const result = await fetch('http://localhost:3000/api/v1/transport?km=100&includeConstruction=1')

    expect(result.status).toBe(200)
    const data = await result.json()
    expect(data).toEqual({
      data: [
        {
          id: 3,
          name: 'Intercités',
          value: 0.898,
        },
        {
          id: 22,
          name: 'Covoiturage thermique (2 personnes)',
          value: 7.112670611477167,
        },
        {
          id: 23,
          name: 'Covoiturage thermique (3 personnes)',
          value: 4.7417804076514445,
        },
        {
          id: 24,
          name: 'Covoiturage thermique (4 personnes)',
          value: 3.5563353057385836,
        },
        {
          id: 25,
          name: 'Covoiturage thermique (5 personnes)',
          value: 2.845068244590867,
        },
        {
          id: 4,
          name: 'Voiture thermique',
          value: 14.225341222954334,
        },
        {
          id: 26,
          name: 'Covoiturage électrique (2 personnes)',
          value: 3.368263111477168,
        },
        {
          id: 27,
          name: 'Covoiturage électrique (3 personnes)',
          value: 2.245508740984779,
        },
        {
          id: 28,
          name: 'Covoiturage électrique (4 personnes)',
          value: 1.684131555738584,
        },
        {
          id: 29,
          name: 'Covoiturage électrique (5 personnes)',
          value: 1.3473052445908673,
        },
        {
          id: 5,
          name: 'Voiture électrique',
          value: 6.736526222954336,
        },
        {
          id: 6,
          name: 'Autocar thermique',
          value: 3.7560000000000002,
        },
        {
          id: 13,
          name: 'Moto thermique',
          value: 21.67,
        },
        {
          id: 14,
          name: 'RER ou Transilien',
          value: 0.9780000000000001,
        },
        {
          id: 15,
          name: 'TER',
          value: 2.769,
        },
        {
          id: 101,
          name: 'Covoiturage thermique (Petite - Essence - 2 personnes)',
          value: 7.235737785390212,
        },
        {
          id: 102,
          name: 'Covoiturage thermique (Petite - Essence - 3 personnes)',
          value: 4.823825190260141,
        },
        {
          id: 103,
          name: 'Covoiturage thermique (Petite - Essence - 4 personnes)',
          value: 3.617868892695106,
        },
        {
          id: 104,
          name: 'Covoiturage thermique (Petite - Essence - 5 personnes)',
          value: 2.8942951141560846,
        },
        {
          id: 100,
          name: 'Voiture thermique (Petite - Essence)',
          value: 14.471475570780424,
        },
        {
          id: 106,
          name: 'Covoiturage thermique (Petite - Diesel - 2 personnes)',
          value: 6.095170597890212,
        },
        {
          id: 107,
          name: 'Covoiturage thermique (Petite - Diesel - 3 personnes)',
          value: 4.063447065260141,
        },
        {
          id: 108,
          name: 'Covoiturage thermique (Petite - Diesel - 4 personnes)',
          value: 3.047585298945106,
        },
        {
          id: 109,
          name: 'Covoiturage thermique (Petite - Diesel - 5 personnes)',
          value: 2.438068239156085,
        },
        {
          id: 105,
          name: 'Voiture thermique (Petite - Diesel)',
          value: 12.190341195780425,
        },
        {
          id: 111,
          name: 'Covoiturage électrique (Petite - Électrique - 2 personnes)',
          value: 2.8796807745206467,
        },
        {
          id: 112,
          name: 'Covoiturage électrique (Petite - Électrique - 3 personnes)',
          value: 1.9197871830137645,
        },
        {
          id: 113,
          name: 'Covoiturage électrique (Petite - Électrique - 4 personnes)',
          value: 1.4398403872603234,
        },
        {
          id: 114,
          name: 'Covoiturage électrique (Petite - Électrique - 5 personnes)',
          value: 1.1518723098082586,
        },
        {
          id: 110,
          name: 'Voiture électrique (Petite - Électrique)',
          value: 5.7593615490412935,
        },
        {
          id: 116,
          name: 'Covoiturage hybride (Petite - Non rechargeable - 2 personnes)',
          value: 6.762469850607602,
        },
        {
          id: 117,
          name: 'Covoiturage hybride (Petite - Non rechargeable - 3 personnes)',
          value: 4.508313233738401,
        },
        {
          id: 118,
          name: 'Covoiturage hybride (Petite - Non rechargeable - 4 personnes)',
          value: 3.381234925303801,
        },
        {
          id: 119,
          name: 'Covoiturage hybride (Petite - Non rechargeable - 5 personnes)',
          value: 2.704987940243041,
        },
        {
          id: 115,
          name: 'Voiture hybride (Petite - Non rechargeable)',
          value: 13.524939701215205,
        },
        {
          id: 121,
          name: 'Covoiturage hybride (Petite - Rechargeable - 2 personnes)',
          value: 6.444371589738037,
        },
        {
          id: 122,
          name: 'Covoiturage hybride (Petite - Rechargeable - 3 personnes)',
          value: 4.296247726492025,
        },
        {
          id: 123,
          name: 'Covoiturage hybride (Petite - Rechargeable - 4 personnes)',
          value: 3.2221857948690187,
        },
        {
          id: 124,
          name: 'Covoiturage hybride (Petite - Rechargeable - 5 personnes)',
          value: 2.577748635895215,
        },
        {
          id: 120,
          name: 'Voiture hybride (Petite - Rechargeable)',
          value: 12.888743179476075,
        },
        {
          id: 126,
          name: 'Covoiturage thermique (Moyenne - Essence - 2 personnes)',
          value: 8.48540123647717,
        },
        {
          id: 127,
          name: 'Covoiturage thermique (Moyenne - Essence - 3 personnes)',
          value: 5.656934157651446,
        },
        {
          id: 128,
          name: 'Covoiturage thermique (Moyenne - Essence - 4 personnes)',
          value: 4.242700618238585,
        },
        {
          id: 129,
          name: 'Covoiturage thermique (Moyenne - Essence - 5 personnes)',
          value: 3.394160494590868,
        },
        {
          id: 125,
          name: 'Voiture thermique (Moyenne - Essence)',
          value: 16.97080247295434,
        },
        {
          id: 131,
          name: 'Covoiturage thermique (Moyenne - Diesel - 2 personnes)',
          value: 7.112670611477167,
        },
        {
          id: 132,
          name: 'Covoiturage thermique (Moyenne - Diesel - 3 personnes)',
          value: 4.7417804076514445,
        },
        {
          id: 133,
          name: 'Covoiturage thermique (Moyenne - Diesel - 4 personnes)',
          value: 3.5563353057385836,
        },
        {
          id: 134,
          name: 'Covoiturage thermique (Moyenne - Diesel - 5 personnes)',
          value: 2.845068244590867,
        },
        {
          id: 130,
          name: 'Voiture thermique (Moyenne - Diesel)',
          value: 14.225341222954334,
        },
        {
          id: 136,
          name: 'Covoiturage électrique (Moyenne - Électrique - 2 personnes)',
          value: 3.368263111477168,
        },
        {
          id: 137,
          name: 'Covoiturage électrique (Moyenne - Électrique - 3 personnes)',
          value: 2.245508740984779,
        },
        {
          id: 138,
          name: 'Covoiturage électrique (Moyenne - Électrique - 4 personnes)',
          value: 1.684131555738584,
        },
        {
          id: 139,
          name: 'Covoiturage électrique (Moyenne - Électrique - 5 personnes)',
          value: 1.3473052445908673,
        },
        {
          id: 135,
          name: 'Compacte électrique (Moyenne - Électrique)',
          value: 6.736526222954336,
        },
        {
          id: 141,
          name: 'Covoiturage hybride (Moyenne - Non rechargeable - 2 personnes)',
          value: 7.328967676694559,
        },
        {
          id: 142,
          name: 'Covoiturage hybride (Moyenne - Non rechargeable - 3 personnes)',
          value: 4.885978451129706,
        },
        {
          id: 143,
          name: 'Covoiturage hybride (Moyenne - Non rechargeable - 4 personnes)',
          value: 3.6644838383472793,
        },
        {
          id: 144,
          name: 'Covoiturage hybride (Moyenne - Non rechargeable - 5 personnes)',
          value: 2.9315870706778235,
        },
        {
          id: 140,
          name: 'Voiture hybride (Moyenne - Non rechargeable)',
          value: 14.657935353389117,
        },
        {
          id: 146,
          name: 'Covoiturage hybride (Moyenne - Rechargeable - 2 personnes)',
          value: 6.695018165824992,
        },
        {
          id: 147,
          name: 'Covoiturage hybride (Moyenne - Rechargeable - 3 personnes)',
          value: 4.463345443883328,
        },
        {
          id: 148,
          name: 'Covoiturage hybride (Moyenne - Rechargeable - 4 personnes)',
          value: 3.347509082912496,
        },
        {
          id: 149,
          name: 'Covoiturage hybride (Moyenne - Rechargeable - 5 personnes)',
          value: 2.6780072663299967,
        },
        {
          id: 145,
          name: 'Voiture hybride (Moyenne - Rechargeable)',
          value: 13.390036331649984,
        },
        {
          id: 151,
          name: 'Covoiturage thermique (Berline - Essence - 2 personnes)',
          value: 9.463531263651081,
        },
        {
          id: 152,
          name: 'Covoiturage thermique (Berline - Essence - 3 personnes)',
          value: 6.309020842434054,
        },
        {
          id: 153,
          name: 'Covoiturage thermique (Berline - Essence - 4 personnes)',
          value: 4.7317656318255406,
        },
        {
          id: 154,
          name: 'Covoiturage thermique (Berline - Essence - 5 personnes)',
          value: 3.7854125054604326,
        },
        {
          id: 150,
          name: 'Voiture thermique (Berline - Essence)',
          value: 18.927062527302162,
        },
        {
          id: 156,
          name: 'Covoiturage thermique (Berline - Diesel - 2 personnes)',
          value: 9.170120013651081,
        },
        {
          id: 157,
          name: 'Covoiturage thermique (Berline - Diesel - 3 personnes)',
          value: 6.113413342434054,
        },
        {
          id: 158,
          name: 'Covoiturage thermique (Berline - Diesel - 4 personnes)',
          value: 4.5850600068255405,
        },
        {
          id: 159,
          name: 'Covoiturage thermique (Berline - Diesel - 5 personnes)',
          value: 3.6680480054604323,
        },
        {
          id: 155,
          name: 'Voiture thermique (Berline - Diesel)',
          value: 18.340240027302162,
        },
        {
          id: 161,
          name: 'Covoiturage électrique (Berline - Électrique - 2 personnes)',
          value: 4.53571680712934,
        },
        {
          id: 162,
          name: 'Covoiturage électrique (Berline - Électrique - 3 personnes)',
          value: 3.0238112047528936,
        },
        {
          id: 163,
          name: 'Covoiturage électrique (Berline - Électrique - 4 personnes)',
          value: 2.26785840356467,
        },
        {
          id: 164,
          name: 'Covoiturage électrique (Berline - Électrique - 5 personnes)',
          value: 1.814286722851736,
        },
        {
          id: 160,
          name: 'Voiture électrique (Berline - Électrique)',
          value: 9.07143361425868,
        },
        {
          id: 166,
          name: 'Covoiturage hybride (Berline - Non rechargeable - 2 personnes)',
          value: 8.54255082886847,
        },
        {
          id: 167,
          name: 'Covoiturage hybride (Berline - Non rechargeable - 3 personnes)',
          value: 5.695033885912313,
        },
        {
          id: 168,
          name: 'Covoiturage hybride (Berline - Non rechargeable - 4 personnes)',
          value: 4.271275414434235,
        },
        {
          id: 169,
          name: 'Covoiturage hybride (Berline - Non rechargeable - 5 personnes)',
          value: 3.4170203315473877,
        },
        {
          id: 165,
          name: 'Voiture hybride (Berline - Non rechargeable)',
          value: 17.08510165773694,
        },
        {
          id: 171,
          name: 'Covoiturage hybride (Berline - Rechargeable - 2 personnes)',
          value: 8.223236630498906,
        },
        {
          id: 172,
          name: 'Covoiturage hybride (Berline - Rechargeable - 3 personnes)',
          value: 5.482157753665938,
        },
        {
          id: 173,
          name: 'Covoiturage hybride (Berline - Rechargeable - 4 personnes)',
          value: 4.111618315249453,
        },
        {
          id: 174,
          name: 'Covoiturage hybride (Berline - Rechargeable - 5 personnes)',
          value: 3.2892946521995627,
        },
        {
          id: 170,
          name: 'Voiture hybride (Berline - Rechargeable)',
          value: 16.446473260997813,
        },
        {
          id: 176,
          name: 'Covoiturage thermique (SUV - Essence - 2 personnes)',
          value: 12.311946888651079,
        },
        {
          id: 177,
          name: 'Covoiturage thermique (SUV - Essence - 3 personnes)',
          value: 8.207964592434053,
        },
        {
          id: 178,
          name: 'Covoiturage thermique (SUV - Essence - 4 personnes)',
          value: 6.155973444325539,
        },
        {
          id: 179,
          name: 'Covoiturage thermique (SUV - Essence - 5 personnes)',
          value: 4.924778755460432,
        },
        {
          id: 175,
          name: 'Voiture thermique (SUV - Essence)',
          value: 24.623893777302158,
        },
        {
          id: 181,
          name: 'Covoiturage thermique (SUV - Diesel - 2 personnes)',
          value: 8.485414076151079,
        },
        {
          id: 182,
          name: 'Covoiturage thermique (SUV - Diesel - 3 personnes)',
          value: 5.6569427174340525,
        },
        {
          id: 183,
          name: 'Covoiturage thermique (SUV - Diesel - 4 personnes)',
          value: 4.242707038075539,
        },
        {
          id: 184,
          name: 'Covoiturage thermique (SUV - Diesel - 5 personnes)',
          value: 3.3941656304604315,
        },
        {
          id: 180,
          name: 'Voiture thermique (SUV - Diesel)',
          value: 16.970828152302158,
        },
        {
          id: 186,
          name: 'Covoiturage électrique (SUV - Électrique - 2 personnes)',
          value: 4.717851263651082,
        },
        {
          id: 187,
          name: 'Covoiturage électrique (SUV - Électrique - 3 personnes)',
          value: 3.145234175767388,
        },
        {
          id: 188,
          name: 'Covoiturage électrique (SUV - Électrique - 4 personnes)',
          value: 2.358925631825541,
        },
        {
          id: 189,
          name: 'Covoiturage électrique (SUV - Électrique - 5 personnes)',
          value: 1.8871405054604327,
        },
        {
          id: 185,
          name: 'Voiture électrique (SUV - Électrique)',
          value: 9.435702527302164,
        },
        {
          id: 191,
          name: 'Covoiturage hybride (SUV - Non rechargeable - 2 personnes)',
          value: 9.09515082886847,
        },
        {
          id: 192,
          name: 'Covoiturage hybride (SUV - Non rechargeable - 3 personnes)',
          value: 6.063433885912313,
        },
        {
          id: 193,
          name: 'Covoiturage hybride (SUV - Non rechargeable - 4 personnes)',
          value: 4.547575414434235,
        },
        {
          id: 194,
          name: 'Covoiturage hybride (SUV - Non rechargeable - 5 personnes)',
          value: 3.6380603315473876,
        },
        {
          id: 190,
          name: 'Voiture hybride (SUV - Non rechargeable)',
          value: 18.19030165773694,
        },
        {
          id: 196,
          name: 'Covoiturage hybride (SUV - Rechargeable - 2 personnes)',
          value: 9.299013817998905,
        },
        {
          id: 197,
          name: 'Covoiturage hybride (SUV - Rechargeable - 3 personnes)',
          value: 6.199342545332603,
        },
        {
          id: 198,
          name: 'Covoiturage hybride (SUV - Rechargeable - 4 personnes)',
          value: 4.649506908999452,
        },
        {
          id: 199,
          name: 'Covoiturage hybride (SUV - Rechargeable - 5 personnes)',
          value: 3.719605527199562,
        },
        {
          id: 195,
          name: 'Voiture hybride (SUV - Rechargeable)',
          value: 18.59802763599781,
        },
        {
          id: 201,
          name: 'Covoiturage hybride (2 personnes)',
          value: 6.695018165824992,
        },
        {
          id: 202,
          name: 'Covoiturage hybride (3 personnes)',
          value: 4.463345443883328,
        },
        {
          id: 203,
          name: 'Covoiturage hybride (4 personnes)',
          value: 3.347509082912496,
        },
        {
          id: 204,
          name: 'Covoiturage hybride (5 personnes)',
          value: 2.6780072663299967,
        },
        {
          id: 200,
          name: 'Voiture hybride',
          value: 13.390036331649984,
        },
      ],
      warning:
        "La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à impactco2@ademe.fr pour obtenir une clé d'API gratuite.",
    })
  })
})
