import React, { useContext } from 'react'
import styled from 'styled-components'

import RulesContext from 'components/numerique/RulesProvider'
import Select from 'components/base/Select'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: bold;
  text-align: center;
`
export default function DeviceInput(props) {
  const { engine, setSituation } = useContext(RulesContext)

  return (
    <Wrapper>
      <Label>Type de terminal</Label>
      <Select
        value={`'${engine.evaluate(props.name + ' . appareil').nodeValue}'`}
        onChange={({ value }) =>
          setSituation({ [props.name + ' . appareil']: value })
        }
      >
        <option value={`'moyenne'`}>Moyenne</option>
        <option value={`'smartphone'`}>📱 Smartphone</option>
        <option value={`'tablette'`}>📱 Tablette</option>
        <option value={`'ordinateur portable'`}>💻 Ordinateur portable</option>
        <option value={`'ordinateur et écran'`}>🖥 Ordinateur fixe</option>
        <option value={`'TV'`}>📺 Télévision</option>
      </Select>
    </Wrapper>
  )
}
