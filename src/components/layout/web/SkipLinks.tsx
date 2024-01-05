import React from 'react'
import { Container } from './SkipLinks.styles'

const SkipLinks = () => {
  return (
    <Container>
      <div className='fr-skiplinks'>
        <div className='fr-container' aria-label='Accès rapide'>
          <ul className='fr-skiplinks__list'>
            <li>
              <a className='fr-link visible-hidden' href='#contenu'>
                Contenu
              </a>
            </li>
            <li>
              <a className='fr-link visible-hidden' href='#header-navigation'>
                Menu
              </a>
            </li>
            <li>
              <a className='fr-link visible-hidden' href='#footer'>
                Pied de page
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  )
}

export default SkipLinks
