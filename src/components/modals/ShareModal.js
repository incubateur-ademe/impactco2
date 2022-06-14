import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'utils/ModalContext'
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
        <Mail subject={'subject'} body={'body'} url={href} />
        <Facebook quote={'quote'} url={href} />
        <Twitter title={'title'} url={href} />
        <Linkedin
          title={'title'}
          summary={'summary'}
          source={'source'}
          url={href}
        />
        <Whatsapp title={'title'} url={href} />
      </Wrapper>
      <Link url={href} />
    </Modal>
  )
}
