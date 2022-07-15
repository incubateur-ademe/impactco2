import React, { useMemo } from 'react'

import MosaicNumberInput from './question/MosaicNumberInput'
import NumberInput from './question/NumberInput'
import ChoicesInput from './question/ChoicesInput'

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
      (props.rule.rawNode.type === 'booléen' ||
        props.rule.rawNode.type === undefined) &&
      typeof props.evaluation.nodeValue !== 'number'
    ) {
      return 'choices'
    }
    return 'number'
  }, [props.evaluation, props.rule])

  console.log(props.rule.dottedName)

  return type === 'mosaicnumber' ? (
    <MosaicNumberInput
      rule={props.rule}
      evaluation={props.evaluation}
      value={props.value || ''}
      onChange={props.onChange}
    />
  ) : type === 'choices' ? (
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
  )
}
