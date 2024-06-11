'use client'

import classNames from 'classnames'
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
const equivalents = {
  visio: category.equivalents?.find((equivalent) => equivalent.slug === 'visioconference') as ComputedEquivalent,
  email: category.equivalents?.find((equivalent) => equivalent.slug === 'email') as ComputedEquivalent,
  streaming: category.equivalents?.find((equivalent) => equivalent.slug === 'streamingvideo') as ComputedEquivalent,
}

const UsageNumeriqueEquivalentSimulator = ({ slug }: { slug: 'visio' | 'email' | 'streaming' }) => {
  const { engine } = useUsageNumeriqueContext()
  const {
    [slug]: { situation, setSituation, withConstruction, setWithConstruction },
  } = useParamContext()

  const computedEquivalent = useMemo(() => {
    engine.setSituation(situation)

    const total = engine.evaluate(slug)
    const construction = evaluateNumber(engine, `${slug} . terminaux . construction`) / 1000
    return {
      ...equivalents[slug],
      unit: 'pour les paramètres renseignés ci-dessous.',
      ecv: (total.traversedVariables || [])
        .filter((variable) => withConstruction || !variable.endsWith(' . terminaux . construction'))
        .map((variable) => ({ variable, ecv: ecv.find((value) => `${slug}${value.publicode}` === variable) }))
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
  }, [situation, slug, engine, withConstruction])

  const values = usageNumeriqueConfig[slug]
  const device = (situation[values.device] as string).replace(/'/g, '')
  return (
    <>
      <div className={baseStyles.header}>
        <EquivalentCardContent equivalent={computedEquivalent} category={category} />
      </div>
      <div className={baseStyles.simulator}>
        <div>
          <label className={baseStyles.label} htmlFor='input-main-value'>
            <b>{values.mainTitle}</b>
          </label>
          <div className={usageFormStyles.inputs}>
            <div className={classNames(usageFormStyles.firstRow, { [usageFormStyles.onlyChild]: !values.secondTitle })}>
              <NumberInput
                id='main-value'
                unit={`${values.mainUnit}${(situation[values.mainValue] as number) > 1 ? 's' : ''}`}
                value={(situation[values.mainValue] as number) / values.mainDivider}
                setValue={(newValue) => {
                  track(equivalents[slug].name, `Input ${slug} value`, newValue.toString())
                  setSituation({ ...situation, [values.mainValue]: (newValue * values.mainDivider).toString() })
                }}
              />
              {values.secondTitle && values.secondValue && values.secondUnit && (
                <>
                  <HiddenLabel htmlFor='input-second'>{values.secondTitle}</HiddenLabel>
                  <NumberInput
                    id='second'
                    unit={`${values.secondUnit}${(situation[values.secondValue] as number) > 1 ? 's' : ''}`}
                    value={situation[values.secondValue] as number}
                    setValue={(newValue) => {
                      track(equivalents[slug].name, `Input ${slug} second value`, newValue.toString())
                      setSituation({ ...situation, [values.secondValue]: newValue.toString() })
                    }}
                  />
                </>
              )}
            </div>
            <div className={usageFormStyles.secondRow}>
              <HiddenLabel htmlFor='text-select-type'>Type de {values.title}</HiddenLabel>
              <Select
                id='type'
                value={situation[values.type] as string}
                onChange={(event) => {
                  track(equivalents[slug].name, `Select ${slug} type`, event.target.value)
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
                  track(equivalents[slug].name, `Select ${slug} réseau`, event.target.value)
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
                track(equivalents[slug].name, `Select ${slug} appareil`, event.target.value)
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
                  track(equivalents[slug].name, `${slug} construction`, 'true')
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
                  track(equivalents[slug].name, `${slug} construction`, 'false')
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
                  track(equivalents[slug].name, `Input ${slug} durée de vie`, newValue.toString())
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
                  track(equivalents[slug].name, `Input ${slug} profil utilisation`, newValue.toString())
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

export default UsageNumeriqueEquivalentSimulator
