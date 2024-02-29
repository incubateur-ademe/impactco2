import React from 'react'
import styled from 'styled-components'
import { buildCurrentUrlFor } from 'utils/urls'
import Ademe from 'components/base/Ademe'
import Logo from 'components/base/Logo'
import Marianne from 'components/base/Marianne'
import Link from 'components/base/buttons/Link'

// divs are necessary for better screenshot
export default function Signature({
  noMargin,
  noLink,
  center,
  color,
  small,
}: {
  noMargin?: boolean
  noLink?: boolean
  center?: boolean
  color?: string
  small?: boolean
}) {
  return (
    <OutsideGrid $noMargin={noMargin} $center={center} $small={small}>
      <MarianneContainer>
        <Marianne />
      </MarianneContainer>
      <div>
        <Ademe />
      </div>
      <div>
        {!noLink && (
          <Link href={buildCurrentUrlFor('/')} noIcon>
            impactco2.fr
          </Link>
        )}
      </div>
      <div>
        <Logo viewBox={'10 10 313 313'} color={color} />
      </div>
    </OutsideGrid>
  )
}

const MarianneContainer = styled.div`
  margin-right: 1.5rem;
`

const OutsideGrid = styled.div<{ $noMargin?: boolean; $center?: boolean; $small?: boolean }>`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: ${({ $center }) => ($center ? 'center' : 'space-around')};
  ${({ $noMargin }) => !$noMargin && 'margin-left: 1.25rem;'}

  ${({ $small }) =>
    $small &&
    `
      position: absolute;
      bottom: 8px;
      right: 8px;
      gap: 0.25rem;
      font-size: 0.5rem !important;
      svg {
        width: auto;
        height: 30px;
      }
    `}
`
