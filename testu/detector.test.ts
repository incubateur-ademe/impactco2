import { getValue, regexs } from 'components/externalModules/detection/Detector'

const frenchDetections = [
  { text: "100g d'équivalent CO2", value: 100 },
  { text: '13 t CO2', value: 13_000_000 },
  { text: '9 tonne CO2 équivalent', value: 9_000_000 },
  { text: '5tonne CO2 equivalent', value: 5_000_000 },
  { text: '322 g CO2 eq', value: 322 },
  { text: '456 gCO2', value: 456 },
  { text: '10 kg co₂eq', value: 10_000 },
  { text: '7.3 kgs CO2e', value: 7_300 },
  { text: '8,6 kilogramme CO₂', value: 8_600 },
  { text: '16 tonnes eqCO2', value: 16_000_000 },
  { text: '5,35 kgCO2e', value: 5_350 },
  { text: '1.2 millions de tonnes de CO2e', value: 1_200_000_000_000 },
  { text: '1 milliard de g de CO2e', value: 1_000_000_000 },
  { text: '7 milliers de kg CO₂', value: 7_000_000 },
  { text: '7 mille de kg CO₂', value: 7_000_000 },
  { text: '21 gigatonnes de CO2 eq', value: 21_000_000_000_000_000 },
  { text: '15&nbsp;kg co₂e', value: 15_000 },
  { text: '4t C02', value: 4_000_000 },
  { text: '1 tonne eq C02', value: 1_000_000 },
  {
    text: `500g eq 
  co2`,
    value: 500,
  },
  { text: '350 kg éqCO2 par unité', value: 350_000 },
  { text: '100 000 tonnes de CO2', value: 100_000_000_000 },
  {
    text: '2024, 270g co2',
    value: 270,
  },
  { text: '376 millions de tonnes équivalent CO2', value: 376_000_000_000_000 },
  { text: '54 gigatonnes (Gt) de CO2', value: 54_000_000_000_000_000 },
  { text: '5 gigatonnes de CO2', value: 5_000_000_000_000_000 },
  { text: '1 460 milliards de tonnes de CO2', value: 1_460_000_000_000_000_000 },
  { text: '11,47 milliards de tonnes de CO2', value: 11_470_000_000_000_000 },
  { text: '442 millions de tonnes équivalent CO2', value: 442_000_000_000_000 },
  { text: '65 Mt eqCO2', value: 65_000_000_000_000 },
  { text: '3.2 Gt CO2', value: 3_200_000_000_000_000 },
  { text: '150 Mt de CO2', value: 150_000_000_000_000 },
]

const englishDetections = [
  { text: '100g of CO2 equivalent', value: 100 },
  { text: '13 t CO2', value: 13_000_000 },
  { text: '9 tonnes CO2 equivalent', value: 9_000_000 },
  { text: '5tonne CO2 equivalent', value: 5_000_000 },
  { text: '322 g CO2 eq', value: 322 },
  { text: '456 gCO2', value: 456 },
  { text: '10 kg co₂eq', value: 10_000 },
  { text: '7.3 kgs CO2e', value: 7_300 },
  { text: '8,6 kilogram CO₂', value: 8_600 },
  { text: '16 tons eqCO2', value: 16_000_000 },
  { text: '5,35 kgCO2e', value: 5_350 },
  { text: '1.2 millions tonnes of CO2e', value: 1_200_000_000_000 },
  { text: '1 billion g of CO2e', value: 1_000_000_000 },
  { text: '7 thousands kg CO₂', value: 7_000_000 },
  { text: '7 thousand kg CO₂', value: 7_000_000 },
  { text: '21 gigatonnes of CO2 eq', value: 21_000_000_000_000_000 },
  { text: '15&nbsp;kg co₂e', value: 15_000 },
  { text: '4t C02', value: 4_000_000 },
  { text: '1 tonne eq C02', value: 1_000_000 },
  {
    text: `500g eq 
  co2`,
    value: 500,
  },
  {
    text: '2024, 270g co2',
    value: 270,
  },
  { text: '376 millions tonnes equivalent CO2', value: 376_000_000_000_000 },
  { text: '54 gigatonnes (Gt) of CO2', value: 54_000_000_000_000_000 },
  { text: '5 gigatons of CO2', value: 5_000_000_000_000_000 },
  { text: '1 460 billion tonnes of CO2', value: 1_460_000_000_000_000_000 },
  { text: '11.47 billion tonnes of CO2', value: 11_470_000_000_000_000 },
  { text: '442 millions tons equivalent CO2', value: 442_000_000_000_000 },
  { text: '65 Mt eqCO2', value: 65_000_000_000_000 },
  { text: '3.2 Gt CO2', value: 3_200_000_000_000_000 },
]

describe('french detector regex', () => {
  frenchDetections.forEach((detection) =>
    test(detection.text, () => {
      const result = regexs.fr.exec(detection.text)
      const value = result ? getValue(result, 'fr') : -1
      expect(value).toEqual(detection.value)
    })
  )
})
describe('english detector regex', () => {
  englishDetections.forEach((detection) =>
    test(detection.text, () => {
      const result = regexs.en.exec(detection.text)
      const value = result ? getValue(result, 'en') : -1
      expect(value).toEqual(detection.value)
    })
  )
})
