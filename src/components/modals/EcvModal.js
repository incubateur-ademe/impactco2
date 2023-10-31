import React, { useContext } from 'react'
import styled from 'styled-components'
import ModalContext from 'components/providers/ModalProvider'
import Modal from 'components/base/Modal'
import Agribalyse from './ecvModal/Agribalyse'
import Numerique from './ecvModal/Numerique'
import Standard from './ecvModal/Standard'
import Transport from './ecvModal/Transport'

const Title = styled.h2``
export default function EcvModal() {
  const { ecv: open, setEcv: setOpen } = useContext(ModalContext)

  return (
    <Modal open={open} setOpen={setOpen}>
      <Title>Étapes du cycle de vie</Title>
      {[1, 2, 3, 4].includes(open) && <Standard />}
      {[5, 6, 7].includes(open) && <Transport />}
      {[30, 31, 32, 33, 34, 35].includes(open) && <Agribalyse />}
      {[
        ' . terminaux . construction',
        ' . terminaux . usage',
        ' . transmission',
        ' . data center',
        ' . data center . construction',
        ' . data center . usage',
      ].includes(open) && <Numerique />}
    </Modal>
  )
}
