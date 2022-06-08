import React from 'react'

import SmartphoneGeneral from './SmartphoneGeneral'
import SmartphoneCategory from './SmartphoneCategory'
import Smartphone from './Smartphone'

import Boeuf from './Boeuf'
import PoissonGras from './PoissonGras'
import PoissonBlanc from './PoissonBlanc'

const visualizations = {
  smartphone: [<SmartphoneGeneral />, <SmartphoneCategory />, <Smartphone />],
  repasvegetarien: [<Boeuf />],
  repasavecduboeuf: [<Boeuf />],
  repasavecdupoissongras: [<PoissonGras />],
  repasavecdupoissonblanc: [<PoissonBlanc />],
}

export default visualizations
