import React, { ReactNode } from 'react'
import LiseuseBookComparator from 'components/numerique/equivalent/LiseuseBookComparator'
import Smartphone from './Smartphone'
import Visualization from './Visualization'

const visualizations: Record<string, ReactNode[]> = {
  smartphone: [
    <Visualization types={['smartphone', 'repasavecduboeuf', 'tshirtencoton']} key='SmartphoneGeneral' />,
    <Visualization types={['television', 'ordinateurportable', 'smartphone']} key='SmartphoneCategory' />,
    <Smartphone key='Smartphone' />,
  ],
  ordinateurportable: [
    <Visualization types={['television', 'ordinateurportable', 'smartphone']} key='SmartphoneCategory' />,
  ],
  television: [<Visualization types={['television', 'ordinateurportable', 'smartphone']} key='SmartphoneCategory' />],
  montreconnectee: [
    <Visualization types={['montreconnectee', 'repasavecduboeuf', 'tshirtencoton']} key='Montre' />,
    <Visualization types={['ordinateurportable', 'smartphone', 'montreconnectee']} key='MontreCategory' />,
  ],
  imprimantejetdencre: [
    <Visualization types={['ordinateurportable', 'imprimantejetdencre', 'smartphone']} key='ImprimanteCategory' />,
  ],
  consoledesalon: [
    <Visualization
      types={['ordinateurfixeperformance', 'consoledesalon', 'consoleportable']}
      key='ConsoleSalonCategory'
    />,
  ],
  ordinateurfixe: [
    <Visualization
      types={['ordinateurfixe', 'ordinateurportable', 'tabletteclassique']}
      key='OrdinateurFixeCategory'
    />,
  ],
  repasvegetalien: [
    <Visualization types={['repasavecduboeuf', 'repasavecdupoulet', 'repasvegetalien']} key='Vegetalien' />,
  ],
  repasvegetarien: [<Visualization types={['repasavecduboeuf', 'repasavecdupoulet', 'repasvegetarien']} key='Boeuf' />],
  repasavecduboeuf: [
    <Visualization types={['repasavecduboeuf', 'repasavecdupoulet', 'repasvegetarien']} key='Boeuf' />,
    <Visualization types={['smartphone', 'repasavecduboeuf', 'tshirtencoton']} key='SmartphoneGeneral' />,
  ],
  repasavecdupoulet: [
    <Visualization types={['repasavecduboeuf', 'repasavecdupoulet', 'repasvegetarien']} key='Boeuf' />,
  ],
  repasavecdupoissongras: [
    <Visualization types={['repasavecduboeuf', 'repasavecdupoissongras', 'repasvegetarien']} key='PoissonGras' />,
  ],
  repasavecdupoissonblanc: [
    <Visualization types={['repasavecduboeuf', 'repasavecdupoissonblanc', 'repasvegetarien']} key='PoissonBlanc' />,
  ],
  eaudurobinet: [<Visualization types={['eauenbouteille', 'eaudurobinet']} key='eau' />],
  eauenbouteille: [<Visualization types={['eauenbouteille', 'eaudurobinet']} key='eau' />],
  laitdevache: [<Visualization types={['laitdevache', 'laitdesoja']} key='Lait' />],
  laitdesoja: [<Visualization types={['laitdevache', 'laitdesoja']} key='Lait' />],
  voiturethermique: [<Visualization types={['voiturethermique', 'busthermique', 'tgv']} key='Voiture' />],
  bus: [<Visualization types={['voiturethermique', 'busthermique', 'tgv']} key='Voiture' />],
  tgv: [<Visualization types={['voiturethermique', 'busthermique', 'tgv']} key='Voiture' />],
  metro: [<Visualization types={['voiturethermique', 'busthermique', 'metro']} key='Metro' />],
  avioncourtcourrier: [
    <Visualization key='avioncourtcourrier' types={['avioncourtcourrier', 'busthermique', 'tgv']} />,
  ],
  avionmoyencourrier: [
    <Visualization key='avionmoyencourrier' types={['avionmoyencourrier', 'busthermique', 'tgv']} />,
  ],
  avionlongcourrier: [<Visualization key='avionlongcourrier' types={['avionlongcourrier', 'busthermique', 'tgv']} />],
  tshirtencoton: [
    <Visualization types={['smartphone', 'repasavecduboeuf', 'tshirtencoton']} key='SmartphoneGeneral' />,
  ],
  jeans: [<Visualization types={['jeans', 'smartphone', 'repasavecduboeuf']} key='JeansGeneral' />],
  pullenlaine: [<Visualization types={['pullenlaine', 'smartphone', 'enceintebluetooth']} key='PullGeneral' />],
  manteau: [<Visualization types={['manteau', 'voiturethermique']} key='manteau' />],
  chauffageelectrique: [
    <Visualization types={['poeleabois', 'chauffageelectrique', 'poeleagranule']} key='Chauffage' />,
  ],
  chauffagefioul: [
    <Visualization types={['chauffagefioul', 'poeleagranule', 'chauffageelectrique']} key='Chauffage' />,
  ],
  chauffagegaz: [<Visualization types={['chauffagegaz', 'chauffageelectrique', 'pompeachaleur']} key='Chauffage' />],
  pompeachaleur: [<Visualization types={['chauffagefioul', 'poeleagranule', 'pompeachaleur']} key='Chauffage' />],
  poeleagranule: [<Visualization types={['chauffagegaz', 'poeleagranule', 'chauffageelectrique']} key='Chauffage' />],
  poeleabois: [<Visualization types={['poeleabois', 'poeleagranule', 'chauffageelectrique']} key='Chauffage' />],
  reseaudechaleur: [<Visualization types={['reseaudechaleur', 'poeleagranule', 'pompeachaleur']} key='Chauffage' />],
  liseuse: [
    <LiseuseBookComparator key='simulator' />,
    <Visualization
      types={['liseuse', { value: 1.1, name: 'livre[s] de poche', emoji: '📘', category: 1 }]}
      key='liseuse'
    />,
  ],
}

export default visualizations
