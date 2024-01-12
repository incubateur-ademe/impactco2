import React from 'react'
import styled from 'styled-components'
import useModalContext from 'components/providers/ModalProvider'
import ClipboardBox from 'components/base/ClipboardBox'
import Modal from 'components/base/Modal'
import Facebook from './shareModal/Facebook'
import Integration from './shareModal/Integration'
import Linkedin from './shareModal/Linkedin'
import Mail from './shareModal/Mail'
import Twitter from './shareModal/Twitter'
import Whatsapp from './shareModal/Whatsapp'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  svg {
    display: block;
    height: auto;
    width: 3.5rem;

    path {
      fill: var(--primary-50);
    }
  }
`
export default function CO2EModal() {
  const { share: open, setShare: setOpen } = useModalContext()

  const href = `${typeof window !== 'undefined' ? window?.location?.href : ''}${typeof open === 'string' ? open : ''}`
  return open ? (
    <Modal open={!!open} setOpen={(value) => setOpen(!!value)}>
      <h2>Partager</h2>
      <Wrapper>
        <Integration />
        <Mail subject='Découvrez l’impact sur le climat des objets et gestes de votre quotidien' url={href} />
        <Facebook quote='Découvrez l’impact sur le climat des objets et gestes de votre quotidien' url={href} />
        <Twitter
          title='Découvrez l’impact sur le climat des objets et gestes de votre quotidien #impactco2'
          url={href}
        />
        <Linkedin
          title='Découvrez l’impact sur le climat des objets et gestes de votre quotidien'
          summary='Impact CO₂'
          url={href}
        />
        <Whatsapp title='Découvrez l’impact sur le climat des objets et gestes de votre quotidien' url={href} />
      </Wrapper>
      <ClipboardBox tracking='Comparateur'>{href}</ClipboardBox>
    </Modal>
  ) : null
}
