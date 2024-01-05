import React from 'react'
import { Container } from './SkipLinks.styles'

const SkipLinks = () => {
  return (
    <Container>
      <div>
        <div>
          <ul>
            <li>
              <a className='visible-hidden' href='#contenu'>
                Contenu
              </a>
            </li>
            <li>
              <a className='visible-hidden' href='#header-navigation'>
                Menu
              </a>
            </li>
            <li>
              <a className='visible-hidden' href='#footer'>
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
