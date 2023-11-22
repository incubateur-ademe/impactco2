import React from 'react'
import styled from 'styled-components'
import Ademe from 'components/base/Ademe'
import Logo from 'components/base/Logo'
import MagicLink from 'components/base/MagicLink'
import Marianne from 'components/base/Marianne'

// divs are necessary for better screenshot
export default function Signature({ noMargin, noLink }: { noMargin?: boolean; noLink?: boolean }) {
  return (
    <OutsideGrid $noMargin={noMargin}>
      <div>
        <Marianne />
      </div>
      <div>
        <Ademe />
      </div>
      <div>
        {!noLink && (
          <MagicLink to='https://impactco2.fr' noIcon>
            impactco2.fr
          </MagicLink>
        )}
      </div>
      <div>
        <Logo viewBox={'10 10 313 313'} />
      </div>
    </OutsideGrid>
  )
}

const OutsideGrid = styled.div<{ $noMargin?: boolean }>`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-around;
  ${({ $noMargin }) => !$noMargin && 'margin-left: 1.25rem;'}
`
