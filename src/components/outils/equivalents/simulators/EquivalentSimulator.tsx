'use client'

import { useTranslations } from 'next-intl'
import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import { getMonthsLabel } from 'utils/months'
import EquivalentCardContent from '../EquivalentCardContent'
import Detail from '../detail/Detail'
import styles from './EquivalentSimulator.module.css'

const EquivalentSimulator = ({
  category,
  equivalent,
  setOverscreen,
}: {
  category: Category
  equivalent: ComputedEquivalent
  setOverscreen: (overScreen: string) => void
}) => {
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
        {('months' in equivalent || hasPre || hasPost) && (
          <div className={styles.hypothesis}>
            <div className={styles.hypothesisTitle}>{t('hypotheses')}</div>
            {'months' in equivalent && <div>{getMonthsLabel(equivalent.months, language)}</div>}
            {hasPre && <div>{pre}</div>}
            {hasPost && <div>{post}</div>}
          </div>
        )}
      </div>
      <Detail equivalent={equivalent} setOverscreen={setOverscreen} />
    </>
  )
}

export default EquivalentSimulator
