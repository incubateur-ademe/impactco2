import React from 'react'
import styled from 'styled-components'
import Ademe from 'components/base/Ademe'
import Logo from 'components/base/Logo'
import Marianne from 'components/base/Marianne'
import Link from 'components/base/buttons/Link'

// divs are necessary for better screenshot
export default function Signature({
  noMargin,
  noLink,
  center,
}: {
  noMargin?: boolean
  noLink?: boolean
  center?: boolean
}) {
  return (
    <OutsideGrid $noMargin={noMargin} $center={center}>
      <div>
        <Marianne />
      </div>
      <div>
        <Ademe />
      </div>
      <div>
        {!noLink && (
          <Link href={process.env.NEXT_PUBLIC_URL as string} noIcon>
            impactco2.fr
          </Link>
        )}
      </div>
      <div>
        <Logo viewBox={'10 10 313 313'} />
      </div>
    </OutsideGrid>
  )
}

const OutsideGrid = styled.div<{ $noMargin?: boolean; $center?: boolean }>`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: ${({ $center }) => ($center ? 'center' : 'space-around')};
  ${({ $noMargin }) => !$noMargin && 'margin-left: 1.25rem;'}
`
