import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import buildQueryParamsFromSession from 'utils/buildQueryParamsFromSession'
import ModalContext from 'components/providers/ModalProvider'
import Modal from 'components/base/Modal'
import Facebook from './shareModal/Facebook'
import Integration from './shareModal/Integration'
import Link from './shareModal/Link'
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
      fill: ${(props) => props.theme.colors.main};
    }
  }
`
export default function CO2EModal() {
  const { share: open, setShare: setOpen } = useContext(ModalContext)

  const href = `${typeof window !== 'undefined' ? buildQueryParamsFromSession(window?.location?.href, window) : ''}`

  return open ? (
    <Modal open={!!open} setOpen={(value) => setOpen(!!value)}>
      <h2>Partager</h2>
      <Wrapper>
        <Integration />
        <Mail subject={'Découvrez l’impact sur le climat des objets et gestes de votre quotidien'} url={href} />
        <Facebook quote={'Découvrez l’impact sur le climat des objets et gestes de votre quotidien'} url={href} />
        <Twitter
          title={'Découvrez l’impact sur le climat des objets et gestes de votre quotidien #impactco2'}
          url={href}
        />
        <Linkedin
          title={'Découvrez l’impact sur le climat des objets et gestes de votre quotidien'}
          summary={'Impact CO2'}
          url={href}
        />
        <Whatsapp title={'Découvrez l’impact sur le climat des objets et gestes de votre quotidien'} url={href} />
      </Wrapper>
      <Link url={href} />
    </Modal>
  ) : null
}
