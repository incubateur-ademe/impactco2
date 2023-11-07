import React, { useState } from 'react'
import styled from 'styled-components'
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
    window?.please?.track(['trackEvent', 'Interaction', 'Select', `livraison_Frequency_${e.uid}`])
    setMultiplicator(e.mult)
    setUid(e.uid)
  }

  const changeNumber = (number) => {
    window?.please?.track(['trackEvent', 'Interaction', 'Select', `livraison_Number_${number}`])
    setNumber(number)
  }

  return (
    <Wrapper>
      <FlexText>
        <Induction data-testid='induction'>
          <InductionIntro>
            <span>Si je commande&nbsp;</span>
            <SelectNumber changeNumber={changeNumber} value={number} />
            <Colis>&nbsp;colis&nbsp;</Colis>
          </InductionIntro>
          <InductionOutro>
            <strong>par</strong>
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
  color: ${(props) => props.theme.colors.textGray};
  font-size: 0.85rem;
  font-style: italic;
  margin-top: 0.8rem;
`

const Wrapper = styled.div``

const FlexText = styled.div`
  display: flex;
  flex-direction: row;
  ${(props) => props.theme.mq.large} {
    flex-direction: column;
  }
  font-size: 1rem;
  margin-top: 1rem;
  text-align: left;
`

const Color = styled.span`
  color: #457be7;
  font-weight: bold;
`

const Deduction = styled.div``

const Induction = styled.div`
  display: flex;
  ${(props) => props.theme.mq.small} {
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
  ${(props) => props.theme.mq.small} {
    margin-left: -11px;
  }
`
