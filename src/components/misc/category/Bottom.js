import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'components/providers/ModalProvider'
import Button from 'components/base/Button'
import ButtonLink from 'components/base/ButtonLink'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Disclaimer = styled.p`
  max-width: 23rem;
  font-size: 0.875rem;
  text-align: center;
`
export default function Bottom(props) {
  const { setCo2e } = useContext(ModalContext)

  return (
    <Wrapper>
      <Disclaimer>
        Valeurs exprimées en {props.category.divider === 1 ? 'kg' : 'g'}{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>{' '}
        émis {props.category?.include}.
      </Disclaimer>
      <Button
        onClick={() => {
          alert('Bientôt disponible')
          window?._paq?.push([
            'trackEvent',
            'Interaction',
            'Comparer catégories',
            props.category.name.fr,
          ])
        }}
        hollow
      >
        Comparer toutes les catégories
      </Button>
    </Wrapper>
  )
}
