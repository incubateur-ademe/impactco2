import React, { useContext } from 'react'
import styled from 'styled-components'

import RulesContext from 'utils/RulesContext'
import MosaicNumberItem from './mosaicNumberInput/MosaicNumberItem'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  ${(props) => props.theme.mq.medium} {
    gap: 0.75rem;
  }
`
export default function MosaicNumberInput(props) {
  const { engine } = useContext(RulesContext)

  return (
    <Wrapper>
      {props.rule.questions.map((question) => (
        <MosaicNumberItem
          name={question.dottedName}
          parent={engine.getRule(question.dottedName.replace(' . nombre', ''))}
          rule={question}
          evaluation={engine.evaluate(question.dottedName)}
          value={engine.evaluate(question.dottedName).nodeValue}
          onChange={props.onChange}
        />
      ))}
    </Wrapper>
  )
}
