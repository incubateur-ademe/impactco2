'use client'

import { useTranslations } from 'next-intl'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import { getMonthsLabel } from 'utils/months'
import EquivalentCardContent from '../EquivalentCardContent'
import styles from './EquivalentSimulator.module.css'

const getCarpool = (language: string, carpool: number) => {
  if (language === 'en') {
    return `1 driver + ${carpool} ${formatName('passenger[s]', carpool)}`
  }
  if (language === 'es') {
    return `1 conductor + ${carpool} ${formatName('pasajero[s]', carpool)}`
  }
  return `1 conducteur + ${carpool} ${formatName('passager[s]', carpool)}`
}

const EquivalentHeader = ({ category, equivalent }: { category: Category; equivalent: ComputedEquivalent }) => {
  const { language } = useParamContext()
  const t = useTranslations('equivalent')
  const pre = t(`hypothesis.pre.${equivalent.slug}`)
  const post = t(`hypothesis.post.${equivalent.slug}`)

  const hasPre = pre !== `equivalent.hypothesis.pre.${equivalent.slug}`
  const hasPost = post !== `equivalent.hypothesis.post.${equivalent.slug}`
  return (
    <>
      <EquivalentCardContent equivalent={equivalent} category={category} />
      {('months' in equivalent || hasPre || hasPost || equivalent.carpool) && (
        <p className={styles.hypothesis}>
          <span className={styles.hypothesisTitle}>{t('hypotheses')}</span>
          {equivalent.carpool && <span>{getCarpool(language, equivalent.carpool)}</span>}
          {'months' in equivalent && <span>{getMonthsLabel(equivalent.months, language)} </span>}
          {hasPre && <span>{pre}</span>}
          {hasPost && (
            <span>
              {hasPre ? ' ' : ''}
              {post}
            </span>
          )}
        </p>
      )}
    </>
  )
}

export default EquivalentHeader
