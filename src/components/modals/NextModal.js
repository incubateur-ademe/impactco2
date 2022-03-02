import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'utils/ModalContext'
import Modal from 'components/base/Modal'

const Title = styled.h2``
const Text = styled.p``
export default function NextModal() {
  const { next, setNext } = useContext(ModalContext)
  return (
    <Modal open={next} setOpen={setNext}>
      <Title>Que va-t-il devenir ?</Title>
      <Text
        dangerouslySetInnerHTML={{
          __html: next[`Que_va-t-il_devenir_?`],
        }}
      />
    </Modal>
  )
}
