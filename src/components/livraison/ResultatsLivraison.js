import React, { useState } from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import useParamContext from 'components/providers/ParamProvider'
import { computedEquivalents } from 'components/providers/equivalents'
import Button from 'components/base/buttons/Button'
import LivraisonEq from 'components/misc/tiles/LivraisonEq'
import EqModal from 'components/modals/EqModal'
import ResultatLivraison from './ResultatLivraison'

export default function ResultatsLivraison(props) {
  const {
    livraison: { equivalents: eqvChosen },
  } = useParamContext()

  const [openModal, setOpenModal] = useState(false)

  const getEq = (indx) => {
    return computedEquivalents.find((e) => e.slug === eqvChosen[indx])
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
      {openModal && <EqModal setOpen={setOpenModal} />}
      <ResultatLivraison co2eq={props.co2eq} />
      <UpperEq $nbCol={eqvChosen.length}>
        {buildLivraisonEq(0)}
        {buildLivraisonEq(1)}
        {buildLivraisonEq(2)}
        <ButtonContainer $nbCol={eqvChosen.length}>
          <Button
            priority='secondary'
            size='sm'
            onClick={() => setOpenModal(true)}
            id={`button_change_eq_${props.slug}`}>
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
  ${MEDIA.LT.SMALL} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
`

const UpperEq = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.$nbCol === 3 ? 'repeat(3, auto)' : 'repeat(2, auto)')};
  grid-template-rows: 1.25fr 1fr;
  ${MEDIA.LT.SMALL} {
    grid-template-columns: ${(props) => (props.$nbCol === 3 ? '1fr' : 'repeat(2, 1fr)')};
    margin-top: 1.5rem;
  }
`

const ButtonContainer = styled.div`
  align-items: center;
  border-top: 1px solid #eae5e8;
  display: flex;
  ${MEDIA.LT.SMALL} {
    grid-column: ${(props) => (props.$nbCol === 3 ? 'inherit' : 'span 2')};
  }
  grid-column: ${(props) => (props.$nbCol === 3 ? 'span 3' : 'span 2')};
  justify-content: flex-end;
  margin-left: 1rem;
  margin-right: 1rem;
  min-width: 220px;
`
