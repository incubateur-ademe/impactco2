import React from 'react'
import { Icon } from 'components/osezchanger/icons'
import { Check, Checkbox, Container, Input, InputContainer, InputSuffix } from './CustomParam.styles'

const configs: Record<string, { label: string; type: 'number' | 'text'; unit: string; min?: number; max?: number }> = {
  m2: { label: 'Afficher une surface personnalisée', type: 'number', unit: 'm²', min: 1 },
}

const CustomParam = ({
  slug,
  value,
  visible,
  setValue,
  setVisible,
}: {
  slug: string
  value: string
  visible: boolean
  setValue: (value: string) => void
  setVisible: (visbile: boolean) => void
}) => {
  const config = configs[slug]

  return (
    <Container>
      <Checkbox $checked={visible}>
        <input
          type='checkbox'
          checked={visible}
          onChange={(event) => setVisible(event.target.checked)}
          className={visible ? 'checked' : ''}
        />
        <span>{config.label}</span>
        {visible && (
          <Check>
            <Icon iconId='check' />
          </Check>
        )}
      </Checkbox>
      <InputContainer>
        <Input
          disabled={!visible}
          type={config.type}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          min={config.min}
          max={config.max}
        />
        <InputSuffix $disabled={!visible}>{config.unit}</InputSuffix>
      </InputContainer>
    </Container>
  )
}

export default CustomParam
