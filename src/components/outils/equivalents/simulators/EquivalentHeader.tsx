'use client'
import { useTranslations } from 'next-intl'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import { getNumberOfPersons } from 'src/utils/Equivalent/equivalent'
import { getMonthsLabel } from 'utils/months'
import EquivalentCardContent from '../EquivalentCardContent'
import styles from './EquivalentSimulator.module.css'

const EquivalentHeader = ({ category, equivalent }: { category: Category; equivalent: ComputedEquivalent }) => {
  const { language } = useParamContext()
  const t = useTranslations('equivalent')
  const [slug] = equivalent.slug.split('+')
  const pre = t(`hypothesis.pre.${slug}`)
  const post = t(`hypothesis.post.${slug}`)

  const hasPre = pre !== `equivalent.hypothesis.pre.${slug}`
  const hasPost = post !== `equivalent.hypothesis.post.${slug}`

  return (
    <>
      <EquivalentCardContent equivalent={equivalent} category={category} />
      {('months' in equivalent || hasPre || hasPost || equivalent.withCarpool) && (
        <p className={styles.hypothesis}>
          <span className={styles.hypothesisTitle}>{t('hypotheses')}</span>
          {'months' in equivalent && <span>{getMonthsLabel(equivalent.months, language)} </span>}
          {hasPre && <span>{pre}</span>}
          {equivalent.withCarpool && (
            <span>
              {hasPre ? ' - ' : ''}
              {getNumberOfPersons((equivalent.carpool === undefined ? 0 : equivalent.carpool).toString(), language)}
            </span>
          )}
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
