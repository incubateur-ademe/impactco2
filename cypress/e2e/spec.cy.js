/* eslint-disable no-undef */
describe('Home page', () => {
  it('has Title', () => {
    cy.visit('/')
    cy.get('h1').should('contain', 'Découvrez l’impact sur le climat')
  })

  it('Barre de recherche', () => {
    cy.visit('/')
    cy.get('#searchbar > div > form > div > input')
      .focus()
      .type('t', { delay: 500, force: true })
    cy.get('[title="simple suggestion"]').should('not.exist')
    cy.get('#searchbar > div > form > div > input')
      .focus()
      .type('r', { delay: 500, force: true })
    cy.get('[title="simple suggestion"]')
      .its('length')
      .should('be.greaterThan', 0)
    cy.get('#searchbar > div > form > div > input')
      .focus()
      .type('a', { delay: 500, force: true })
  })
})
