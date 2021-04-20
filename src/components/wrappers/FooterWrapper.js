import React from 'react'

import MagicLink from 'components/base/MagicLink'
import Footer from 'components/layout/Footer'

export default function FooterWrapper() {
  return (
    <Footer background={'background'}>
      <h2>D'ou viennent ces données ?</h2>
      <p>
        Ce simulateur réutilise les données de la{' '}
        <MagicLink to='https://www.bilans-ges.ademe.fr/fr/accueil/contenu/index/page/presentation/siGras/0'>
          Base Carbone
        </MagicLink>
        . Il s’agit d’une{' '}
        <strong>base de données publique de facteurs d'émissions</strong>,
        nécessaires à la réalisation d’un bilan d’émissions de gaz à effet de
        serre (GES) et plus généralement tout exercice de comptabilité carbone.
      </p>
    </Footer>
  )
}
