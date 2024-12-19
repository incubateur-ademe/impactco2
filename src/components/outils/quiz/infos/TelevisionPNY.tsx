'use client'

import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import { useGlobalStore } from 'src/providers/stores/global'
import Etiquette from 'components/comparateur/Etiquette'
import Icon from './Icon'
import styles from './Infos.module.css'

const TelevisionPNY = () => {
  const t = useTranslations('quiz.television-pny')
  const { language } = useGlobalStore()
  const ref = useRef(null)

  return (
    <>
      <div className={styles.container}>
        <div className={styles.withIcon}>
          <Icon />
          <div>
            <p>{t.rich('line-1')}</p>
            <p>{t.rich('line-2')}</p>
          </div>
        </div>
      </div>
      <Etiquette
        ref={ref}
        baseValue={1770000}
        comparisons={['avion-pny', 'francais']}
        language={language}
        className={styles.center}
      />
    </>
  )
}

export default TelevisionPNY
