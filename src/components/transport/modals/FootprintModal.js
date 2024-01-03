import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Modal from 'components/base/Modal'
import Button from 'components/base/buttons/Button'
import Link from 'components/base/buttons/Link'
import TransportContext from '../TransportProvider'

const Title = styled.h2``
const Text = styled.p``
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`
export default function SetFootprintModal() {
  const { footprintModal: open, setFootprintModal: setOpen } = useContext(TransportContext)

  const [pristine, setPristine] = useState(true)
  useEffect(() => {
    setPristine(true)
  }, [open])
  return (
    <Modal open={open} setOpen={setOpen}>
      <Title>Mon empreinte carbone</Title>
      <Text>
        Aujourd&apos;hui, un·e français·e en émet en moyenne 9,9 tonnes de gaz à effet de serre (GES) par an (
        <Link href='https://www.statistiques.developpement-durable.gouv.fr/estimation-de-lempreinte-carbone-de-1995-2019'>
          source
        </Link>
        ).
      </Text>
      <Text>
        La cible à atteindre pour{' '}
        <Link href={'https://datagir.ademe.fr/blog/budget-empreinte-carbone-c-est-quoi/'}>
          respecter l&apos;accord de Paris
        </Link>{' '}
        est de moins de 2 tonnes de GES par an et par personne d&apos;ici 2050.
      </Text>
      <Text>
        Si vous ne la connaissez pas encore votre empreinte carbone, vous pouvez la calculer simplement grâce à notre
        simulateur <Link href={`https://nosgestesclimat.fr/`}>Nos Gestes Climat</Link>
      </Text>
      {!pristine && (
        <ButtonWrapper>
          <Button onClick={() => setOpen(false)}>Valider</Button>
        </ButtonWrapper>
      )}
    </Modal>
  )
}
