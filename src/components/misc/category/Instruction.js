import React from 'react'
import styled from 'styled-components'
import formatName from 'utils/formatName'

const Wrapper = styled.p`
  font-size: 0.875rem;
  font-weight: 300;
  margin: 0 0 1rem 0;
  text-align: center;
`
export default function Instruction(props) {
  return (
    <Wrapper className={'noscreenshot'}>
      Cliquez sur un{props.gender === 'f' ? 'e' : ''} {formatName(props.title) || 'équivalent'} pour voir le détail.
    </Wrapper>
  )
}
