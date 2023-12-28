import React from 'react'
import { monthsOptions } from 'utils/months'
import Emoji from 'components/base/Emoji'
import CheckboxInput from 'components/form/CheckboxInput'
import Input from 'components/form/Input'
import Select from 'components/form/Select'
import { Container, InputContainer, InputSuffix, Inputs, Param, Params, StyledInput } from './CustomParam.styles'

const configs: Record<
  string,
  {
    label: string
    type: 'number' | 'text' | 'select'
    unit?: string
    min?: number
    max?: number
    options?: { label: string; value: string | number }[]
  }
> = {
  m2: { label: 'Afficher une surface personnalisée', type: 'number', unit: 'm²', min: 1 },
  km: { label: 'Afficher une distance personnalisée', type: 'number', unit: 'km', min: 1 },
  month: { label: 'Personnaliser le mois à afficher', type: 'select', options: monthsOptions },
}

const arrayConfigs: Record<string, string> = {
  situation: 'Partager ma propre simulation',
}

const addressConfigs: Record<string, { label: string; start: string; end: string }> = {
  itineraire: { label: "Personnaliser l'itinéraire", start: 'Départ', end: 'Arrivée' },
  teletravail: { label: 'Personnaliser les adresses', start: 'Domicile', end: 'Bureau' },
}

export type CustomParamValue =
  | string
  | { start: string; end: string }
  | { value: { emoji: string; label: string }[]; params: string }
export type CustomParamType = { value: CustomParamValue; visible: boolean }

const CustomParam = ({
  slug,
  value,
  visible,
  setValue,
  setVisible,
}: {
  slug: string
  value: CustomParamValue
  visible: boolean
  setValue: (value: CustomParamValue) => void
  setVisible: (visbile: boolean) => void
}) => {
  if (typeof value === 'string') {
    const config = configs[slug]
    return (
      <Container>
        <CheckboxInput
          checked={visible}
          setChecked={setVisible}
          label={config.label}
          data-testid={`custom-param-${slug}-checkbox`}
        />
        <InputContainer>
          {config.options ? (
            <Select
              id={slug}
              disabled={!visible}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              color='secondary'
              maxWidth='100px'
              data-testid={`custom-param-${slug}-select`}>
              {config.options.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          ) : (
            <StyledInput
              id={slug}
              disabled={!visible}
              type={config.type}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              min={config.min}
              max={config.max}
              color='secondary'
              maxWidth='100px'
              data-testid={`custom-param-${slug}-input`}
            />
          )}
          <InputSuffix $disabled={!visible}>{config.unit}</InputSuffix>
        </InputContainer>
      </Container>
    )
  }

  if ('start' in value) {
    const config = addressConfigs[slug]
    return (
      <Container>
        <CheckboxInput checked={visible} setChecked={setVisible} label={config.label} />
        <Inputs>
          <Input
            id={`${slug}-start`}
            value={value.start}
            label={config.start}
            required
            disabled={!visible}
            color='secondary'
            onChange={(e) => setValue({ ...value, start: e.target.value })}
          />
          <Input
            id={`${slug}-end`}
            value={value.end}
            label={config.end}
            required
            disabled={!visible}
            color='secondary'
            onChange={(e) => setValue({ ...value, end: e.target.value })}
          />
        </Inputs>
      </Container>
    )
  }

  const config = arrayConfigs[slug]
  return (
    <Container>
      <CheckboxInput
        checked={visible}
        setChecked={setVisible}
        label={config}
        data-testid={`custom-param-${slug}-checkbox`}
      />
      <Params>
        {value.value.map(({ emoji, label }) => (
          <Param key={emoji}>
            <Emoji height='0.75rem'>{emoji}</Emoji> <span className='text-sm'>{label}</span>
          </Param>
        ))}
      </Params>
    </Container>
  )
}

export default CustomParam
