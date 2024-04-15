import { useTranslations } from 'next-intl'
import React, { ReactNode } from 'react'
import GhostButton from './GhostButton'
import { Children, Container, Content, Footer, Header, Scroll, Shadow } from './OversScreen.styles'

export type OverScreenInfo = {
  title?: ReactNode
  children: ReactNode
  cancel?: (onClose: () => void) => ReactNode
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
  const t = useTranslations('overscreen')
  const tModal = useTranslations('modal')
  return (
    <Container>
      {values.title && <Shadow onClick={onClose} />}
      <Content $color={color} $fullHeight={!values.title}>
        {values.title && (
          <Header $color={color}>
            <span className='text-lg'>
              <b>{t(values.title)}</b>
            </span>
            <GhostButton
              colored={color === 'secondary'}
              icon='close'
              iconPosition='right'
              onClick={onClose}
              size={color === 'secondary' ? 'sm' : undefined}>
              {tModal('close')}
            </GhostButton>
          </Header>
        )}
        {values.title ? (
          <Scroll $color={color}>
            <Children>{values.children}</Children>
          </Scroll>
        ) : (
          <Children>{values.children}</Children>
        )}
        {values.title && (
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
                {tModal('cancel')}
              </GhostButton>
            )}
          </Footer>
        )}
      </Content>
    </Container>
  )
}

export default OverScreen
