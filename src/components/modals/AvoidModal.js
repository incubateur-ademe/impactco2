import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'utils/ModalContext'
import Modal from 'components/base/Modal'

const Title = styled.h2``
const Text = styled.p``
export default function AvoidModal() {
  const { avoid, setAvoid } = useContext(ModalContext)
  return (
    <Modal open={avoid} setOpen={setAvoid}>
      <Title>Comment éviter de le produire ?</Title>
      <Text
        dangerouslySetInnerHTML={{
          __html: avoid[`Comment_les_eviter_?`],
        }}
      />
    </Modal>
  )
}
