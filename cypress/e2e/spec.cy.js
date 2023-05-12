/* eslint-disable no-undef */
describe('Home page', () => {
  it('has Title', () => {
    cy.visit('/')
    cy.get('h1').should('contain', 'Découvrez l’impact sur le climat')
  })
  it('has search bar', () => {
    cy.visit('/')
    cy.get('#searchbar > div > form > div > input').type('train', {
      force: true,
    })
  })
})
