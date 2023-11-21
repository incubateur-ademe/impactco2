import React from 'react'
import styled from 'styled-components'
import Ademe from 'components/base/Ademe'
import Logo from 'components/base/Logo'
import MagicLink from 'components/base/MagicLink'
import Marianne from 'components/base/Marianne'

export default function Signature({ noMargin, noLink }: { noMargin?: boolean; noLink?: boolean }) {
  return (
    <OutsideGrid $noMargin={noMargin}>
      <Marianne />
      <Ademe />
      {!noLink && (
        <MagicLink to='https://impactco2.fr' noIcon>
          impactco2.fr
        </MagicLink>
      )}
      <StyledLogo viewBox={'10 10 313 313'} />
    </OutsideGrid>
  )
}

const StyledLogo = styled(Logo)`
  // Hack nécessaire : bug firefox lors des screenshots d'écran
  svg {
    border: 2px solid #26827c;
    padding: 0;
    > path {
      display: none;
    }
  }
  display: flex;
  justify-content: flex-end;
`

const OutsideGrid = styled.div<{ $noMargin?: boolean }>`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  ${({ $noMargin }) => !$noMargin && 'margin-left: 1.25rem;'}
`
