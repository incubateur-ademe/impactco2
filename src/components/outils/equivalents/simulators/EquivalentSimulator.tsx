'use client'

import { useTranslations } from 'next-intl'
import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import { getMonthsLabel } from 'utils/months'
import EquivalentCardContent from '../EquivalentCardContent'
import Detail from '../detail/Detail'
import styles from './EquivalentSimulator.module.css'

const getCarpool = (language: string, carpool: number) => {
  if (language === 'en') {
    return `1 driver + ${carpool} ${formatName('passenger[s]', carpool)}`
  }
  if (language === 'es') {
    return `1 conductor + ${carpool} ${formatName('pasajero[s]', carpool)}`
  }
  if (language === 'de') {
    return `1 Fahrer + ${carpool} Beifahrer`
  }
  return `1 conducteur + ${carpool} ${formatName('passager[s]', carpool)}`
}

const EquivalentSimulator = ({ category, equivalent }: { category: Category; equivalent: ComputedEquivalent }) => {
  const { language } = useParamContext()
  const t = useTranslations('equivalent')
  const pre = t(`hypothesis.pre.${equivalent.slug}`)
  const post = t(`hypothesis.post.${equivalent.slug}`)

  const hasPre = pre !== `equivalent.hypothesis.pre.${equivalent.slug}`
  const hasPost = post !== `equivalent.hypothesis.post.${equivalent.slug}`
  return (
    <>
      <div className={styles.header}>
        <EquivalentCardContent equivalent={equivalent} category={category} />
        {('months' in equivalent || hasPre || hasPost || equivalent.carpool) && (
          <div className={styles.hypothesis}>
            <div className={styles.hypothesisTitle}>{t('hypotheses')}</div>
            {equivalent.carpool && <div>{getCarpool(language, equivalent.carpool)}</div>}
            {'months' in equivalent && <div>{getMonthsLabel(equivalent.months, language)}</div>}
            {hasPre && <div>{pre}</div>}
            {hasPost && <div>{post}</div>}
          </div>
        )}
      </div>
      <Detail equivalent={equivalent} />
    </>
  )
}

export default EquivalentSimulator
