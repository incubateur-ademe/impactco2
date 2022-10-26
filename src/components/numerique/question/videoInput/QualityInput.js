import React, { useContext } from 'react'
import styled from 'styled-components'

import RulesContext from 'components/numerique/RulesProvider'
import HorizontalRadio from 'components/base/HorizontalRadio'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`
const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: bold;
  text-align: center;
`
export default function DeviceInput(props) {
  const { engine, setSituation } = useContext(RulesContext)
  console.log(engine.evaluate(props.name + ' . qualité').nodeValue)
  return (
    <Wrapper className={props.className}>
      <Label>Qualité de la vidéo</Label>
      <HorizontalRadio
        value={`'${engine.evaluate(props.name + ' . qualité').nodeValue}'`}
        onChange={(value) =>
          setSituation({ [props.name + ' . qualité']: value })
        }
        options={[
          {
            value: `'SD'`,
            label: `SD`,
          },
          {
            value: `'HD'`,
            label: `HD`,
          },
          {
            value: `'ultra HD'`,
            label: `4K`,
          },
        ]}
      />
    </Wrapper>
  )
}
