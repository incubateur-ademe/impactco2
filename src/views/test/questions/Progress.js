import React, { useContext } from 'react'
import styled from 'styled-components'

import RulesContext from 'utils/RulesContext'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0.25rem;
  background-color: ${(props) => props.theme.colors.mainLight};
`
const Indicator = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transform: scaleX(${(props) => props.percent});
  transform-origin: left;
  background-color: ${(props) => props.color};
  transition: transform 300ms ease-out;
`
export default function Progress(props) {
  const { curCategory } = useContext(RulesContext)
  return (
    <Wrapper>
      <Indicator
        percent={props.curQuestion / props.questions.length}
        color={curCategory.rawNode['couleur']}
      />
    </Wrapper>
  )
}
