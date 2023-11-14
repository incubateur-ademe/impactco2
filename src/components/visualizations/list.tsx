import React from 'react'
import LiseuseBookComparator from 'components/numerique/equivalent/LiseuseBookComparator'
import StockageEmails from 'components/numerique/equivalent/StockageEmails'
import Smartphone from './Smartphone'
import Visualization from './Visualization'

const visualizations = {
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
  avion: [<Visualization key='avion' types={['avion', 'busthermique', 'tgv']} />],
  tshirtencoton: [
    <Visualization types={['smartphone', 'repasavecduboeuf', 'tshirtencoton']} key='SmartphoneGeneral' />,
  ],
  jeans: [<Visualization types={['jeans', 'smartphone', 'repasavecduboeuf']} key='JeansGeneral' />],
  pullenlaine: [<Visualization types={['pullenlaine', 'smartphone', 'enceintebluetooth']} key='PullGeneral' />],
  manteau: [<Visualization types={['manteau', 'voiturethermique']} key='manteau' />],
  chauffageelectriquemaison: [
    <Visualization
      base={2}
      types={['chauffagefioulmaison', 'chauffagegazmaison', 'chauffageelectriquemaison']}
      key='Chauffage'
    />,
  ],
  chauffagefioulmaison: [
    <Visualization
      base={2}
      types={['chauffagefioulmaison', 'chauffagegazmaison', 'chauffageelectriquemaison']}
      key='Chauffage'
    />,
  ],
  chauffagegazmaison: [
    <Visualization
      base={2}
      types={['chauffagefioulmaison', 'chauffagegazmaison', 'chauffageelectriquemaison']}
      key='Chauffage'
    />,
  ],
  email: [<StockageEmails key='StockageEmails' />],
  emailpiecejointe: [<StockageEmails key='StockageEmails' />],
  stockageemail: [<StockageEmails key='StockageEmails' />],
  liseuse: [
    <LiseuseBookComparator key='simulator' />,
    <Visualization types={['liseuse', 'livredepoche']} key='liseuse' />,
  ],
}

export default visualizations
