'use client'

import React, { useMemo } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import useUsageNumeriqueContext from 'src/providers/UsageNumeriqueProvider'
import { Category } from 'types/category'
import { ComputedEquivalent, EquivalentValue } from 'types/equivalent'
import { categories } from 'data/categories'
import { ecv } from 'data/ecv'
import { usageNumeriqueConfig } from 'components/outils/usageNumerique/config'
import usageFormStyles from 'src/components/outils/usageNumerique/UsageForm.module.css'
import { track } from 'utils/matomo'
import { evaluateNumber } from 'utils/useSituation'
import HiddenLabel from 'components/form/HiddenLabel'
import NumberInput from 'components/form/NumberInput'
import Radio from 'components/form/Radio'
import RadioInput from 'components/form/RadioInput'
import Select from 'components/form/Select'
import EquivalentCardContent from '../EquivalentCardContent'
import Detail from '../detail/Detail'
import baseStyles from './EquivalentSimulator.module.css'

const category = categories.find((category) => category.slug === 'usagenumerique') as Category
const equivalent = category.equivalents?.find(
  (equivalent) => equivalent.slug === 'visioconference'
) as ComputedEquivalent

const VisioConferenceSimulator = () => {
  const { engine } = useUsageNumeriqueContext()
  const {
    visioConference: { situation, setSituation, withConstruction, setWithConstruction },
  } = useParamContext()

  const computedEquivalent = useMemo(() => {
    engine.setSituation(situation)

    const total = engine.evaluate('visio')
    const construction = evaluateNumber(engine, 'visio . terminaux . construction') / 1000
    return {
      ...equivalent,
      ecv: (total.traversedVariables || [])
        .filter((variable) => withConstruction || !variable.endsWith(' . terminaux . construction'))
        .map((variable) => ({ variable, ecv: ecv.find((value) => `visio${value.publicode}` === variable) }))
        .filter((value) => value.ecv)
        .map(
          (value) =>
            ({
              id: value.ecv?.id || 0,
              value: (engine.evaluate(value.variable).nodeValue as number) / 1000,
            }) as EquivalentValue
        ),
      value: (total.nodeValue as number) / 1000 - (withConstruction ? 0 : construction),
    }
  }, [situation, engine, withConstruction])

  const values = usageNumeriqueConfig.visio
  const device = (situation[values.device] as string).replace(/'/g, '')
  return (
    <>
      <div className={baseStyles.header}>
        <EquivalentCardContent equivalent={computedEquivalent} category={category} />
      </div>
      <div className={baseStyles.simulator}>
        <div>
          <label className={baseStyles.label} htmlFor='input-main-value'>
            <b>Heures de visioconférence</b>
          </label>
          <div className={usageFormStyles.inputs}>
            <div className={usageFormStyles.firstRow}>
              <NumberInput
                id='main-value'
                unit={values.unit}
                value={(situation['visio . durée'] as number) / 60}
                setValue={(newValue) => {
                  track('Visioconférence', 'Input visio value', newValue.toString())
                  setSituation({ ...situation, ['visio . durée']: (newValue * 60).toString() })
                }}
              />
              <HiddenLabel htmlFor='input-participants'>Nombre de participants</HiddenLabel>
              <NumberInput
                id='participants'
                unit={(situation['visio . emplacements'] as number) > 1 ? 'participants' : 'participant'}
                value={situation['visio . emplacements'] as number}
                setValue={(newValue) => {
                  track('Visioconférence', 'Input visio participants', newValue.toString())
                  setSituation({ ...situation, ['visio . emplacements']: newValue.toString() })
                }}
              />
            </div>
            <div className={usageFormStyles.secondRow}>
              <HiddenLabel htmlFor='text-select-type'>Type de {values.title}</HiddenLabel>
              <Select
                id='type'
                value={situation[values.type] as string}
                onChange={(event) => {
                  track('Visioconférence', 'Select visio type', event.target.value)
                  setSituation({ ...situation, [values.type]: event.target.value })
                }}>
                {values.types.map((option) => (
                  <option key={option.value} value={`'${option.value}'`}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <HiddenLabel htmlFor='text-select-network'>Réseaux utilisé pour {values.title}</HiddenLabel>
              <Select
                id='network'
                value={situation[values.network] as string}
                onChange={(event) => {
                  track('Visioconférence', 'Select visio réseau', event.target.value)
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
        <div className={usageFormStyles.inputs}>
          <div>
            <label className={baseStyles.label} htmlFor='text-select-appareil'>
              <b>Appareil</b> utilisé
            </label>
            <Select
              id='appareil'
              value={situation[values.device] as string}
              onChange={(event) => {
                track('Visioconférence', 'Select visio appareil', event.target.value)
                setSituation({ ...situation, [values.device]: event.target.value })
              }}>
              {values.appareils.map((option) => (
                <option key={option.value} value={`'${option.value}'`}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Radio
              required
              className={baseStyles.radio}
              id='radio-construction'
              label={
                <div className={baseStyles.radioLabel}>
                  Prendre en compte <b>la construction ?</b>
                </div>
              }>
              <RadioInput
                name='radio-construction'
                required
                label='Oui'
                value='yes'
                selected={withConstruction ? 'yes' : 'no'}
                setSelected={() => {
                  track('Visioconférence', 'visio construction', 'true')
                  setWithConstruction(true)
                }}
              />
              <RadioInput
                name='radio-construction'
                required
                label='Non'
                value='no'
                selected={withConstruction ? 'yes' : 'no'}
                setSelected={() => {
                  track('Visioconférence', 'visio construction', 'false')
                  setWithConstruction(false)
                }}
              />
            </Radio>
          </div>
        </div>
        {withConstruction && (
          <div className={usageFormStyles.inputs}>
            <div>
              <label className={baseStyles.label} htmlFor='input-vie'>
                <b>Durée de vie</b> totale de l'appareil
              </label>
              <NumberInput
                id='vie'
                unit={evaluateNumber(engine, `${device} . durée de vie`) > 1 ? 'ans' : 'an'}
                value={evaluateNumber(engine, `${device} . durée de vie`)}
                setValue={(newValue) => {
                  track('Visioconférence', 'Input visio durée de vie', newValue.toString())
                  setSituation({ ...situation, [`${device} . durée de vie`]: newValue.toString() })
                }}
              />
            </div>
            <div>
              <label className={baseStyles.label} htmlFor='input-usage'>
                <b>Durée d'utilisation</b> quotidienne
              </label>
              <NumberInput
                id='usage'
                unit={
                  evaluateNumber(engine, `${device} . profil utilisation`) > 1 ? 'heures par jour' : 'heure par jour'
                }
                value={evaluateNumber(engine, `${device} . profil utilisation`)}
                setValue={(newValue) => {
                  track('Visioconférence', 'Input visio profil utilisation', newValue.toString())
                  setSituation({ ...situation, [`${device} . profil utilisation`]: newValue.toString() })
                }}
              />
            </div>
          </div>
        )}
      </div>
      <Detail equivalent={computedEquivalent} />
    </>
  )
}

export default VisioConferenceSimulator
