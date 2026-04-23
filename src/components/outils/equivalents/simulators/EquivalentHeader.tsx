'use client'
import { useTranslations } from 'next-intl'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import { getMonthsLabel } from 'utils/months'
import EquivalentCardContent from '../EquivalentCardContent'
import styles from './EquivalentSimulator.module.css'

const getCarpool = (language: string, carpool: number) => {
  if (language === 'en') {
    return `${carpool + 1} people`
  }
  if (language === 'es') {
    return `${carpool + 1} personas`
  }
  return `${carpool + 1} personnes`
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
          {'months' in equivalent && <span>{getMonthsLabel(equivalent.months, language)} </span>}
          {hasPre && <span>{pre}</span>}
          {equivalent.carpool && <span> - {getCarpool(language, equivalent.carpool)}</span>}
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
