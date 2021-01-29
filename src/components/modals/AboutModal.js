import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'utils/ModalContext'
import Modal from '@bit/datagir.simulateurs.modal'

const Text = styled.p``
export default function AboutModal() {
  const { about, setAbout } = useContext(ModalContext)
  return (
    <Modal open={about} setOpen={setAbout} textColor={'main'}>
      <Text dangerouslySetInnerHTML={{ __html: about }} />
    </Modal>
  )
}
