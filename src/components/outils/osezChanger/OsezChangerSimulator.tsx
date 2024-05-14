'use client'

import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import SprinklesIcon from 'components/base/icons/sprinkles'
import Etiquette from 'components/comparateur/Etiquette'
import { getRandomEquivalents } from 'components/comparateur/random'
import simulatorStyles from '../Simulator.module.css'
import styles from './OsezChangerSimulator.module.css'
import Question from './Question'

const shoesImpact = 17.9

const OsezChangerSimulator = () => {
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
          <div className={styles.title}>Comptez vos chaussures !</div>
          En moyenne, les Français n’utilisent qu’un tiers des chaussures qu’ils possèdent. Et si on désencombrait les
          placards ?
        </div>
        <Question
          slug='avis'
          title='🧠 À votre avis...'
          description='De combien de paires de chaussures pensez-vous avoir besoin ?'
          value={thinkingValue}
          setValue={setThinkingValue}
        />
        <Question
          slug='penderie'
          title='👉 Dans vos placards'
          description='Combien de paires de chaussures possédez-vous réellement ?'
          value={realValue}
          setValue={setRealValue}
          extra={
            thinkingValue !== undefined &&
            realValue !== undefined &&
            `${realValue > thinkingValue ? '+' : ''}${realValue < thinkingValue ? '-' : ''}${Math.abs(
              realValue - thinkingValue
            )} ${formatName('paire[s]', Math.abs(realValue - thinkingValue))}`
          }
        />
        <Question
          slug='neuf'
          title='✨ Vos achats récents'
          description='Combien de paires de chaussures neuves avez-vous acheté cette année ?'
          value={newValue}
          setValue={setNewValue}
          extra={newValue ? `+${(newValue * shoesImpact).toLocaleString('fr-FR')}kg CO₂e` : false}
        />
      </div>
      <div className={styles.bottom}>
        <div className={newValue === undefined ? styles.hidden : ''}>
          <div className={styles.results}>
            <div className={styles.values}>
              {newValue} {formatName('paire[s] de chaussures neuves', newValue).toUpperCase()}
            </div>
            <div className={styles.value}>
              <span className={styles.number}>{formatNumber(total)}</span> kg co₂e
            </div>
          </div>
          <div className={styles.etiquette}>
            <div className={styles.values}>SOIT AUTANT D’ÉMISSIONS QUE...</div>
            <Etiquette
              baseValue={total * 1000}
              comparisons={equivalents}
              ref={ref}
              randomize={() => {
                setEquivalents(getRandomEquivalents(undefined, 3))
              }}
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
