import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import { formatName, formatNumberFixed, formatTotal } from 'utils/formatters'
import DataContext from 'components/providers/DataProvider'
import Section from 'components/base/Section'
import StackedChart from 'components/charts/StackedChart'
import Legend from 'components/charts/Legend'

export const Title = styled.h3`
  font-weight: normal;
  text-align: center;
  margin-bottom: 2rem;

  span {
    font-size: 0.75em;
  }
`
export default function Ecv(props) {
  const { ecv } = useContext(DataContext)

  const [ecvToDisplay, setEcvToDisplay] = useState([])

  const [usage, setUsage] = useState(props.equivalent?.usage?.defaultyears || 0)

  useEffect(() => {
    if (props.equivalent?.ecv && ecv.length) {
      const tempEcvToDisplay = props.equivalent.ecv
        .map((item) => ({
          ...item,
          ...ecv.find((step) => step.id === item.id),
        }))
        .map((item) => ({
          ...item,
          label: item.name.fr,
        }))
      if (usage) {
        tempEcvToDisplay.push({
          color: '#adc4c5',
          id: 1000,
          value: props.equivalent.usage.peryear * usage,
          label: 'Usage',
        })
      }
      setEcvToDisplay(tempEcvToDisplay.sort((a, b) => (a.id > b.id ? 1 : -1)))
    }
  }, [props.equivalent, ecv, usage])

  return ecvToDisplay.length ? (
    <Section>
      <Section.Content>
        <StackedChart
          items={ecvToDisplay}
          total={formatTotal(props.equivalent, usage)}
        />
        <Legend items={ecvToDisplay} />
      </Section.Content>
    </Section>
  ) : null
}
