import React, { useContext } from 'react'

import RulesContext from 'components/numerique/RulesProvider'
import HorizontalRadio from 'components/base/HorizontalRadio'
import SliderWrapper from 'components/numerique/misc/SliderWrapper'

export default function DeviceInput(props) {
  const { engine, setSituation } = useContext(RulesContext)

  return (
    <SliderWrapper>
      <SliderWrapper.Label>
        Qualité de la {props.name === 'streaming' ? 'vidéo' : 'communication'}
      </SliderWrapper.Label>
      <HorizontalRadio
        name='quality'
        value={`'${engine.evaluate(props.name + ' . qualité').nodeValue}'`}
        onChange={(value) =>
          setSituation({ [props.name + ' . qualité']: value })
        }
        options={
          props.name === 'streaming'
            ? [
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
              ]
            : [
                {
                  value: `'audio'`,
                  label: `Audio`,
                },
                {
                  value: `'SD'`,
                  label: `SD`,
                },
                {
                  value: `'HD'`,
                  label: `HD`,
                },
              ]
        }
      />
    </SliderWrapper>
  )
}
