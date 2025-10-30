'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import useTrackingContext from 'src/providers/TrackingProvider'
import { ComputedEquivalent } from 'types/equivalent'
import { getNameWithoutSuffix } from 'utils/Equivalent/equivalent'
import formatNumber from 'utils/formatNumber'
import EquivalentIcon from 'components/base/EquivalentIcon'
import IframeableLink from 'components/base/IframeableLink'
import LocalNumber from 'components/base/LocalNumber'
import styles from './LivraisonEquivalent.module.css'

const weights: Record<string, Record<string, number>> = {
  '2': {
    pointrelaisdouce: 0.89,
    pointrelais: 2.41,
    clickcollectdouce: 0.89,
    clickcollect: 7.42,
    livraisondomicile: 1.02,
  },
  '15': {
    pointrelaisdouce: 6,
    pointrelais: 7.52,
    clickcollectdouce: 6.07,
    clickcollect: 12.06,
    livraisondomicile: 7.01,
  },
  '30': {
    pointrelaisdouce: 12.7,
    pointrelais: 14.22,
    clickcollectdouce: 12.9,
    clickcollect: 19.43,
    livraisondomicile: 14.22,
  },
}

const LivraisonEquivalent = ({
  animated,
  equivalent,
  max,
  index,
  customTheme,
}: {
  animated?: boolean
  equivalent: ComputedEquivalent
  max: number
  index: number
  customTheme?: string | null
}) => {
  const params = useSearchParams()
  const mode = params.get('mode')

  const { trackOnce } = useTrackingContext()
  const { language, livraison } = useParamContext()
  const t = useTranslations('livraison')

  const extraName = useMemo(() => {
    const extraName = t(`extranames.${equivalent.slug}`)
    return extraName === `livraison.extranames.${equivalent.slug}` ? '' : extraName
  }, [equivalent])

  const value = mode && weights[mode] ? weights[mode][equivalent.slug] : null
  return (
    <IframeableLink
      className={classNames(customTheme === 'grey' ? styles.greyContainer : styles.container, {
        [styles.static]: !animated,
      })}
      href={`/outils/livraison/${equivalent.slug}`}
      onClick={() => trackOnce(`Equivalent${equivalent.slug}`)}>
      <EquivalentIcon equivalent={equivalent} height={2.5} customTheme={customTheme} />
      <div className={styles.info}>
        <p>
          {getNameWithoutSuffix(language, equivalent)}
          {extraName ? extraName : ''}
          {livraison.distance[equivalent.slug] && <span className={styles.gray}> - {t('car')}</span>}
          {equivalent.slug.includes('douce') && <span className={styles.green}> - {t('foot')}</span>}
        </p>
        <div className={styles.barContainer}>
          <div
            className={classNames(styles.bar, {
              [styles.greenBar]: index < 2,
              [styles.plainBar]: index > 4,
            })}
            style={{ width: `${(70 * (value || equivalent.value)) / max}%` }}
          />
          <p className={styles.value}>
            <LocalNumber number={formatNumber(value || equivalent.value)} /> kg CO₂e
          </p>
        </div>
      </div>
    </IframeableLink>
  )
}

export default LivraisonEquivalent
