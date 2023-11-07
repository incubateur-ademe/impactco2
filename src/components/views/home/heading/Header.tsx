import React, { ReactNode } from 'react'
import Button from 'components/base/Button'
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
          <Button to={cta.to}>{cta.label}</Button>
        </CtaContainer>
      )}
    </UpperSide>
    <Separator>
      <Divider />
    </Separator>
  </>
)

export default Header