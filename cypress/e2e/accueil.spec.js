/* eslint-disable no-undef */
describe('Home page', () => {
  const typeSearchBar = (cy, letter) => {
    cy.get('#searchbar > div > form > div > input')
      .focus()
      .type(letter, { delay: 100, force: true })
  }

  it('has Title', () => {
    cy.visit('/')
    cy.get('h1').should('contain', 'Découvrez l’impact sur le climat')
  })

  it('Barre de recherche, pas de résultat pour une simple lettre', () => {
    cy.visit('/')
    typeSearchBar(cy, 't')
    cy.findByTitle('simple suggestion', { timeout: 2000 }).should('not.exist')
  })

  it("Barre de recherche, message explicite d'absence de résultat, si syllabe trop complexe en entrée", () => {
    cy.visit('/')
    typeSearchBar(cy, 't')
    typeSearchBar(cy, 'w')
    cy.findByTitle('pas de résultat', { timeout: 2000 }).should('exist')
  })

  it('Barre de recherche, la liste de suggestion apparaît, pour une syllable simple en entrée', () => {
    cy.visit('/')
    typeSearchBar(cy, 't')
    typeSearchBar(cy, 'r')
    typeSearchBar(cy, 'a')
    cy.findAllByTitle('simple suggestion', { timeout: 2000 }).should('exist')
  })
})
