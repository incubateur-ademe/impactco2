'use client'

import { useTranslations } from 'next-intl'
import React, { useMemo, useRef } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import useUsageNumeriqueContext from 'src/providers/UsageNumeriqueProvider'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import { categories } from 'data/categories'
import { computeFootprint } from 'utils/computeECV'
import formatNumber from 'utils/formatNumber'
import { track } from 'utils/matomo'
import { evaluateNumber } from 'utils/useSituation'
import LocalNumber from 'components/base/LocalNumber'
import Etiquette from 'components/comparateur/Etiquette'
import { getRandomEquivalents } from 'components/comparateur/random'
import shareableStyles from 'components/shareable/Shareable.module.css'
import CategorySimulator from '../CategorySimulator'
import UsageForm from './UsageForm'
import styles from './UsageNumeriqueSimulator.module.css'

const numerique = categories.find((category) => category.slug === 'numerique') as Category
const smartphone = numerique.equivalents?.find((equivalent) => equivalent.slug === 'smartphone') as ComputedEquivalent
const ordinateur = numerique.equivalents?.find(
  (equivalent) => equivalent.slug === 'ordinateurportable'
) as ComputedEquivalent
const television = numerique.equivalents?.find((equivalent) => equivalent.slug === 'television') as ComputedEquivalent

const numeriqueEquivalents = [
  {
    ...smartphone,
    usage: undefined,
    name: 'construction.smartphone',
    value: computeFootprint(smartphone),
  },
  {
    ...ordinateur,
    usage: undefined,
    name: 'construction.ordinateur',
    value: computeFootprint(ordinateur),
  },
  {
    ...television,
    usage: undefined,
    name: 'construction.television',
    value: computeFootprint(television),
  },
]

const usagenumerique = categories.find((category) => category.slug === 'usagenumerique') as Category
const email = usagenumerique.equivalents?.find((equivalent) => equivalent.slug === 'email') as ComputedEquivalent
const visio = usagenumerique.equivalents?.find(
  (equivalent) => equivalent.slug === 'visioconference'
) as ComputedEquivalent
const streaming = usagenumerique.equivalents?.find(
  (equivalent) => equivalent.slug === 'streamingvideo'
) as ComputedEquivalent

const UsageNumeriqueSimulator = () => {
  const ref = useRef<HTMLDivElement>(null)
  const {
    language,
    usageNumerique: { numberEmails, setNumberEmails, situation, equivalents, setEquivalents },
  } = useParamContext()

  const { engine } = useUsageNumeriqueContext()

  const total = useMemo(() => {
    engine.setSituation(situation)
    return (
      evaluateNumber(engine, 'email') * numberEmails +
      (evaluateNumber(engine, 'streaming . durée') ? evaluateNumber(engine, 'streaming') : 0) +
      (evaluateNumber(engine, 'visio . durée') ? evaluateNumber(engine, 'visio') : 0) -
      (evaluateNumber(engine, 'email . terminaux . construction') * numberEmails +
        evaluateNumber(engine, 'streaming . terminaux . construction') +
        evaluateNumber(engine, 'visio . terminaux . construction'))
    )
  }, [engine, situation, numberEmails])

  const t = useTranslations('usage-numerique')

  const displayedEquivalents = useMemo(
    () => [
      {
        ...email,
        name: `${t('email-year')} - ${numberEmails * 52} emails`,
        value:
          (52 *
            ((evaluateNumber(engine, 'email') - evaluateNumber(engine, 'email . terminaux . construction')) *
              numberEmails)) /
          1000,
      },
      {
        ...visio,
        name: `${t('visio-year')} - ${(evaluateNumber(engine, 'visio . durée') * 52) / 60} ${t('heure')}s`,
        value:
          (52 * (evaluateNumber(engine, 'visio') - evaluateNumber(engine, 'visio . terminaux . construction'))) / 1000,
      },
      {
        ...streaming,
        name: `${t('streaming-year')} - ${(evaluateNumber(engine, 'streaming . durée') * 52) / 60} ${t('heure')}s`,
        value:
          (52 *
            (evaluateNumber(engine, 'streaming') - evaluateNumber(engine, 'streaming . terminaux . construction'))) /
          1000,
      },
      ...numeriqueEquivalents.map((equivalent) => ({
        ...equivalent,
        name: t(equivalent.name),
      })),
    ],
    [engine, situation, numberEmails]
  )
  return (
    <>
      <div className={styles.simulator}>
        <UsageForm slug='streaming' engineValue='streaming . durée' />
        <UsageForm slug='visio' engineValue='visio . durée' />
        <UsageForm slug='email' value={numberEmails} setValue={setNumberEmails} />
      </div>
      <div className={styles.results}>
        <div className={styles.values}>
          <div className={styles.header}>{t('usages')}</div>
          <div className={styles.value}>
            <span className={styles.number} data-testid='usagenumerique-generated-value'>
              <LocalNumber number={formatNumber(total / 1000)} />
            </span>{' '}
            kg co₂e
          </div>
          <div>{t('by-week')}</div>
        </div>
        <div className={styles.values}>
          <div className={styles.header}>{t('or')}</div>
          <div className={styles.value}>
            <span className={styles.number}>
              <LocalNumber number={formatNumber((total * 52) / 1000)} />
            </span>{' '}
            kg co₂e
          </div>
          <div>{t('by-year')}</div>
        </div>
      </div>
      <div className={styles.etiquette}>
        <div className={styles.header}>{t('total')}</div>
        <Etiquette
          baseValue={total * 52}
          comparisons={equivalents}
          ref={ref}
          randomize={() => {
            track('Usage numérique', 'Randomize', 'randomize')
            setEquivalents(getRandomEquivalents(undefined, 3))
          }}
          language={language}
        />
      </div>
      <div className={shareableStyles.separatorBothBorders} />
      <div className={styles.text}>
        <div className={styles.mainText}>{t('title')}</div>
        {t('description')}
      </div>
      <div className={shareableStyles.separatorBothBorders} />
      <CategorySimulator tracking='Usage numérique' equivalents={displayedEquivalents} withSimulator />
    </>
  )
}

export default UsageNumeriqueSimulator
