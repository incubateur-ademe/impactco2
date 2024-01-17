import React, { ReactNode } from 'react'
import { track } from 'utils/matomo'
import Link from 'components/base/buttons/Link'
import Divider from '../img/Divider'
import { CtaContainer, H2Title, Separator, UpperSide } from './Header.styles'

const Header = ({ title, cta }: { title: ReactNode; cta?: { to: string; label: string } }) => (
  <>
    <UpperSide>
      <div>
        <H2Title>{title}</H2Title>
      </div>
      {cta && (
        <CtaContainer>
          <Link
            asButton
            href={cta.to}
            onClick={() => track('Click', cta.label, `click_${cta.label.toLowerCase().replace(/ /g, '_')}`)}>
            {cta.label}
          </Link>
        </CtaContainer>
      )}
    </UpperSide>
    <Separator>
      <Divider />
    </Separator>
  </>
)

export default Header
