import React from 'react'

import SmartphoneGeneral from './SmartphoneGeneral'
import SmartphoneCategory from './SmartphoneCategory'
import Smartphone from './Smartphone'
import Montre from './Montre'
import MontreCategory from './MontreCategory'
import ImprimanteCategory from './ImprimanteCategory'
import ConsoleSalonCategory from './ConsoleSalonCategory'
import OrdinateurFixeCategory from './OrdinateurFixeCategory'

import Boeuf from './Boeuf'
import PoissonGras from './PoissonGras'
import PoissonBlanc from './PoissonBlanc'
import Vegetalien from './Vegetalien'

import Eau from './Eau'
import Lait from './Lait'

import Voiture from './Voiture'
import Metro from './Metro'
import Avion from './Avion'

import JeansGeneral from './JeansGeneral'
import PullGeneral from './PullGeneral'
import Manteau from './Manteau'

import Chauffage from './Chauffage'

import StockageEmails from 'components/numerique/StockageEmails'

const visualizations = {
  smartphone: [
    <SmartphoneGeneral key='SmartphoneGeneral' />,
    <SmartphoneCategory key='SmartphoneCategory' />,
    <Smartphone key='Smartphone' />,
  ],
  ordinateurportable: [<SmartphoneCategory key='SmartphoneCategory' />],
  television: [<SmartphoneCategory key='SmartphoneCategory' />],
  montreconnectee: [
    <Montre key='Montre' />,
    <MontreCategory key='MontreCategory' />,
  ],
  imprimantejetdencre: [<ImprimanteCategory key='ImprimanteCategory' />],
  consoledesalon: [<ConsoleSalonCategory key='ConsoleSalonCategory' />],
  ordinateurfixe: [<OrdinateurFixeCategory key='OrdinateurFixeCategory' />],
  repasvegetalien: [<Vegetalien key='Vegetalien' />],
  repasvegetarien: [<Boeuf key='Boeuf' />],
  repasavecduboeuf: [
    <Boeuf key='Boeuf' />,
    <SmartphoneGeneral key='SmartphoneGeneral' />,
  ],
  repasavecdupoulet: [<Boeuf key='Boeuf' />],
  repasavecdupoissongras: [<PoissonGras key='PoissonGras' />],
  repasavecdupoissonblanc: [<PoissonBlanc key='PoissonBlanc' />],
  eaudurobinet: [<Eau key='Eau' />],
  eauenbouteille: [<Eau key='Eau' />],
  laitdevache: [<Lait key='Lait' />],
  laitdesoja: [<Lait key='Lait' />],
  voiturethermique: [<Voiture key='Voiture' />],
  bus: [<Voiture key='Voiture' />],
  tgv: [<Voiture key='Voiture' />],
  metro: [<Metro key='Metro' />],
  avion: [<Avion key='Avion' />],
  tshirtencoton: [<SmartphoneGeneral key='SmartphoneGeneral' />],
  jeansencoton: [<JeansGeneral key='JeansGeneral' />],
  pullenlaine: [<PullGeneral key='PullGeneral' />],
  manteau: [<Manteau key='Manteau' />],
  chauffageelectriquemaison: [<Chauffage key='Chauffage' />],
  chauffagefioulmaison: [<Chauffage key='Chauffage' />],
  chauffagegazmaison: [<Chauffage key='Chauffage' />],
  email: [<StockageEmails key='StockageEmails' />],
  emailpiecejointe: [<StockageEmails key='StockageEmails' />],
  stockageemail: [<StockageEmails key='StockageEmails' />],
}

export const home = [
  <Boeuf key='Boeuf' />,
  <SmartphoneGeneral key='SmartphoneGeneral' />,
  <Voiture key='Voiture' />,
  <PullGeneral key='PullGeneral' />,
  <SmartphoneCategory key='SmartphoneCategory' />,
  <PoissonGras key='PoissonGras' />,
  <Montre key='Montre' />,
  <Lait key='Lait' />,
  <MontreCategory key='MontreCategory' />,
  <JeansGeneral key='JeansGeneral' />,
  <Vegetalien key='Vegetalien' />,
  <ImprimanteCategory key='ImprimanteCategory' />,
  <ConsoleSalonCategory key='ConsoleSalonCategory' />,
  <OrdinateurFixeCategory key='OrdinateurFixeCategory' />,
  <PoissonBlanc key='PoissonBlanc' />,
  <Avion key='Avion' />,
]

export const test = {
  'alimentation . plats': <Boeuf />,
  'alimentation . boisson . eau en bouteille . affirmatif': <Eau />,
  'transport . avion . usager': <Avion />,
  'transport . voiture . km': <Voiture />,
  'transport . train . km': <Voiture />,
  'logement . chauffage . gaz . présent': <Chauffage />,
  'logement . chauffage . fioul . présent': <Chauffage />,
  'numérique . ordinateur portable . présent': <SmartphoneCategory />,
  'numérique . ordinateur fixe . présent': <OrdinateurFixeCategory />,
  'numérique . téléphone . présent': <SmartphoneGeneral />,
  'numérique . téléphone . type': <Smartphone />,
  'numérique . TV . présent': <SmartphoneCategory />,
}

export default visualizations
