/* eslint-disable no-undef */
describe('Home page', () => {
  it('has Title', () => {
    cy.visit('/')
    cy.get('h1').should('contain', 'Découvrez l’impact sur le climat')
  })
  it('has search bar', () => {
    cy.visit('/')
    // cy.click('#searchbar > div > form > div > input')
    cy.get('#searchbar > div > form > div > input').focus().type('train', {
      // force: true,
      delay: 500,
      // waitForAnimations: true
    })
  })
})
