import React, { useMemo } from 'react'
import styled from 'styled-components'
import ChoicesInput from './question/ChoicesInput'
import NumberInput from './question/NumberInput'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const Label = styled.p`
  margin-bottom: 0.5rem;
`
export default function Question(props) {
  const type = useMemo(() => {
    if (props.rule.rawNode.type === 'mosaic') {
      return 'mosaic'
    }
    if (props.rule.rawNode.type === 'mosaicnumber') {
      return 'mosaicnumber'
    }
    if (
      props.evaluation.unit === undefined &&
      (props.rule.rawNode.type === 'booléen' || props.rule.rawNode.type === undefined) &&
      typeof props.evaluation.nodeValue !== 'number'
    ) {
      return 'choices'
    }
    return 'number'
  }, [props.evaluation, props.rule])

  return (
    <Wrapper>
      <Label>{props.rule.title}</Label>
      {type === 'choices' ? (
        <ChoicesInput
          rule={props.rule}
          evaluation={props.evaluation}
          value={props.value || ''}
          onChange={props.onChange}
        />
      ) : (
        <NumberInput
          rule={props.rule}
          evaluation={props.evaluation}
          value={props.value || ''}
          onChange={props.onChange}
        />
      )}
    </Wrapper>
  )
}
