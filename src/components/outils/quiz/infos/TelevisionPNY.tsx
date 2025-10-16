'use client'

import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import Etiquette from 'components/comparateur/Etiquette'
import Icon from './Icon'
import styles from './Infos.module.css'

const TelevisionPNY = () => {
  const t = useTranslations('quiz.television-pny')
  const { language } = useParamContext()
  const ref = useRef(null)

  return (
    <>
      <div className={styles.container}>
        <div className={styles.withIcon}>
          <Icon />
          <div>
            <p>{t.rich('line-1', { important: (chunks) => <b>{chunks}</b> })}</p>
            <p>{t.rich('line-2', { important: (chunks) => <b>{chunks}</b> })}</p>
          </div>
        </div>
      </div>
      <Etiquette
        ref={ref}
        baseValue={2060000}
        comparisons={['avion-pny', 'francais']}
        language={language}
        className={styles.center}
      />
    </>
  )
}

export default TelevisionPNY
