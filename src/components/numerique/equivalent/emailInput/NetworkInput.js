import React, { useContext } from 'react'
import styled from 'styled-components'

import RulesContext from 'components/numerique/RulesProvider'
import HorizontalRadio from 'components/base/HorizontalRadio'

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
    <Wrapper className={props.className}>
      <Label>Type de réseau</Label>
      <HorizontalRadio
        value={`'${
          engine.evaluate(props.name + ' . transmission . émetteur . réseau')
            .nodeValue
        }'`}
        onChange={(value) =>
          setSituation({
            [props.name + ' . transmission . émetteur . réseau']: value,
          })
        }
        options={[
          {
            value: `'fixe FR'`,
            label: `Wifi`,
          },
          {
            value: `'mobile FR'`,
            label: `4G`,
          },
        ]}
      />
    </Wrapper>
  )
}
