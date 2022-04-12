import React from 'react'
import styled from 'styled-components'

import { formatNumber, formatName } from 'utils/formatters'

const Wrapper = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 5rem;
  margin: 0 0.5rem;
  padding: 1rem;
  font-size: 1.25rem;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.footerLight};
  border-radius: 1rem;
`

export default function Equivalent(props) {
  return (
    <Wrapper>
      {formatNumber(props.weight / props.equivalent.total)}{' '}
      {formatName(
        props.equivalent.name.fr,
        formatNumber(props.weight / props.equivalent.total, true)
      )}
    </Wrapper>
  )
}
