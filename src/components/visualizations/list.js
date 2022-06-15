import React from 'react'

import SmartphoneGeneral from './SmartphoneGeneral'
import SmartphoneCategory from './SmartphoneCategory'
import Smartphone from './Smartphone'
import Montre from './Montre'
import MontreCategory from './MontreCategory'
import ImprimanteCategory from './ImprimanteCategory'
import ConsoleSalonCategory from './ConsoleSalonCategory'

import Boeuf from './Boeuf'
import PoissonGras from './PoissonGras'
import PoissonBlanc from './PoissonBlanc'
import Vegetalien from './Vegetalien'

import Voiture from './Voiture'
import Metro from './Metro'
import Avion from './Avion'

const visualizations = {
  smartphone: [<SmartphoneGeneral />, <SmartphoneCategory />, <Smartphone />],
  ordinateurportable: [<SmartphoneCategory />],
  television: [<SmartphoneCategory />],
  montreconnectee: [<Montre />, <MontreCategory />],
  imprimantejetdencre: [<ImprimanteCategory />],
  consoledesalon: [<ConsoleSalonCategory />],
  repasvegetalien: [<Vegetalien />],
  repasvegetarien: [<Boeuf />],
  repasavecduboeuf: [<Boeuf />, <SmartphoneGeneral />],
  repasavecdupoulet: [<Boeuf />],
  repasavecdupoissongras: [<PoissonGras />],
  repasavecdupoissonblanc: [<PoissonBlanc />],
  voiturethermique: [<Voiture />],
  bus: [<Voiture />],
  tgv: [<Voiture />],
  metro: [<Metro />],
  avion: [<Avion />],
}

export default visualizations
