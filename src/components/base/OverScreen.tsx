import React, { ReactNode } from 'react'
import GhostButton from './GhostButton'
import { Children, Container, Content, Footer, Header, Scroll, Shadow } from './OversScreen.styles'

export type OverScreenInfo = {
  title: ReactNode
  children: ReactNode
  cancel?: (onClose: () => void) => ReactNode
  noScroll?: boolean
}
const OverScreen = ({
  values,
  onClose,
  color,
}: {
  values: OverScreenInfo
  onClose: () => void
  color?: 'secondary'
}) => {
  return (
    <Container>
      <Shadow onClick={onClose} />
      <Content $color={color}>
        <Header $color={color}>
          <span className='text-lg'>
            <b>{values.title}</b>
          </span>
          <GhostButton
            colored={color === 'secondary'}
            icon='close'
            iconPosition='right'
            onClick={onClose}
            size={color === 'secondary' ? 'sm' : undefined}>
            Fermer
          </GhostButton>
        </Header>
        {values.noScroll ? (
          <Children>{values.children}</Children>
        ) : (
          <Scroll $color={color}>
            <Children>{values.children}</Children>
          </Scroll>
        )}
        <Footer $color={color}>
          {values.cancel ? (
            values.cancel(onClose)
          ) : (
            <GhostButton
              colored={color === 'secondary'}
              icon='close'
              iconPosition='right'
              onClick={onClose}
              size={color === 'secondary' ? 'sm' : undefined}>
              Annuler
            </GhostButton>
          )}
        </Footer>
      </Content>
    </Container>
  )
}

export default OverScreen
