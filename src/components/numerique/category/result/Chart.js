import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'

import { formatNumber } from 'utils/formatters'
import RulesContext from 'components/numerique/RulesProvider'
import StackedChart from 'components/charts/StackedChart'
import Legend from 'components/charts/Legend'

const StyledStackedChart = styled(StackedChart)`
  margin: 0;
  height: 2.5rem;
`
export default function Chart(props) {
  const { engine, situation } = useContext(RulesContext)

  const emailTotal = useMemo(
    () =>
      (props.construction
        ? engine.evaluate('email').nodeValue
        : engine.evaluate('email').nodeValue -
          engine.evaluate('email . terminaux . construction').nodeValue) *
      props.numberEmails,
    [engine, situation, props.construction, props.numberEmails]
  )
  const streamingTotal = useMemo(
    () =>
      props.construction
        ? engine.evaluate('streaming').nodeValue
        : engine.evaluate('streaming').nodeValue -
          engine.evaluate('streaming . terminaux . construction').nodeValue,
    [engine, situation, props.construction]
  )
  const visioTotal = useMemo(
    () =>
      props.construction
        ? engine.evaluate('visio').nodeValue
        : engine.evaluate('visio').nodeValue -
          engine.evaluate('visio . terminaux . construction').nodeValue,
    [engine, situation, props.construction]
  )

  const items = [
    {
      id: 'emails',
      label: `<strong>Emails</strong> (${formatNumber(
        emailTotal
      )} g CO<sub>2</sub>e)`,
      value: emailTotal,
      color: '#6C8CC1',
    },
    {
      id: 'streaming',
      label: `<strong>Streaming</strong> (${formatNumber(
        streamingTotal
      )} g CO<sub>2</sub>e)`,
      value: streamingTotal,
      color: '#C25166',
    },
    {
      id: 'visio',
      label: `<strong>Visioconférence</strong> (${formatNumber(
        visioTotal
      )} g CO<sub>2</sub>e)`,
      value: visioTotal,
      color: '#3DC7AB',
    },
  ]
  return engine ? (
    <>
      <StyledStackedChart
        items={items}
        total={emailTotal + streamingTotal + visioTotal}
      />
      <Legend items={items} />
    </>
  ) : null
}
