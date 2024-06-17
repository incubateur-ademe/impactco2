import classNames from 'classnames'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import { TransportSimulateur } from 'types/transport'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import formatUsage from 'utils/formatUsage'
import EquivalentIcon from 'components/base/EquivalentIcon'
import IframeableLink from 'components/base/IframeableLink'
import Carpool from './Carpool'
import CategoryDisplayAll from './CategoryDisplayAll'
import styles from './CategorySimulator.module.css'

const CategorySimulator = ({
  tracking,
  equivalents,
  displayAll,
  setDisplayAll,
  displayAllText,
  hideAllText,
  withSimulator,
  type,
}: {
  tracking: string
  equivalents: ComputedEquivalent[]
  displayAll?: boolean
  setDisplayAll?: Dispatch<SetStateAction<boolean>>
  displayAllText?: string
  hideAllText?: string
  withSimulator?: boolean
  type?: TransportSimulateur
}) => {
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

  return (
    <div className={styles.container}>
      <div ref={ref}>
        {equivalents &&
          equivalents
            .sort((a, b) => a.value - b.value)
            .map((equivalent) => (
              <div
                key={equivalent.carpool ? `${equivalent.slug}-carpool` : equivalent.slug}
                className={classNames(styles.equivalent, { [styles.noFirst]: withSimulator })}>
                <IframeableLink data-testid='category-link' href={equivalent.link} className={styles.link}>
                  <EquivalentIcon equivalent={equivalent} height={3} />
                  <div className={styles.content} data-testid={`category-${equivalent.slug}`}>
                    <div className={styles.name}>
                      {formatName(
                        `${equivalent.name}${equivalent.subtitle ? ` ${equivalent.subtitle.startsWith('(') || equivalent.subtitle.startsWith(' -') ? equivalent.subtitle : `(${equivalent.subtitle})`}` : ''}`,
                        1,
                        true
                      )}
                    </div>
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
                        {formatNumber(equivalent.value)}
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
                    <Carpool type={type} />
                  </div>
                )}
              </div>
            ))}
      </div>
      {setDisplayAll && displayAll !== undefined && displayAllText && hideAllText && (
        <CategoryDisplayAll
          tracking={tracking}
          displayAll={displayAll}
          setDisplayAll={setDisplayAll}
          displayAllText={displayAllText}
          hideAllText={hideAllText}
        />
      )}
      {hasUsage && (
        <div className={classNames(styles.legend, { [styles.legendRelative]: legendRelative })}>
          <div>
            <div className={styles.usage} />
            Usage
          </div>
          <div>
            <div className={styles.construction} />
            Construction
          </div>
        </div>
      )}
    </div>
  )
}

export default CategorySimulator
