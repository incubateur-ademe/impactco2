import React from 'react'
import GhostButton from '../../base/GhostButton'
import Hypotesis from './Hypotesis'
import Integration from './Integration'
import { Children, Container, Content, Footer, Header, Shadow } from './Modal.styles'
import Share from './Share'

export type ModalType = 'hypothesis' | 'share' | 'integration'
const modalsValues = {
  hypothesis: {
    title: 'Nos hypothèses de calcul',
    children: <Hypotesis />,
    cancel: false,
  },
  share: {
    title: 'Partager le challenge',
    children: <Share />,
    cancel: true,
  },
  integration: {
    title: 'Intégrer le challenge',
    children: <Integration />,
    cancel: true,
  },
}

const Modal = ({ type, onClose }: { type: ModalType; onClose: () => void }) => {
  const values = modalsValues[type]
  return (
    <Container>
      <Shadow onClick={onClose} />
      <Content>
        <Header>
          {values.title}
          <GhostButton colored icon='close' iconPosition='right' onClick={onClose} size='sm'>
            Fermer
          </GhostButton>
        </Header>
        <Children>{values.children}</Children>
        <Footer>
          {values.cancel ? (
            <GhostButton colored icon='close' iconPosition='right' onClick={onClose} size='sm'>
              Annuler
            </GhostButton>
          ) : (
            <GhostButton colored icon='arrow-left' onClick={onClose} size='sm'>
              Revenir au challenge
            </GhostButton>
          )}
        </Footer>
      </Content>
    </Container>
  )
}

export default Modal
