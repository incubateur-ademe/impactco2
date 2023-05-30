/* eslint-disable no-undef */
import React from 'react'

import { StyleProvider } from 'components/providers/StyleProvider'

import PoissonBlanc from './PoissonBlanc'

describe('<PoissonBlanc />', () => {
  it('On voit bien 7 poissons', () => {
    cy.mount(
      <StyleProvider>
        <PoissonBlanc />
      </StyleProvider>
    )
    cy.get('[alt="🐟"]').should('exist')
    cy.get('[alt="🐟"]').its('length').should('equal', 4)
  })
  it("Le texte indique bien qu'un repas avec du boeuf vaut 4 repas avec du poisson blanc", () => {
    cy.mount(
      <StyleProvider>
        <PoissonBlanc />
      </StyleProvider>
    )
    cy.get('body').should(
      'contains.text',
      '1 repas avecdu boeuf=4 repas avecdu poisson blanc'
    )
  })
})
