import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'
import Logo from 'components/base/Logo'

const Wrapper = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
`
const StyledLogo = styled(Logo)`
  position: absolute;
  bottom: 1rem;
  right: 1.5rem;
  width: 5rem;
  height: auto;
`
export default function Signature() {
  return (
    <>
      <Wrapper>
        Source :{' '}
        <MagicLink to='https://monconvertisseurco2.fr' noIcon>
          https://monconvertisseurco2.fr
        </MagicLink>
      </Wrapper>
      <StyledLogo />
    </>
  )
}
