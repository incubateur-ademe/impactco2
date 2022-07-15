import React, { useState, useMemo } from 'react'
import Engine from 'publicodes'

import RulesContext from 'utils/RulesContext'
import useSituation from 'hooks/useSituation'
import rules from 'data/rules.json'
import mosaics from 'data/mosaics.json'

export default function RulesProvider(props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const engine = useMemo(() => new Engine(rules), [rules])

  const { situation, setSituation } = useSituation(engine)

  const missingVariables = engine.evaluate('bilan').missingVariables

  const categories = useMemo(
    () => [
      engine.getRule('alimentation'),
      engine.getRule('transport'),
      engine.getRule('logement'),
      engine.getRule('divers'),
      engine.getRule('numérique'),
    ],
    [engine]
  )
  const [curCategory, setCurCategory] = useState(null)

  const questions = useMemo(
    () =>
      Object.entries(engine.parsedRules)
        .filter((rule) => rule[1].rawNode.question !== undefined)
        .filter(
          (question) =>
            !mosaics.find((mosaic) =>
              mosaic.questions.find((dottedName) => dottedName === question[0])
            )
        )
        .filter(
          (question) =>
            missingVariables[question[0]] ||
            (situation && situation[question[0]]) ||
            situation[question[0]] === 0
        ),
    [engine, missingVariables, situation]
  )
  const [curQuestion, setCurQuestion] = useState(0)

  const questionsOfCategory = useMemo(
    () => [
      ...mosaics
        .filter((mosaic) =>
          mosaic.dottedName.split('.')[0].includes(curCategory?.dottedName)
        )
        .map((mosaic) => [
          mosaic.dottedName,
          {
            ...mosaic,
            questions: mosaic.questions.map((question) =>
              engine.getRule(question)
            ),
          },
        ]),
      ...questions.filter((question) =>
        question[0].split('.')[0].includes(curCategory?.dottedName)
      ),
    ],
    [engine, questions, curCategory]
  )
  return (
    <RulesContext.Provider
      value={{
        engine,
        categories,
        curCategory,
        setCurCategory: (category) => {
          setCurCategory(category)
          setCurQuestion(0)
        },
        questions,
        questionsOfCategory,
        setSituation,
        curQuestion,
        setCurQuestion,
      }}
    >
      {props.children}
    </RulesContext.Provider>
  )
}
