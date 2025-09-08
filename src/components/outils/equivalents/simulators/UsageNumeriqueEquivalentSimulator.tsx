'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import useUsageNumeriqueContext from 'src/providers/UsageNumeriqueProvider'
import { Category } from 'types/category'
import { ComputedEquivalent, EquivalentValue } from 'types/equivalent'
import { categories } from 'data/categories'
import { usageNumeriqueConfig } from 'components/outils/usageNumerique/config'
import usageFormStyles from 'src/components/outils/usageNumerique/UsageForm.module.css'
import { getName } from 'utils/Equivalent/equivalent'
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

const ecvs = [
  {
    id: 40,
    publicode: ' . terminaux . construction',
  },
  {
    id: 41,
    publicode: ' . terminaux . usage',
  },
  {
    id: 42,
    publicode: ' . transmission',
  },
  {
    id: 43,
    publicode: ' . data center',
  },
]

const UsageNumeriqueEquivalentSimulator = ({ slug }: { slug: 'visio' | 'email' | 'streaming' }) => {
  const { engine } = useUsageNumeriqueContext()
  const {
    [slug]: { situation, setSituation, withConstruction, setWithConstruction },
  } = useParamContext()
  const t = useTranslations('usage-numerique')
  const tEquivalent = useTranslations('equivalent.usage-numerique')

  const values = usageNumeriqueConfig[slug]
  const device = (situation[values.device] as string).replace(/'/g, '')

  const [life, setLife] = useState(evaluateNumber(engine, `${device} . durée de vie`))
  const [usage, setUsage] = useState(evaluateNumber(engine, `${device} . profil utilisation`))

  useEffect(() => {
    if (life > 0) {
      track(getName('fr', equivalents[slug]), `Input ${slug} durée de vie`, life.toString())
      setSituation({ ...situation, [`${device} . durée de vie`]: life.toString() })
    }
  }, [life])

  useEffect(() => {
    if (usage > 0) {
      track(getName('fr', equivalents[slug]), `Input ${slug} profil utilisation`, usage.toString())
      setSituation({ ...situation, [`${device} . profil utilisation`]: usage.toString() })
    }
  }, [usage])

  const computedEquivalent = useMemo(() => {
    if (withConstruction && (life === 0 || usage === 0)) {
      return { ...equivalents[slug], unit: 'param', ecv: [], value: 0 }
    }
    engine.setSituation(situation)

    const total = engine.evaluate(slug)
    const construction = evaluateNumber(engine, `${slug} . terminaux . construction`) / 1000

    return {
      ...equivalents[slug],
      unit: 'param',
      ecv: ecvs
        .filter((variable) => variable.publicode)
        .filter((variable) => withConstruction || variable.publicode !== ' . terminaux . construction')
        .map(
          (variable) =>
            ({
              id: variable.id,
              value: (engine.evaluate(`${slug}${variable.publicode}`).nodeValue as number) / 1000,
            }) as EquivalentValue
        )
        .filter((value) => value.value),
      value: (total.nodeValue as number) / 1000 - (withConstruction ? 0 : construction),
    }
  }, [situation, slug, engine, withConstruction, life, usage])
  return (
    <>
      <div className={baseStyles.header}>
        <EquivalentCardContent
          equivalent={computedEquivalent}
          category={category}
          output={`${computedEquivalent.slug}-simulator`}
        />
      </div>
      <form id={`${computedEquivalent.slug}-simulator`} className={baseStyles.simulator}>
        <div>
          <label className={baseStyles.label} htmlFor='input-main-value'>
            <b>{tEquivalent(`${slug}-mainTitle`)}</b>
          </label>
          <div className={usageFormStyles.inputs}>
            <div className={classNames(usageFormStyles.firstRow, { [usageFormStyles.onlyChild]: !values.secondValue })}>
              <NumberInput
                id='main-value'
                unit={`${tEquivalent(`${slug}-mainUnit`)}${(situation[values.mainValue] as number) >= 2 ? 's' : ''}`}
                value={(situation[values.mainValue] as number) / values.mainDivider}
                setValue={(newValue) => {
                  track(getName('fr', equivalents[slug]), `Input ${slug} value`, newValue.toString())
                  setSituation({ ...situation, [values.mainValue]: (newValue * values.mainDivider).toString() })
                }}
              />
              {values.secondValue && (
                <>
                  <HiddenLabel htmlFor='input-second'>{tEquivalent(`${slug}-secondTitle`)}</HiddenLabel>
                  <NumberInput
                    id='second'
                    unit={`${tEquivalent(`${slug}-secondUnit`)}${(situation[values.secondValue] as number) >= 2 ? 's' : ''}`}
                    value={situation[values.secondValue] as number}
                    setValue={(newValue) => {
                      track(getName('fr', equivalents[slug]), `Input ${slug} second value`, newValue.toString())
                      setSituation({ ...situation, [values.secondValue]: newValue.toString() })
                    }}
                  />
                </>
              )}
            </div>
            <div className={usageFormStyles.secondRow}>
              <HiddenLabel htmlFor='text-select-type'>Type d'{tEquivalent(`${slug}-title`)}</HiddenLabel>
              <Select
                id='type'
                title={`Type d'${tEquivalent(`${slug}-title`)}`}
                value={situation[values.type] as string}
                onChange={(event) => {
                  track(getName('fr', equivalents[slug]), `Select ${slug} type`, event.target.value)
                  setSituation({ ...situation, [values.type]: event.target.value })
                }}>
                {values.types.map((option) => (
                  <option key={option} value={`'${option}'`}>
                    {t(option.toString().replace(/\./g, ''))}
                  </option>
                ))}
              </Select>
              <HiddenLabel htmlFor='text-select-network'>
                Réseaux utilisé pour {tEquivalent(`${slug}-title`)}
              </HiddenLabel>
              <Select
                id='network'
                title={`Réseaux utilisé pour ${tEquivalent(`${slug}-title`)}`}
                value={situation[values.network] as string}
                onChange={(event) => {
                  track(getName('fr', equivalents[slug]), `Select ${slug} réseau`, event.target.value)
                  setSituation({ ...situation, [values.network]: event.target.value })
                }}>
                {values.networks.map((option) => (
                  <option key={option} value={`'${option}'`}>
                    {t(option)}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div className={usageFormStyles.inputs}>
          <div>
            <label className={baseStyles.label} htmlFor='text-select-appareil'>
              <b>{tEquivalent('appareil')}</b> {tEquivalent('used')}
            </label>
            <Select
              id='appareil'
              value={situation[values.device] as string}
              onChange={(event) => {
                track(getName('fr', equivalents[slug]), `Select ${slug} appareil`, event.target.value)
                setSituation({ ...situation, [values.device]: event.target.value })
                setLife(evaluateNumber(engine, `${event.target.value.replace(/'/g, '')} . durée de vie`))
                setUsage(evaluateNumber(engine, `${event.target.value.replace(/'/g, '')} . profil utilisation`))
              }}>
              {values.appareils.map((option) => (
                <option key={option} value={`'${option}'`}>
                  {t(option)}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Radio
              className={baseStyles.radio}
              id='radio-construction'
              label={
                <span className={baseStyles.radioLabel}>
                  {tEquivalent('take')} <b>{tEquivalent('construction')}</b>
                </span>
              }>
              <RadioInput
                name='radio-construction'
                required
                label={tEquivalent('yes')}
                value='yes'
                selected={withConstruction ? 'yes' : 'no'}
                setSelected={() => {
                  track(getName('fr', equivalents[slug]), `${slug} construction`, 'true')
                  setWithConstruction(true)
                }}
              />
              <RadioInput
                name='radio-construction'
                required
                label={tEquivalent('no')}
                value='no'
                selected={withConstruction ? 'yes' : 'no'}
                setSelected={() => {
                  track(getName('fr', equivalents[slug]), `${slug} construction`, 'false')
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
                unit={life >= 2 ? 'ans' : 'an'}
                value={life}
                setValue={(newValue) => {
                  setLife(newValue)
                }}
              />
            </div>
            <div>
              <label className={baseStyles.label} htmlFor='input-usage'>
                <b>Durée d'utilisation</b> quotidienne
              </label>
              <NumberInput
                id='usage'
                unit={usage >= 2 ? 'heures par jour' : 'heure par jour'}
                value={usage}
                setValue={(newValue) => {
                  setUsage(newValue)
                }}
              />
            </div>
          </div>
        )}
      </form>
      <Detail equivalent={computedEquivalent} withSeparator />
    </>
  )
}

export default UsageNumeriqueEquivalentSimulator
