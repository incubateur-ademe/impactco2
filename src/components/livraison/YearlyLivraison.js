import React, { useState } from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import { HiddenLabel } from 'components/form/HiddenLabel'
import SelectFrequences from './SelectFrequences'
import SelectNumber from './SelectNumber'
import { frequences } from './data.js'
import { convertGramsToKilograms } from './utils'

export default function YearlyLivraison(props) {
  const defaultFrequence = frequences.find((f) => f.isDefault)
  const [multiplicator, setMultiplicator] = useState(defaultFrequence.mult)
  const [uid, setUid] = useState(defaultFrequence.uid)
  const [number, setNumber] = useState(1)

  const changeFrequence = (e) => {
    setMultiplicator(e.mult)
    setUid(e.uid)
  }

  const changeNumber = (number) => {
    setNumber(number)
  }

  return (
    <Wrapper>
      <FlexText>
        <Induction data-testid='induction'>
          <InductionIntro>
            <span>Si je commande&nbsp;</span>
            <HiddenLabel htmlFor='numbers'>Nombre de colis</HiddenLabel>
            <SelectNumber changeNumber={changeNumber} value={number} />
            <Colis>&nbsp;colis&nbsp;</Colis>
          </InductionIntro>
          <InductionOutro>
            <strong>par</strong>
            <HiddenLabel htmlFor='frequences'>Féquence des colis</HiddenLabel>
            <SelectFrequences changeFrequence={changeFrequence} value={uid} />
            <span>,&nbsp;</span>
          </InductionOutro>
        </Induction>
        <Deduction data-testid='deduction'>
          <span>alors l’impact carbone de mes livraisons est de&nbsp;</span>
          <Color id='kgCo2e' data-testid='kgCo2e'>
            {convertGramsToKilograms(props.co2eq * multiplicator * number)} kg CO<sub>2</sub>e
          </Color>
          <strong>&nbsp;par an*</strong>.
        </Deduction>
      </FlexText>
      <SmallText>* Le calcul se base sur les mêmes éléments renseignés dans le simulateur.</SmallText>
      <br />
    </Wrapper>
  )
}

const SmallText = styled.div`
  color: var(--neutral-50);
  font-size: 0.85rem;
  font-style: italic;
  margin-top: 0.8rem;
`

const Wrapper = styled.div``

const FlexText = styled.div`
  display: flex;
  flex-direction: row;
  ${MEDIA.LT.LARGE} {
    flex-direction: column;
  }
  font-size: 1rem;
  margin-top: 1rem;
  text-align: left;
`

const Color = styled.span`
  color: var(--secondary-50);
  font-weight: bold;
`

const Deduction = styled.div``

const Induction = styled.div`
  display: flex;
  ${MEDIA.LT.SMALL} {
    flex-direction: column;
  }
`

const InductionIntro = styled.div`
  display: flex;
`

const InductionOutro = styled.div`
  display: flex;
`

const Colis = styled.strong`
  margin-left: -5px;
  ${MEDIA.LT.SMALL} {
    margin-left: -11px;
  }
`
