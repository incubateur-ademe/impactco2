import React, { Dispatch, SetStateAction } from 'react'
import { track } from 'utils/matomo'
import { monthsOptions } from 'utils/months'
import { Point } from 'hooks/useItineraries'
import Emoji from 'components/base/Emoji'
import AddressInput from 'components/form/AddressInput'
import CheckboxInput from 'components/form/CheckboxInput'
import { HiddenLabel } from 'components/form/HiddenLabel'
import Select from 'components/form/Select'
import { Container, InputContainer, InputSuffix, Inputs, Param, Params, StyledInput } from './CustomParam.styles'

const configs: Record<
  string,
  {
    label: string
    inputLabel: string
    type: 'number' | 'text' | 'select'
    unit?: string
    min?: number
    max?: number
    options?: { label: string; value: string | number }[]
  }
> = {
  m2: {
    label: 'Afficher une surface personnalisée',
    type: 'number',
    unit: 'm²',
    min: 1,
    max: 1000,
    inputLabel: 'Surface',
  },
  km: {
    label: 'Afficher une distance personnalisée',
    type: 'number',
    unit: 'km',
    min: 1,
    max: 10000,
    inputLabel: 'Distance',
  },
  month: {
    label: 'Personnaliser le mois à afficher',
    type: 'select',
    options: monthsOptions,
    inputLabel: 'Mois',
  },
  theme: {
    label: "Mode d'affichage",
    type: 'select',
    options: [
      { value: 'default', label: 'Clair' },
      { value: 'night', label: 'Sombre' },
    ],
    inputLabel: 'Mois',
  },
}

const arrayConfigs: Record<string, string> = {
  situation: '[ACTION] ma propre simulation',
  comparateur: '[ACTION] ma propre comparaison',
}

const addressConfigs: Record<string, { label: string; start: string; end: string }> = {
  itineraire: { label: "Personnaliser l'itinéraire", start: 'Départ', end: 'Arrivée' },
  teletravail: { label: 'Personnaliser les adresses', start: 'Domicile', end: 'Bureau' },
}

export type CustomParamValue =
  | {
      value: string | number
      setter: (value: string | number) => void
    }
  | {
      start: { value: string; setter: Dispatch<SetStateAction<Point | undefined>> }
      end: { value: string; setter: Dispatch<SetStateAction<Point | undefined>> }
    }
  | { value: { emoji: string; label: string }[]; params: string }

const CustomParam = ({
  tracking,
  slug,
  param,
  visible,
  setVisible,
  integration,
}: {
  tracking: string
  slug: string
  param: CustomParamValue
  visible: boolean
  setVisible?: (visbile: boolean) => void
  integration?: boolean
}) => {
  if ('setter' in param) {
    const config = configs[slug]
    return (
      <Container>
        {setVisible && (
          <CheckboxInput
            color='secondary'
            checked={visible}
            setChecked={setVisible}
            label={config.label.replace('[ACTION]', integration ? 'Intégrer' : 'Partager')}
            data-testid={`custom-param-${slug}-checkbox`}
          />
        )}
        <InputContainer $fullWidth={!setVisible}>
          <HiddenLabel htmlFor={`${config.options ? 'text-select' : 'input'}-${slug}`}>{config.inputLabel}</HiddenLabel>
          {config.options ? (
            <Select
              label={setVisible ? '' : config.label}
              required
              inline={!setVisible}
              id={slug}
              disabled={!visible}
              value={param.value}
              onChange={(event) => {
                track(tracking, `Custom value ${slug}`, JSON.stringify(event.target.value))
                param.setter(event.target.value)
              }}
              color='secondary'
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
              value={param.value}
              onChange={(event) => {
                track(tracking, `Custom value ${slug}`, JSON.stringify(event.target.value))
                if (config.type === 'number') {
                  const value = Number(event.target.value)
                  if (config.min && value < config.min) {
                    param.setter(config.min)
                    return
                  }
                  if (config.max && value > config.max) {
                    param.setter(config.max)
                    return
                  }
                  param.setter(value)
                  return
                }
                param.setter(event.target.value)
              }}
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

  if ('start' in param) {
    const config = addressConfigs[slug]
    return (
      <Container>
        {setVisible && (
          <CheckboxInput
            color='secondary'
            checked={visible}
            setChecked={setVisible}
            label={config.label.replace('[ACTION]', integration ? 'Intégrer' : 'Partager')}
          />
        )}
        <Inputs>
          <AddressInput
            id={`${slug}-start`}
            label={config.start}
            required
            disabled={!visible}
            color='secondary'
            place={param.start.value}
            setPlace={(place) => {
              track(tracking, `Custom value ${slug}`, typeof place === 'object' ? place.address : '')
              param.start.setter(place)
            }}
          />
          <AddressInput
            id={`${slug}-end`}
            label={config.end}
            required
            disabled={!visible}
            color='secondary'
            place={param.end.value}
            setPlace={(place) => {
              track(tracking, `Custom value ${slug}`, typeof place === 'object' ? place.address : '')
              param.end.setter(place)
            }}
          />
        </Inputs>
      </Container>
    )
  }

  const config = arrayConfigs[slug]
  return (
    <Container>
      {setVisible && (
        <CheckboxInput
          color='secondary'
          checked={visible}
          setChecked={setVisible}
          label={config.replace('[ACTION]', integration ? 'Intégrer' : 'Partager')}
          data-testid={`custom-param-${slug}-checkbox`}
        />
      )}
      <Params>
        {param.value.map(({ emoji, label }) => (
          <Param key={emoji}>
            <Emoji height='0.75rem'>{emoji}</Emoji> <span className='text-sm'>{label}</span>
          </Param>
        ))}
      </Params>
    </Container>
  )
}

export default CustomParam
