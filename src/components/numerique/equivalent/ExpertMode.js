import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import RulesContext from '../RulesProvider'
import ButtonLink from 'components/base/ButtonLink'
import Question from './expertMode/Question'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 2rem 3rem;
  margin-top: 1rem;

  ${(props) => props.theme.mq.medium} {
    flex-direction: column;
  }
`
const StyledButtonLink = styled(ButtonLink)`
  font-size: 0.75rem;
`
export default function ExpertMode(props) {
  const { engine, setSituation } = useContext(RulesContext)

  const [open, setOpen] = useState(false)
  return (
    <>
      <StyledButtonLink onClick={() => setOpen((prevOpen) => !prevOpen)}>
        Voir plus d'options
      </StyledButtonLink>
      {open && (
        <Wrapper>
          {props.questions.map((question) => (
            <Question
              key={question.dottedName}
              rule={question}
              evaluation={engine.evaluate(question.dottedName)}
              value={engine.evaluate(question.dottedName).nodeValue}
              onChange={setSituation}
            />
          ))}
        </Wrapper>
      )}
    </>
  )
}
