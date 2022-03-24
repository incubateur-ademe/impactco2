import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div`
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
  font-weight: 300;
`
export default function Breadcrumb(props) {
  return (
    <Wrapper>
      <MagicLink to='/'>Accueil</MagicLink>
      {'  '}>{'  '}
      <MagicLink to={`/categories/#${props.category.slug}`} internal>
        {props.category.name.fr}
      </MagicLink>
      {'  '}>{'  '}
      {props.equivalent.name.fr.replaceAll('[s]', '')}
    </Wrapper>
  )
}
