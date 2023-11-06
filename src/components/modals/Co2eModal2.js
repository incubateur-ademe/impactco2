import React, { useContext } from 'react'
import styled from 'styled-components'
import ModalContext from 'components/providers/ModalProvider'
import Modal2 from 'components/base/Modal2'
import ExplainArrowContainer from 'components/modals/ExplainArrowContainer.js'

const getTitle = () => {
  return (
    <Title>
      Comprendre{' '}
      <GreenText>
        l&apos;équivalent CO<sub>2</sub> (CO<sub>2</sub>e)
      </GreenText>
    </Title>
  )
}

export default function Co2eModal2() {
  const { Co2e: open, setCo2e: setOpen } = useContext(ModalContext)
  return (
    <Modal2 open={open} setOpen={setOpen} getTitle={getTitle} width='50rem'>
      <Text>
        Le dérèglement climatique actuel est une conséquence de nos émissions importantes de différents gaz à effet de
        serre. Nous pouvons mesurer ces émissions avec un indice simple : les kilogrammes d&apos;équivalent CO
        <sub>2</sub> (kgCO<sub>2</sub>e).
      </Text>
      <Text>
        <strong>
          Chaque gaz à effet de serre est ramené à un équivalent en CO
          <sub>2</sub> selon son pouvoir de réchauffement.
        </strong>
      </Text>
      <ExplainArrowContainer></ExplainArrowContainer>
    </Modal2>
  )
}

const GreenText = styled.span`
  color: #1c9b93;
`

const Title = styled.h2`
  margin: 1rem 0;
`

const Text = styled.p`
  margin-bottom: 2rem;
  margin-top: 0;
`
