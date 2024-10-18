'use client'

import { useTranslations } from 'next-intl'
import React, { useRef } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import Etiquette from 'components/comparateur/Etiquette'
import Icon from './Icon'
import styles from './Infos.module.css'

const FriendsVoiture = () => {
  const t = useTranslations('quiz.friends-voiture')
  const { language } = useParamContext()
  const ref = useRef(null)
  return (
    <>
      <div className={styles.container}>
        <div className={styles.withIcon}>
          <Icon />
          <div>
            {t.rich('line-1')}
            <br />
            <br />
            {t.rich('line-2')}
          </div>
        </div>
      </div>
      <br />
      <Etiquette
        ref={ref}
        baseValue={4990}
        comparisons={['streamingvideo', 'voiturethermique']}
        language={language}
        className={styles.center}
      />
    </>
  )
}

export default FriendsVoiture