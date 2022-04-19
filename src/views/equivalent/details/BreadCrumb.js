import React from 'react'
import styled from 'styled-components'

import { formatName } from 'utils/formatters'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div`
  margin-bottom: 1rem;
  font-size: 0.75rem;
  font-weight: 300;

  ${(props) => props.theme.mq.small} {
    display: none;
  }
`
export default function BreadCrumb(props) {
  return (
    <Wrapper>
      <MagicLink to='/'>Accueil</MagicLink>
      {'  '}>{'  '}
      <MagicLink to={`/categories/#${props.category.slug}`} internal>
        {props.category.name.fr}
      </MagicLink>
      {'  '}>{'  '}
      {formatName(props.equivalent.name.fr, 1, true)}
    </Wrapper>
  )
}
