import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'components/providers/ModalProvider'
import Modal from 'components/base/Modal'
import Integration from './shareModal/Integration'
import Mail from './shareModal/Mail'
import Facebook from './shareModal/Facebook'
import Twitter from './shareModal/Twitter'
import Linkedin from './shareModal/Linkedin'
import Whatsapp from './shareModal/Whatsapp'
import Link from './shareModal/Link'

const Title = styled.h2``
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  svg {
    display: block;
    width: 3.5rem;
    height: auto;

    path {
      fill: ${(props) => props.theme.colors.main};
    }
  }
`
export default function CO2EModal() {
  const { share: open, setShare: setOpen } = useContext(ModalContext)

  const href = typeof window !== 'undefined' ? window?.location?.href : ''

  return (
    <Modal open={open} setOpen={setOpen}>
      <Title>Partager</Title>
      <Wrapper>
        <Integration />
        <Mail
          subject={
            'Découvrez l’impact sur le climat des objets et gestes de votre quotidien'
          }
          url={href}
        />
        <Facebook
          quote={
            'Découvrez l’impact sur le climat des objets et gestes de votre quotidien'
          }
          url={href}
        />
        <Twitter
          title={
            'Découvrez l’impact sur le climat des objets et gestes de votre quotidien #monconvertisseurco2'
          }
          url={href}
        />
        <Linkedin
          title={
            'Découvrez l’impact sur le climat des objets et gestes de votre quotidien'
          }
          summary={'Mon Convertisseur CO2'}
          url={href}
        />
        <Whatsapp
          title={
            'Découvrez l’impact sur le climat des objets et gestes de votre quotidien'
          }
          url={href}
        />
      </Wrapper>
      <Link url={href} />
    </Modal>
  )
}
