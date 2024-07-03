import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { ComputedEquivalent } from 'types/equivalent'
import { TransportSimulateur } from 'types/transport'
import { getNameWithoutSuffix } from 'utils/Equivalent/equivalent'
import formatNumber from 'utils/formatNumber'
import formatUsage from 'utils/formatUsage'
import EquivalentIcon from 'components/base/EquivalentIcon'
import IframeableLink from 'components/base/IframeableLink'
import LocalNumber from 'components/base/LocalNumber'
import Carpool from './Carpool'
import CategoryDisplayAll from './CategoryDisplayAll'
import styles from './CategorySimulator.module.css'

const CategorySimulator = ({
  tracking,
  equivalents,
  displayAll,
  setDisplayAll,
  moreText,
  withSimulator,
  type,
}: {
  tracking: string
  equivalents: ComputedEquivalent[]
  displayAll?: boolean
  setDisplayAll?: Dispatch<SetStateAction<boolean>>
  moreText?: string
  withSimulator?: boolean
  type?: TransportSimulateur
}) => {
  const { language } = useParamContext()
  const t = useTranslations('category-simulator')
  const ref = useRef<HTMLDivElement>(null)
  const max = Math.max.apply(null, equivalents?.map((equivalent) => equivalent.value) || [])
  const hasUsage = equivalents && equivalents.some((equivalent) => formatUsage(equivalent))
  const [basePercent, setBasePercent] = useState(80)
  const [legendRelative, setLegendRelative] = useState(false)

  useEffect(() => {
    const onResize = () => {
      if (typeof ref !== 'function' && ref && ref.current && ref.current.parentElement) {
        const { width } = ref.current.parentElement.getBoundingClientRect()
        setBasePercent(width > 750 ? 80 : width > 700 ? 75 : width > 600 ? 70 : width > 450 ? 60 : 50)
        setLegendRelative((max && equivalents[0]?.value / max > 0.75) || false)
      }
    }
    onResize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [equivalents, ref, max])

  console.log(equivalents)
  return (
    <div className={styles.container}>
      <div ref={ref}>
        {equivalents &&
          equivalents
            .sort((a, b) => (a.initialValue || a.value) - (b.initialValue || b.value))
            .map((equivalent) => (
              <div
                key={equivalent.carpool ? `${equivalent.slug}-carpool` : equivalent.slug}
                className={classNames(styles.equivalent, { [styles.noFirst]: withSimulator })}>
                <IframeableLink data-testid='category-link' href={equivalent.link} className={styles.link}>
                  <EquivalentIcon equivalent={equivalent} height={3} />
                  <div className={styles.content} data-testid={`category-${equivalent.slug}`}>
                    <div className={styles.name}>{equivalent.name || getNameWithoutSuffix(language, equivalent)}</div>
                    <div className={styles.data}>
                      <div
                        className={styles.fullBar}
                        style={{ width: max ? `${(basePercent * equivalent.value) / max}%` : '0px' }}>
                        <div
                          className={styles.halfBar}
                          style={{ width: `${(100 * formatUsage(equivalent)) / equivalent.value}%` }}
                        />
                      </div>
                      <span className={styles.value} data-testid={`category-${equivalent.slug}-value`}>
                        <LocalNumber number={formatNumber(equivalent.value)} />
                      </span>{' '}
                      kg CO₂e
                    </div>
                  </div>
                </IframeableLink>
                {!!equivalent.carpool && type && (
                  <div className={styles.carpool}>
                    <div className={styles.triangle} />
                    <div className={styles.conducteur}>
                      <Image src='/icons/conducteur.svg' alt='' width={20} height={24} />
                    </div>
                    <Carpool type={type} equivalent={equivalent} />
                  </div>
                )}
              </div>
            ))}
      </div>
      {setDisplayAll && displayAll !== undefined && moreText && (
        <CategoryDisplayAll
          tracking={tracking}
          displayAll={displayAll}
          setDisplayAll={setDisplayAll}
          displayAllText={t(`${moreText}.display`)}
          hideAllText={t(`${moreText}.hide`)}
        />
      )}
      {hasUsage && (
        <div className={classNames(styles.legend, { [styles.legendRelative]: legendRelative })}>
          <div>
            <div className={styles.usage} />
            {t('legend.usage')}
          </div>
          <div>
            <div className={styles.construction} />
            {t('legend.construction')}
          </div>
        </div>
      )}
    </div>
  )
}

export default CategorySimulator
