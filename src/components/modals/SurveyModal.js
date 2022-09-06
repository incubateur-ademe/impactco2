import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'components/providers/ModalProvider'
import Modal from 'components/base/Modal'

const StyledModal = styled(Modal)`
  padding: 0;
`
export default function SurveyModal() {
  const { survey: open, setSurvey: setOpen } = useContext(ModalContext)

  return <StyledModal open={open} setOpen={setOpen}></StyledModal>
}
