import React from 'react'
import styled from 'styled-components'

import Emoji from 'components/base/Emoji'
import Checkbox from './mosaicItem/Checkbox'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: calc(33.3333% - 1rem);
  padding: 1.125rem 0.25rem;
  font-size: 1.25rem;
  background-color: ${(props) => props.theme.colors.textLight};
  border-radius: 1rem;
  cursor: pointer;

  ${(props) => props.theme.mq.medium} {
    width: calc(33.3333% - 0.5rem);
  }
  ${(props) => props.theme.mq.small} {
    width: calc(50% - 0.375rem);
    font-size: 1.125rem;
  }
`
const Label = styled.p`
  margin-bottom: 1rem;
  text-align: center;
`

export default function MosaicItem(props) {
  console.log(props.name, props.value)
  return (
    <Wrapper
      className={props.className}
      onClick={() => {
        console.log(props.value)
        props.onChange({ [props.rule.dottedName]: props.value ? 'non' : 'oui' })
      }}
    >
      <Label>
        <Emoji>{props.parent.rawNode['icônes']}</Emoji>
        <br />
        {props.parent.title}
      </Label>
      <Checkbox checked={props.value} />
    </Wrapper>
  )
}
