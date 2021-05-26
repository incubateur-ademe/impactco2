import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'utils/ModalContext'
import Modal from 'components/base/Modal'

const Title = styled.h2``
const Text = styled.p`
  line-height: 1.6;
`
const Svg = styled.svg`
  vertical-align: bottom;
`
export default function InstallInstructionsModal() {
  const { installInstructions, setInstallInstructions } =
    useContext(ModalContext)
  return (
    <Modal open={installInstructions} setOpen={setInstallInstructions}>
      <Title>Installer l'application</Title>
      <Text>
        Pour installer cette application sur votre iPhone, appuyez sur{' '}
        <Svg width='20' height='24' viewBox='0 0 20 24'>
          <path
            d='M10 15.3857C10.4409 15.3857 10.8101 15.0166 10.8101 14.5859V4.05518L10.7485 2.51709L11.4355 3.24512L12.9941 4.90625C13.1377 5.07031 13.353 5.15234 13.5479 5.15234C13.9683 5.15234 14.2964 4.84473 14.2964 4.42432C14.2964 4.20898 14.2041 4.04492 14.0503 3.89111L10.5845 0.54834C10.3794 0.343262 10.2051 0.271484 10 0.271484C9.78467 0.271484 9.61035 0.343262 9.40527 0.54834L5.93945 3.89111C5.78564 4.04492 5.69336 4.20898 5.69336 4.42432C5.69336 4.84473 6.00098 5.15234 6.43164 5.15234C6.62646 5.15234 6.85205 5.07031 6.99561 4.90625L8.5542 3.24512L9.24121 2.51709L9.17969 4.05518V14.5859C9.17969 15.0166 9.55908 15.3857 10 15.3857ZM4.11426 23.4146H15.8755C18.0186 23.4146 19.0952 22.3481 19.0952 20.2358V10.0024C19.0952 7.89014 18.0186 6.82373 15.8755 6.82373H13.0146V8.47461H15.8447C16.8599 8.47461 17.4443 9.02832 17.4443 10.0947V20.1436C17.4443 21.21 16.8599 21.7637 15.8447 21.7637H4.13477C3.10938 21.7637 2.54541 21.21 2.54541 20.1436V10.0947C2.54541 9.02832 3.10938 8.47461 4.13477 8.47461H6.9751V6.82373H4.11426C1.97119 6.82373 0.894531 7.89014 0.894531 10.0024V20.2358C0.894531 22.3481 1.97119 23.4146 4.11426 23.4146Z'
            fill='#2E7CF6'
          />
        </Svg>{' '}
        puis sur "Sur l'écran d'accueil".
      </Text>
    </Modal>
  )
}
