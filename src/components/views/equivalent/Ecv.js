import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import { formatName, formatNumberFixed, formatTotal } from 'utils/formatters'
import DataContext from 'components/providers/DataProvider'
import ModalContext from 'components/providers/ModalProvider'
import Section from 'components/base/Section'
import ScreenshotWrapper from 'components/misc/ScreenshotWrapper'
import StackedChart from 'components/charts/StackedChart'
import Legend from 'components/charts/Legend'
import DurationSelector from './ecv/DurationSelector'

export const Title = styled.h3`
  font-weight: normal;
  text-align: center;

  span {
    font-size: 0.75em;
  }
`
const StyledLegend = styled(Legend)``
export default function Ecv(props) {
  const { ecv } = useContext(DataContext)

  const { setEcv } = useContext(ModalContext)

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
          onClick: () => setEcv(true),
        }))
      if (usage) {
        tempEcvToDisplay.push({
          value: props.equivalent.usage.peryear * usage,
          ...ecv.find((step) => step.id === 8),
          label: ecv.find((step) => step.id === 8).name.fr,
          onClick: () => setEcv(true),
        })
      }
      setEcvToDisplay(tempEcvToDisplay.sort((a, b) => (a.id > b.id ? 1 : -1)))
    }
  }, [props.equivalent, ecv, setEcv, usage])

  return ecvToDisplay.length ? (
    <Section>
      <Section.Content>
        <ScreenshotWrapper equivalent={props.equivalent}>
          <Title>
            Détail de l&apos;empreinte de 1{' '}
            {props.equivalent.unit && <>{props.equivalent.unit.fr} </>}
            {formatName(props.equivalent.name.fr, 1)} (
            {formatNumberFixed(formatTotal(props.equivalent, usage))}{' '}
            <span>
              kgCO
              <sub>2</sub>e
            </span>
            )
          </Title>
          <StackedChart
            items={ecvToDisplay}
            total={formatTotal(props.equivalent, usage)}
          />
          <StyledLegend items={ecvToDisplay} />
          {usage ? (
            <DurationSelector duration={usage} setDuration={setUsage} />
          ) : null}
        </ScreenshotWrapper>
      </Section.Content>
    </Section>
  ) : null
}
