import React from 'react'
import HorizontalRadio from 'components/base/HorizontalRadio'
import { SliderWrapper, SliderWrapperLabel } from 'components/numerique/misc/SliderWrapper'

export default function QualityInput(props) {
  return (
    <SliderWrapper>
      <SliderWrapperLabel>Qualité de la {props.name === 'streaming' ? 'vidéo' : 'communication'}</SliderWrapperLabel>
      <HorizontalRadio
        name='quality'
        value={`'${props.engine.evaluate(props.name + ' . qualité').nodeValue}'`}
        onChange={(value) => props.setSituation({ [props.name + ' . qualité']: value })}
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
