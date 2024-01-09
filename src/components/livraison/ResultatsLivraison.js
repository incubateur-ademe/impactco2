import React from 'react'
import styled from 'styled-components'
import useLocalStorage from 'use-local-storage'
import useDataContext from 'components/providers/DataProvider'
import useModalContext from 'components/providers/ModalProvider'
import Button from 'components/base/buttons/Button'
import { default_eqs } from 'components/livraison/data'
import LivraisonEq from 'components/misc/tiles/LivraisonEq'
import ResultatLivraison from './ResultatLivraison'

export default function ResultatsLivraison(props) {
  const [eqvChosen] = useLocalStorage('ico2_eqv_chosen', default_eqs)
  const { equivalents } = useDataContext()

  const { setEqv } = useModalContext()

  const changeClicked = () => {
    setEqv('nonecheck')
  }

  const getEq = (indx) => {
    return equivalents.find((e) => e.slug === eqvChosen[indx])
  }

  const buildLivraisonEq = (indx) => {
    let eq = getEq(indx)
    if (eq) {
      return <LivraisonEq position={indx} equivalent={eq} weight={props.co2eq / 1000} nbCol={eqvChosen.length} />
    } else {
      return <></>
    }
  }

  return (
    <Wrapper>
      <ResultatLivraison co2eq={props.co2eq} />
      <UpperEq $nbCol={eqvChosen.length}>
        {buildLivraisonEq(0)}
        {buildLivraisonEq(1)}
        {buildLivraisonEq(2)}
        <ButtonContainer $nbCol={eqvChosen.length}>
          <Button priority='secondary' size='sm' onClick={changeClicked} id={`button_change_eq_${props.slug}`}>
            Modifier les équivalences
          </Button>
        </ButtonContainer>
      </UpperEq>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px solid #457be7;
  border-radius: 16px;
  display: grid;
  grid-template-columns: auto repeat(1, 1fr);
  margin-top: 1rem;
  ${(props) => props.theme.mq.small} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
`

const UpperEq = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.$nbCol === 3 ? 'repeat(3, auto)' : 'repeat(2, auto)')};
  grid-template-rows: 1.25fr 1fr;
  ${(props) => props.theme.mq.small} {
    grid-template-columns: ${(props) => (props.$nbCol === 3 ? '1fr' : 'repeat(2, 1fr)')};
    margin-top: 1.5rem;
  }
`

const ButtonContainer = styled.div`
  align-items: center;
  border-top: 1px solid #eae5e8;
  display: flex;
  ${(props) => props.theme.mq.small} {
    grid-column: ${(props) => (props.$nbCol === 3 ? 'inherit' : 'span 2')};
  }
  grid-column: ${(props) => (props.$nbCol === 3 ? 'span 3' : 'span 2')};
  justify-content: flex-end;
  margin-left: 1rem;
  margin-right: 1rem;
  min-width: 220px;
`
