import React, { useContext } from 'react'
import styled from 'styled-components'
import ModalContext from 'components/providers/ModalProvider'
import Button from 'components/base/Button'
import ButtonLink from 'components/base/ButtonLink'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`
const Disclaimer = styled.p`
  font-size: 0.875rem;
  max-width: 34rem;
  text-align: center;
`
export default function Bottom(props) {
  const { setCo2e } = useContext(ModalContext)

  return (
    <Wrapper>
      <Disclaimer data-testid='bottomText'>
        Valeurs exprimées en {props.category.divider === 1 ? 'kg' : 'g'}{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>{' '}
        émis {props.category?.include}
      </Disclaimer>
      <div data-testid='bottomButton'>
        <Button
          className={'noscreenshot'}
          to={props.iframe ? 'https://impactco2.fr/thematiques' : '/thematiques'}
          hollow>
          Voir toutes les thématiques
        </Button>
      </div>
    </Wrapper>
  )
}
