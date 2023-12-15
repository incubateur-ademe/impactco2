import React, { ReactNode } from 'react'
import GhostButton from './GhostButton'
import { Children, Container, Content, Footer, Header, Scroll, Shadow } from './OversScreen.styles'

export type OverScreenInfo = {
  title: ReactNode
  children: ReactNode
  cancel?: (onClose: () => void) => ReactNode
  noScroll?: boolean
}
const OverScreen = ({ values, onClose, theme }: { values: OverScreenInfo; onClose: () => void; theme?: 'blue' }) => {
  return (
    <Container>
      <Shadow onClick={onClose} />
      <Content $theme={theme}>
        <Header $theme={theme}>
          {values.title}
          <GhostButton
            colored={theme === 'blue'}
            icon='close'
            iconPosition='right'
            onClick={onClose}
            size={theme === 'blue' ? 'sm' : undefined}>
            Fermer
          </GhostButton>
        </Header>
        {values.noScroll ? (
          <Children>{values.children}</Children>
        ) : (
          <Scroll $theme={theme}>
            <Children>{values.children}</Children>
          </Scroll>
        )}
        <Footer $theme={theme}>
          {values.cancel ? (
            values.cancel(onClose)
          ) : (
            <GhostButton
              colored={theme === 'blue'}
              icon='close'
              iconPosition='right'
              onClick={onClose}
              size={theme === 'blue' ? 'sm' : undefined}>
              Annuler
            </GhostButton>
          )}
        </Footer>
      </Content>
    </Container>
  )
}

export default OverScreen
