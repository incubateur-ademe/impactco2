import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Flipper, Flipped } from 'react-flip-toolkit'

import { formatTotal } from 'utils/formatters'
import DataContext from 'utils/DataContext'
import Section from 'components/base/Section'
import Button from 'components/base/Button'
import VisualizationWrapper from './visualization/VisualizationWrapper'
import DurationSelector from './ecv/DurationSelector'
import Graph from './ecv/Graph'

const Wrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.background};
`
const Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;
`
const Content = styled.div`
  position: relative;
  padding: 1.5rem;
`
const Title = styled.h2``
const Text = styled.p``
const Total = styled.div``
const Number = styled.span`
  font-size: 3.75rem;
  font-weight: bold;

  ${(props) => props.theme.mq.small} {
    font-size: 2rem;
  }
`
const Unit = styled.span`
  font-size: 1rem;

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`
const Big = styled.span`
  font-size: 1.25rem;

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
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
          name: {
            fr: `Usage<br/>(pendant ${usage} ans)`,
          },
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
        <Title>Détail de l'empreinte</Title>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et sem
          dictum, ultricies nibh vel, lobortis nisi. Phasellus sed posuere diam.
          Proin volutpat sollicitudin cursus. Nam suscipit at arcu malesuada
          eleifend. Duis egestas pharetra urna et scelerisque.
        </Text>
        <VisualizationWrapper equivalent={props.equivalent} fixed>
          <Flipper flipKey={ecvToDisplay.map((step) => step.id).join()}>
            {ecvToDisplay.map((item) => (
              <Flipped flipId={item.id} key={item.id}>
                <Graph
                  item={item}
                  equivalent={props.equivalent}
                  total={formatTotal(props.equivalent, usage, end)}
                />
              </Flipped>
            ))}
          </Flipper>
          {usage && (
            <DurationSelector duration={usage} setDuration={setUsage} />
          )}
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
        </VisualizationWrapper>
      </Section.Content>
    </Section>
  ) : null
}
