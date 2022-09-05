import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import TransportContext from '../TransportProvider'
import Modal from 'components/base/Modal'
import Button from 'components/base/Button'
import TextInput from 'components/base/TextInput'
import MagicLink from 'components/base/MagicLink'

const Title = styled.h2``
const Text = styled.p``
const StyledTextInput = styled(TextInput)`
  display: inline-block;
  width: 4.5rem;
  margin: 0;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`
export default function SetFootprintModal() {
  const {
    yearlyFootprint,
    setYearlyFootprint,
    footprintModal: open,
    setFootprintModal: setOpen,
  } = useContext(TransportContext)

  const [pristine, setPristine] = useState(true)
  useEffect(() => {
    setPristine(true)
  }, [open])
  return (
    <Modal open={open} setOpen={setOpen}>
      <Title>Mon empreinte carbone</Title>
      <Text>
        Aujourd&apos;hui, un·e français·e en émet en moyenne 9,9 tonnes de gaz à
        effet de serre (GES) par an (
        <MagicLink to='https://www.statistiques.developpement-durable.gouv.fr/estimation-de-lempreinte-carbone-de-1995-2019'>
          source
        </MagicLink>
        ).
      </Text>
      <Text>
        La cible à atteindre pour{' '}
        <MagicLink
          to={
            'https://datagir.ademe.fr/blog/budget-empreinte-carbone-c-est-quoi/'
          }
        >
          respecter l&apos;accord de Paris
        </MagicLink>{' '}
        est de moins de 2 tonnes de GES par an et par personne d&apos;ici 2050.
      </Text>
      <Text>
        Si vous ne la connaissez pas encore votre empreinte carbone, vous pouvez
        la calculer simplement grâce à notre simulateur{' '}
        <MagicLink to={`https://nosgestesclimat.fr/`}>
          Nos Gestes Climat
        </MagicLink>
      </Text>
      {!pristine && (
        <ButtonWrapper>
          <Button onClick={() => setOpen(false)}>Valider</Button>
        </ButtonWrapper>
      )}
    </Modal>
  )
}
