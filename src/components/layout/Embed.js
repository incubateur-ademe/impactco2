import React, { useContext } from 'react'
import styled from 'styled-components'

import UXContext from 'utils/UXContext'
import Panel from 'components/base/Panel'
import Themes from './embed/Themes'
import Code from './embed/Code'
import ContactPrompt from 'components/base/ContactPrompt'
import Select from 'components/base/FancySelect'

const Title = styled.div`
  margin-bottom: 1rem;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.text};
  font-weight: bold;
  line-height: 1.2;

  ${(props) => props.theme.mq.small} {
    font-size: 1.5rem;
  }
`
export default function Embed(props) {
  const { embedOpen, setEmbedOpen, typeShare, setTypeShare } =
    useContext(UXContext)

  return (
    <Panel
      small={props.small}
      open={embedOpen}
      toggleClose={() => {
        setEmbedOpen((prevOpen) => !prevOpen)
      }}
      index={0}
    >
      <Title>
        Intégrer{' '}
        <Select
          fancy
          value={typeShare}
          onChange={setTypeShare}
          options={[
            { value: 'simulator', label: `ce simulateur` },
            { value: 'result', label: `cette fiche`, disabled: !props.result },
          ]}
        />
      </Title>
      <Code id={props.id} typeShare={typeShare} />
      {props.children && (
        <>
          <h3>Options d'intégration</h3>
          {props.children}
        </>
      )}
      <Themes />
      <ContactPrompt configurator />
    </Panel>
  )
}
