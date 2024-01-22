import styled from 'styled-components'
import HorizontalRadio from 'components/base/HorizontalRadio'
import { SliderWrapper, SliderWrapperLabel } from 'components/numerique/misc/SliderWrapper'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
export default function DeviceInput(props) {
  return (
    <Wrapper>
      <SliderWrapper>
        <SliderWrapperLabel>Type de réseau</SliderWrapperLabel>
        <HorizontalRadio
          name='network'
          value={`'${props.engine.evaluate(props.name + ' . transmission . réseau').nodeValue}'`}
          onChange={(value) => props.setSituation({ [props.name + ' . transmission . réseau']: value })}
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
      </SliderWrapper>
    </Wrapper>
  )
}
