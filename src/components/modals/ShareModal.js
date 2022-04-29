import React, { useContext } from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'

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

  const location = useLocation()

  const url = location.origin

  return (
    <Modal open={open} setOpen={setOpen}>
      <Title>Partager</Title>
      <Wrapper>
        <Integration />
        <Mail subject={'subject'} body={'body'} url={url} />
        <Facebook quote={'quote'} url={url} />
        <Twitter title={'title'} url={url} />
        <Linkedin
          title={'title'}
          summary={'summary'}
          source={'source'}
          url={url}
        />
        <Whatsapp title={'title'} url={url} />
      </Wrapper>
      <Link url={url} />
    </Modal>
  )
}
