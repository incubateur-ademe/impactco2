import { getValue, regex } from 'components/externalModules/detection/Detector'

const detections = [
  { text: "100g d'équivalent CO2", value: 100 },
  { text: '13 t CO2', value: 13000000 },
  { text: '9 tonne CO2 équivalent', value: 9000000 },
  { text: '5tonne CO2 equivalent', value: 5000000 },
  { text: '322 g CO2 eq', value: 322 },
  { text: '456 gCO2', value: 456 },
  { text: '10 kg CO2eq', value: 10000 },
  { text: '7.3 kgs CO2e', value: 7300 },
  { text: '8,6 kilogramme CO₂', value: 8600 },
  { text: '16 tonnes eqCO2', value: 16000000 },
  { text: '5,35 kgCO2e', value: 5350 },
  { text: '1.2 millions de tonnes de CO2e', value: 1200000000000 },
  { text: '1 milliard de g de CO2e', value: 1000000000 },
  { text: '7 milliers de kg CO<sub>2</sub>', value: 7000000 },
  { text: '7 mille de kg CO<sub>2</sub>', value: 7000000 },
  { text: '21 gigatonnes de CO2 eq', value: 21000000000000000 },
  { text: '15&nbsp;kg CO2e', value: 15000 },
  { text: '4t C02', value: 4000000 },
  { text: '1 tonne eq C02', value: 1000000 },
  {
    text: `500g eq 
  co2`,
    value: 500,
  },
  { text: '350 kg éqCO2 par unité', value: 350000 },
  { text: '100 000 tonnes de CO2', value: 100000000000 },
]

describe('detector regex', () => {
  detections.forEach((detection) =>
    test(detection.text, () => {
      const result = regex.exec(detection.text)
      const value = result ? getValue(result) : -1
      expect(value).toEqual(detection.value)
    })
  )
})
