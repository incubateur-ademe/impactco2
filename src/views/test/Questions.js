import React, { useContext } from 'react'
import styled from 'styled-components'

import RulesContext from 'utils/RulesContext'
import Progress from './questions/Progress'
import Label from './questions/Label'
import Suggestions from './questions/Suggestions'
import Question from './questions/Question'
import Navigation from './questions/Navigation'
import Visualization from './questions/Visualization'
import Description from './questions/Description'
import Chart from './questions/Chart'

const Wrapper = styled.form`
  position: relative;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  overflow: hidden;
`
export default function Questions(props) {
  const {
    engine,
    questionsOfCategory: questions,
    curQuestion,
    setCurQuestion,
    setSituation,
  } = useContext(RulesContext)

  return (
    <>
      <Wrapper
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Progress
          questions={questions}
          curQuestion={curQuestion}
          setCurQuestion={setCurQuestion}
        />
        <Label rule={questions[curQuestion][1]} />
        <Suggestions
          rule={questions[curQuestion][1]}
          evaluation={engine.evaluate(questions[curQuestion][1].dottedName)}
          onChange={setSituation}
        />
        <Question
          name={questions[curQuestion][0]}
          rule={questions[curQuestion][1]}
          evaluation={engine.evaluate(questions[curQuestion][1].dottedName)}
          value={
            engine.evaluate(questions[curQuestion][1].dottedName).nodeValue
          }
          onChange={setSituation}
        />
        <Navigation
          curQuestion={curQuestion}
          gotoNextQuestion={() =>
            curQuestion + 1 < questions.length
              ? setCurQuestion((prevCurQuestion) => prevCurQuestion + 1)
              : props.setStatus('completed')
          }
          gotoPrevQuestion={() =>
            setCurQuestion((prevCurQuestion) => prevCurQuestion - 1)
          }
        />
      </Wrapper>
      <Chart rule={questions[curQuestion][1]} />
      <Description rule={questions[curQuestion][1]} />
      <Visualization rule={questions[curQuestion][1]} />
    </>
  )
}
