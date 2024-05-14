'use client'

import { SetStateAction } from 'preact/compat'
import React, { Dispatch } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { track } from 'utils/matomo'
import HiddenLabel from 'components/form/HiddenLabel'
import NumberInput from 'components/form/NumberInput'
import Select from 'components/form/Select'
import styles from './UsageForm.module.css'
import { usageNumeriqueConfig } from './config'

const UsageForm = ({
  slug,
  engineValue,
  value,
  setValue,
}: {
  slug: 'email' | 'visio' | 'streaming'
  engineValue?: string
  value?: number
  setValue?: Dispatch<SetStateAction<number>>
}) => {
  const {
    usageNumerique: { situation, setSituation },
  } = useParamContext()

  const values = usageNumeriqueConfig[slug]
  return (
    <div className={styles.container}>
      <label htmlFor={`input-main-value-${slug}`}>
        <b>{values.title}</b> par semaine
      </label>
      <div className={styles.inputs}>
        <div className={styles.firstRow}>
          <NumberInput
            id={`main-value-${slug}`}
            unit={values.unit}
            value={engineValue ? (situation[engineValue] as number) / 60 : (value as number)}
            setValue={(newValue) => {
              console.log(newValue, engineValue)
              track('Usage numérique', `Input ${slug} value`, newValue.toString())
              if (engineValue) {
                setSituation({ ...situation, [engineValue]: (newValue * 60).toString() })
              } else if (setValue) {
                setValue(newValue)
              }
            }}
          />
          <HiddenLabel htmlFor={`text-select-appareil-${slug}`}>Appareil utilisé pour {values.title}</HiddenLabel>
          <Select
            id={`appareil-${slug}`}
            value={situation[values.device] as string}
            onChange={(event) => {
              console.log(values.device, engineValue)

              track('Usage numérique', `Select ${slug} appareil`, event.target.value)
              setSituation({ ...situation, [values.device]: event.target.value })
            }}>
            {values.appareils.map((option) => (
              <option key={option.value} value={`'${option.value}'`}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
        <div className={styles.secondRow}>
          <HiddenLabel htmlFor={`text-select-type-${slug}`}>Type de {values.title}</HiddenLabel>
          <Select
            id={`type-${slug}`}
            value={situation[values.type] as string}
            onChange={(event) => {
              console.log(values.type, engineValue)

              track('Usage numérique', `Select ${slug} type`, event.target.value)
              setSituation({ ...situation, [values.type]: event.target.value })
            }}>
            {values.types.map((option) => (
              <option key={option.value} value={`'${option.value}'`}>
                {option.label}
              </option>
            ))}
          </Select>
          <HiddenLabel htmlFor={`text-select-network-${slug}`}>Réseaux utilisé pour {values.title}</HiddenLabel>
          <Select
            id={`network-${slug}`}
            value={situation[values.network] as string}
            onChange={(event) => {
              console.log(values.network, engineValue)

              track('Usage numérique', `Select ${slug} réseau`, event.target.value)
              setSituation({ ...situation, [values.network]: event.target.value })
            }}>
            {values.networks.map((option) => (
              <option key={option.value} value={`'${option.value}'`}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  )
}

export default UsageForm
