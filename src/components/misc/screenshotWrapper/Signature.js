import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'
import Datagir from 'components/base/Datagir'
import Logo from 'components/misc/Logo'

const Wrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.875rem;
  pointer-events: none;
`
const StyledLogo = styled(Logo)`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  font-size: 0.571428571rem;
  pointer-events: none;
`
const StyledDatagir = styled(Datagir)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: auto;
  height: 2rem;
  margin: 0;
  pointer-events: none;
`
export default function Signature() {
  return (
    <>
      <StyledLogo />
      <Wrapper>
        <MagicLink to='https://monconvertisseurco2.fr' noIcon>
          monconvertisseurco2.fr
        </MagicLink>
      </Wrapper>
      <StyledDatagir />
    </>
  )
}
