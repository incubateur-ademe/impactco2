import React, { useContext } from 'react'
import styled from 'styled-components'

import RulesContext from 'utils/RulesContext'
import MosaicItem from './mosaicInput/MosaicItem'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  ${(props) => props.theme.mq.medium} {
    gap: 0.75rem;
  }
`
export default function MosaicInput(props) {
  const { engine } = useContext(RulesContext)

  return (
    <Wrapper>
      {props.rule.questions.map((question) => (
        <MosaicItem
          name={question.dottedName}
          parent={engine.getRule(question.dottedName.replace(' . présent', ''))}
          rule={question}
          evaluation={engine.evaluate(question.dottedName)}
          value={engine.evaluate(question.dottedName).nodeValue}
          onChange={props.onChange}
        />
      ))}
    </Wrapper>
  )
}
