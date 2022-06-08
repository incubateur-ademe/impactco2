import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Flipper, Flipped } from 'react-flip-toolkit'

import { formatNumberFixed, formatTotal } from 'utils/formatters'
import DataContext from 'utils/DataContext'
import Section from 'components/base/Section'
import Button from 'components/base/Button'
import ScreenshotWrapper from 'components/misc/ScreenshotWrapper'
import Step from './ecv/Step'

export const Title = styled.h3`
  font-weight: normal;
  text-align: center;
  margin-bottom: 2rem;

  span {
    font-size: 0.75em;
  }
`
const StyledButtonWrapper = styled(Button.Wrapper)``
export default function Ecv(props) {
  const { ecv } = useContext(DataContext)

  const [usage, setUsage] = useState(false)
  const [end, setEnd] = useState(false)

  const [ecvToDisplay, setEcvToDisplay] = useState([])
  useEffect(() => {
    if (props.equivalent?.ecv && ecv.length) {
      const tempEcvToDisplay = props.equivalent.ecv.map((item) => ({
        ...item,
        ...ecv.find((step) => step.id === item.id),
      }))
      if (usage) {
        tempEcvToDisplay.push({
          color: '#ff00ff',
          id: 1000,
          value: props.equivalent.usage.peryear * usage,
        })
      }
      if (end) {
        tempEcvToDisplay.push({
          color: '#ffff00',
          id: 1001,
          name: {
            fr: `Fin de vie`,
          },
          value: props.equivalent.end,
        })
      }
      setEcvToDisplay(
        tempEcvToDisplay.sort((a, b) => (a.value < b.value ? 1 : -1))
      )
    }
  }, [props.equivalent, ecv, usage, end])

  return ecvToDisplay.length ? (
    <Section>
      <Section.Content>
        <ScreenshotWrapper equivalent={props.equivalent}>
          <Title>
            Détail de l'empreinte d'un smartphone (
            {formatNumberFixed(formatTotal(props.equivalent, usage, end))}{' '}
            <span>
              kgCO
              <sub>2</sub>e
            </span>
            )
          </Title>
          <Flipper flipKey={ecvToDisplay.map((step) => step.id).join()}>
            {ecvToDisplay.map((item) => (
              <Flipped flipId={item.id} key={item.id}>
                <Step
                  item={item}
                  equivalent={props.equivalent}
                  total={formatTotal(props.equivalent, usage, end)}
                  usage={usage}
                  setUsage={setUsage}
                />
              </Flipped>
            ))}
          </Flipper>

          <StyledButtonWrapper left className='noscreenshot'>
            <Button
              hollow
              small
              onClick={() =>
                setUsage((prevUsage) =>
                  prevUsage ? null : props.equivalent.usage.defaultyears
                )
              }
            >
              Ajouter l'usage
            </Button>
            <Button hollow small onClick={() => setEnd((prevEnd) => !prevEnd)}>
              Ajouter la fin de vie
            </Button>
          </StyledButtonWrapper>
        </ScreenshotWrapper>
      </Section.Content>
    </Section>
  ) : null
}
