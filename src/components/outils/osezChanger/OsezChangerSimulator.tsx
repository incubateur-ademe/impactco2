'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import React, { useRef, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import { track } from 'utils/matomo'
import LocalNumber from 'components/base/LocalNumber'
import SprinklesIcon from 'components/base/icons/sprinkles'
import Etiquette from 'components/comparateur/Etiquette'
import { getRandomEquivalents } from 'components/comparateur/random'
import simulatorStyles from '../Simulator.module.css'
import styles from './OsezChangerSimulator.module.css'
import Question from './Question'

const shoesImpact = 17.9

const OsezChangerSimulator = () => {
  const { language } = useParamContext()
  const t = useTranslations('osez-changer')
  const ref = useRef<HTMLDivElement>(null)

  const [equivalents, setEquivalents] = useState(['voiturethermique', 'tshirtencoton', 'repasavecduboeuf'])
  const [thinkingValue, setThinkingValue] = useState<number | undefined>()
  const [realValue, setRealValue] = useState<number | undefined>()
  const [newValue, setNewValue] = useState<number | undefined>()

  const total = (newValue || 0) * shoesImpact
  return (
    <>
      <div className={classNames(simulatorStyles.simulator, styles.simulator)}>
        <div className={styles.header}>
          <div className={styles.title}>{t('title')}</div>
          {t('description')}{' '}
        </div>
        <Question slug='avis' value={thinkingValue} setValue={setThinkingValue} />
        <Question
          slug='penderie'
          value={realValue}
          setValue={setRealValue}
          extra={
            thinkingValue !== undefined &&
            realValue !== undefined &&
            `${realValue > thinkingValue ? '+' : ''}${realValue < thinkingValue ? '-' : ''}${Math.abs(
              realValue - thinkingValue
            )} ${formatName(t('paire'), Math.abs(realValue - thinkingValue))}`
          }
        />
        <Question
          slug='neuf'
          value={newValue}
          setValue={setNewValue}
          extra={newValue ? `+${(newValue * shoesImpact).toLocaleString()}kg CO₂e` : false}
        />
      </div>
      <div className={styles.bottom}>
        <div className={newValue === undefined ? styles.hidden : ''}>
          <div className={styles.results}>
            <div className={styles.values}>
              {newValue} {formatName(t('new-paire'), newValue).toUpperCase()}
            </div>
            <div className={styles.value}>
              <span className={styles.number}>
                <LocalNumber number={formatNumber(total)} />
              </span>{' '}
              kg co₂e
            </div>
          </div>
          <div className={styles.etiquette}>
            <div className={styles.values}>{t('total')}</div>
            <Etiquette
              baseValue={total * 1000}
              comparisons={equivalents}
              ref={ref}
              randomize={() => {
                track('OsezChanger', 'Randomize', 'randomize')
                setEquivalents(getRandomEquivalents(undefined, 3))
              }}
              language={language}
            />
          </div>
        </div>
        {newValue === undefined && (
          <div className={styles.empty}>
            <SprinklesIcon />
            Une réponse à la question ci-dessus permet d’afficher l’impact carbone de l’achat de chaussures neuves
          </div>
        )}
      </div>
    </>
  )
}

export default OsezChangerSimulator
