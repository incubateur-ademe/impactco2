import React, { useMemo } from 'react'
import styled from 'styled-components'

import RadioInput from './choicesInput/RadioInput'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`
export default function ChoicesInput(props) {
  const choices = useMemo(() => {
    if (props.rule.rawNode.formule) {
      if (props.rule.rawNode.formule['une possibilité']) {
        return props.rule.rawNode.formule['une possibilité'][
          'possibilités'
        ].map((choice) => ({
          value: `'${choice}'`,
          label: choice,
        }))
      }
      return []
    } else {
      return [
        {
          value: 'non',
          label: 'Non',
        },
        {
          value: 'oui',
          label: 'Oui',
        },
      ]
    }
  }, [props.rule])

  return (
    <Wrapper className={props.className}>
      {choices.map((choice) => (
        <RadioInput
          key={choice.value}
          id={props.rule.dottedName + choice.value}
          name={props.rule.dottedName}
          value={choice.value}
          label={choice.label}
          checked={
            props.evaluation.nodeValue === choice.value.replaceAll(`'`, '') ||
            (!props.evaluation.nodeValue && choice.value === 'non') ||
            (props.evaluation.nodeValue && choice.value === 'oui')
          }
          onChange={(e) => {
            props.onChange({ [props.rule.dottedName]: e.currentTarget.value })
          }}
        />
      ))}
    </Wrapper>
  )
}
