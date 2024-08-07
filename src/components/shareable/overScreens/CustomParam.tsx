import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import React, { Dispatch, SetStateAction } from 'react'
import { track } from 'utils/matomo'
import { monthsOptions } from 'utils/months'
import { Point } from 'hooks/useItineraries'
import EquivalentIcon from 'components/base/EquivalentIcon'
import Checkbox from 'components/form/Checkbox'
import CheckboxInput from 'components/form/CheckboxInput'
import HiddenLabel from 'components/form/HiddenLabel'
import Input from 'components/form/Input'
import Select from 'components/form/Select'
import AddressInput from 'components/form/addresses/AddressInput'
import styles from './CustomParam.module.css'

const configs: Record<
  string,
  {
    inputLabel?: string
    type: 'number' | 'text' | 'select' | 'select-number' | 'boolean' | 'checkbox'
    unit?: string
    min?: number
    max?: number
    options?: { label: string; value: string | number }[]
    values?: string[]
  }
> = {
  m2: {
    type: 'number',
    unit: 'm²',
    min: 1,
    max: 1000,
    inputLabel: 'Surface',
  },
  km: {
    type: 'number',
    unit: 'km',
    min: 1,
    max: 10000,
    inputLabel: 'Distance',
  },
  roundTrip: {
    type: 'boolean',
    inputLabel: 'RoundTrip',
  },
  month: {
    type: 'select-number',
    options: monthsOptions,
    inputLabel: 'Mois',
  },
  display: {
    type: 'checkbox',
    values: ['simulator', 'graphic'],
    inputLabel: 'display',
  },
  theme: {
    type: 'select',
    options: [
      { value: 'default', label: 'clair' },
      { value: 'night', label: 'sombre' },
    ],
  },
  language: {
    type: 'select',
    options: [
      { value: 'fr', label: 'fr' },
      { value: 'en', label: 'en' },
    ],
  },
}

export type CustomParamValue =
  | {
      value: string | number | boolean
      setter: (value: string | number | boolean) => void
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
  const t = useTranslations('overscreen')
  if ('setter' in param) {
    const config = configs[slug]
    return (
      <div className={styles.container}>
        {config.type !== 'boolean' && config.type !== 'checkbox' && setVisible && (
          <CheckboxInput
            color='secondary'
            checked={visible}
            setChecked={setVisible}
            label={t(`${slug}.title`)}
            data-testid={`custom-param-${slug}-checkbox`}
          />
        )}
        <div className={classNames(styles.inputContainer, { [styles.fullWidth]: !setVisible })}>
          <HiddenLabel htmlFor={`${config.options ? 'text-select' : 'input'}-${slug}`}>{config.inputLabel}</HiddenLabel>
          {config.options ? (
            <Select
              padding='sm'
              label={setVisible ? '' : t(`${slug}.label`)}
              required
              inline={!setVisible}
              id={slug}
              disabled={!visible}
              value={param.value.toString()}
              onChange={(event) => {
                track(tracking, `Custom value ${slug}`, JSON.stringify(event.target.value))
                param.setter(config.type === 'select' ? event.target.value : Number(event.target.value))
              }}
              color='secondary'
              data-testid={`custom-param-${slug}-select`}>
              {config.options.map((option) => (
                <option value={option.value} key={option.value}>
                  {t(`${slug}.${option.label}`)}
                </option>
              ))}
            </Select>
          ) : config.type === 'boolean' ? (
            <CheckboxInput
              data-testid={`custom-param-${slug}-checkbox`}
              checked={param.value as boolean}
              setChecked={param.setter}
              label={t(`${slug}.title`)}
            />
          ) : config.type === 'checkbox' && config.values ? (
            <Checkbox label={t(`${slug}.title`)} id={slug} required>
              {config.values.map((value) => (
                <CheckboxInput
                  key={`${slug}.${value}`}
                  data-testid={`custom-param-${slug}-${value}-checkbox`}
                  checked={!param.value || param.value === value}
                  setChecked={(checked) => {
                    if (checked) {
                      param.setter(param.value ? '' : value)
                    } else {
                      param.setter(param.value ? '' : (config.values?.find((x) => x !== value) as string))
                    }
                  }}
                  label={t(`${slug}.${value}`)}
                />
              ))}
            </Checkbox>
          ) : (
            <Input
              id={slug}
              unit={config.unit}
              secondaryUnitStyle
              padding='sm'
              disabled={!visible}
              type={config.type}
              value={param.value as string | number}
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
              data-testid={`custom-param-${slug}-input`}
            />
          )}
        </div>
      </div>
    )
  }

  if ('start' in param) {
    return (
      <div className={styles.container}>
        {setVisible && (
          <CheckboxInput color='secondary' checked={visible} setChecked={setVisible} label={t(`${slug}.label`)} />
        )}
        <div className={styles.inputs}>
          <AddressInput
            id={`${slug}-start`}
            label={t(`${slug}.start`)}
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
            label={t(`${slug}.end`)}
            required
            disabled={!visible}
            color='secondary'
            place={param.end.value}
            setPlace={(place) => {
              track(tracking, `Custom value ${slug}`, typeof place === 'object' ? place.address : '')
              param.end.setter(place)
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {setVisible && (
        <CheckboxInput
          color='secondary'
          checked={visible}
          setChecked={setVisible}
          label={`${t(integration ? 'integrate' : 'share')} ${t(slug)}`}
          data-testid={`custom-param-${slug}-checkbox`}
        />
      )}
      <div className={styles.params}>
        {param.value.map(({ emoji, label }) => (
          <div className={styles.param} key={emoji}>
            <EquivalentIcon equivalent={{ slug: emoji }} height={0.75} />
            <span className='text-sm'>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomParam
