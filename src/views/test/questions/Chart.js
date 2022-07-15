import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'

import { Flipper, Flipped } from 'react-flip-toolkit'

import RulesContext from 'utils/RulesContext'
import Equivalent from './chart/Equivalent'

const StyledFlipper = styled(Flipper)`
  margin-bottom: 1.5rem;
`
export default function Chart(props) {
  const { engine } = useContext(RulesContext)

  const repas = useMemo(
    () =>
      props.rule?.questions
        ?.map((question) =>
          engine.getRule(question.dottedName.replace(' . nombre', ''))
        )
        .map((question) => ({
          id: question.dottedName,
          emoji: question.rawNode['icônes'],
          title: question.title,
          total: engine.evaluate(question.dottedName).nodeValue * 52,
        }))
        .filter((question) => question.total)
        .sort((a, b) => (a.total < b.total ? 1 : -1)),
    [props.rule, engine]
  )

  return (
    repas && (
      <StyledFlipper flipKey={repas.map((item) => item.id).join()}>
        {repas.map((item) => (
          <Flipped flipId={item.id} key={item.id}>
            <Equivalent equivalent={item} max={repas[0].total} />
          </Flipped>
        ))}
      </StyledFlipper>
    )
  )
}
