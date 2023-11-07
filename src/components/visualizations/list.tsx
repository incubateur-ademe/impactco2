import React from 'react'
import LiseuseBookComparator from 'components/numerique/equivalent/LiseuseBookComparator'
import StockageEmails from 'components/numerique/equivalent/StockageEmails'
import Smartphone from './Smartphone'
import Visualization from './Visualization'

const visualizations = {
  smartphone: [
    <Visualization type='smartphone' key='SmartphoneGeneral' />,
    <Visualization type='smartphoneNumerique' key='SmartphoneCategory' />,
    <Smartphone key='Smartphone' />,
  ],
  ordinateurportable: [<Visualization type='smartphoneNumerique' key='SmartphoneCategory' />],
  television: [<Visualization type='smartphoneNumerique' key='SmartphoneCategory' />],
  montreconnectee: [
    <Visualization type='montre' key='Montre' />,
    <Visualization type='montreNumerique' key='MontreCategory' />,
  ],
  imprimantejetdencre: [<Visualization type='imprimante' key='ImprimanteCategory' />],
  consoledesalon: [<Visualization type='console' key='ConsoleSalonCategory' />],
  ordinateurfixe: [<Visualization type='ordinateur' key='OrdinateurFixeCategory' />],
  repasvegetalien: [<Visualization type='vegetalien' key='Vegetalien' />],
  repasvegetarien: [<Visualization type='boeuf' key='Boeuf' />],
  repasavecduboeuf: [
    <Visualization type='boeuf' key='Boeuf' />,
    <Visualization type='smartphone' key='SmartphoneGeneral' />,
  ],
  repasavecdupoulet: [<Visualization type='boeuf' key='Boeuf' />],
  repasavecdupoissongras: [<Visualization type='poissonGras' key='PoissonGras' />],
  repasavecdupoissonblanc: [<Visualization type='poissonBlanc' key='PoissonBlanc' />],
  eaudurobinet: [<Visualization type='eau' key='eau' />],
  eauenbouteille: [<Visualization type='eau' key='eau' />],
  laitdevache: [<Visualization type='lait' key='Lait' />],
  laitdesoja: [<Visualization type='lait' key='Lait' />],
  voiturethermique: [<Visualization type='voiture' key='Voiture' />],
  bus: [<Visualization type='voiture' key='Voiture' />],
  tgv: [<Visualization type='voiture' key='Voiture' />],
  metro: [<Visualization type='metro' key='Metro' />],
  avion: [<Visualization key='avion' type='avion' />],
  tshirtencoton: [<Visualization type='smartphone' key='SmartphoneGeneral' />],
  jeansencoton: [<Visualization type='jeans' key='JeansGeneral' />],
  pullenlaine: [<Visualization type='pull' key='PullGeneral' />],
  manteau: [<Visualization type='manteau' key='manteau' />],
  chauffageelectriquemaison: [<Visualization type='chauffage' key='Chauffage' />],
  chauffagefioulmaison: [<Visualization type='chauffage' key='Chauffage' />],
  chauffagegazmaison: [<Visualization type='chauffage' key='Chauffage' />],
  email: [<StockageEmails key='StockageEmails' />],
  emailpiecejointe: [<StockageEmails key='StockageEmails' />],
  stockageemail: [<StockageEmails key='StockageEmails' />],
  liseuse: [<LiseuseBookComparator key='simulator' />, <Visualization type='liseuse' key='liseuse' />],
}

export default visualizations
