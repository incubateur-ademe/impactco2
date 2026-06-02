'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { Dispatch } from 'react'
import styles from './ScoreInput.module.css'

const ScoreInput = ({
  selected,
  setSelected,
}: {
  selected: number | null
  setSelected: Dispatch<React.SetStateAction<number | null>>
}) => {
  const t = useTranslations('nps')
  return (
    <>
      <ul className={styles.buttons}>
        {Array.from({ length: 11 }, (_, i) => (
          <li key={i}>
            <button
              type='button'
              className={classNames(styles.button, {
                [styles.first]: i === 0,
                [styles.last]: i === 10,
                [styles.selected]: selected === i,
              })}
              onClick={() => setSelected(i)}>
              {i}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.recommendations}>
        <p>{t('negative')}</p>
        <p>{t('positive')}</p>
      </div>
    </>
  )
}

export default ScoreInput
