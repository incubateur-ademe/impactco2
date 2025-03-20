'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import useParamContext, { Params } from 'src/providers/ParamProvider'
import { ComputedEquivalent } from 'types/equivalent'
import { TransportSimulateur } from 'types/transport'
import { getNameWithoutSuffix } from 'utils/Equivalent/equivalent'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import formatUsage from 'utils/formatUsage'
import { track } from 'utils/matomo'
import EquivalentIcon from 'components/base/EquivalentIcon'
import IframeableLink from 'components/base/IframeableLink'
import LocalNumber from 'components/base/LocalNumber'
import CategoryDisplayAll from './CategoryDisplayAll'
import styles from './CategorySimulator.module.css'
import PlusMinus from './plusMinus/PlusMinus'

const getValue = (equivalent: ComputedEquivalent, params: Params, type?: TransportSimulateur) => {
  if (type && equivalent.initialValue) {
    const carpool = params[type].carpool[equivalent.slug] || 1
    return equivalent.initialValue / (carpool + 1)
  }
  return equivalent.value
}

const CategorySimulator = ({
  id,
  tracking,
  equivalents,
  displayAll,
  setDisplayAll,
  moreText,
  withSimulator,
  type,
  reverse,
}: {
  id?: string
  tracking: string
  equivalents: ComputedEquivalent[]
  displayAll?: boolean
  setDisplayAll?: Dispatch<SetStateAction<boolean>>
  moreText?: string
  withSimulator?: boolean
  type?: TransportSimulateur
  reverse?: boolean
}) => {
  const params = useParamContext()
  const t = useTranslations('category-simulator')

  const ref = useRef<HTMLUListElement>(null)
  const firstElementRef = useRef<HTMLAnchorElement>(null)
  const max = Math.max.apply(null, equivalents?.map((equivalent) => equivalent.value) || [])
  const hasUsage = equivalents && equivalents.some((equivalent) => formatUsage(equivalent))
  const [basePercent, setBasePercent] = useState(80)
  const [legendRelative, setLegendRelative] = useState(false)
  const initialParams = useMemo(() => params, [])

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

  useEffect(() => {
    if (displayAll && firstElementRef.current) {
      firstElementRef.current.focus()
    }
  }, [displayAll, firstElementRef])

  return (
    <div className={styles.container}>
      <ul ref={ref} id={`category-${id || ''}-equivalents-list`}>
        {equivalents &&
          equivalents
            .sort((a, b) => (getValue(a, initialParams, type) - getValue(b, initialParams, type)) * (reverse ? -1 : 1))
            .map((equivalent, index) => {
              const usagePercent = (100 * formatUsage(equivalent)) / equivalent.value
              const barExplanation = `usage : ${usagePercent.toFixed(0)}% et construction : ${(100 - usagePercent).toFixed(0)}%`

              return (
                <li
                  key={equivalent.carpool ? `${equivalent.slug}-carpool` : equivalent.slug}
                  className={classNames(styles.equivalent, { [styles.noFirst]: withSimulator })}>
                  <IframeableLink
                    ref={index === 0 ? firstElementRef : undefined}
                    data-testid='category-link'
                    href={equivalent.link}
                    className={styles.link}
                    aria-live='polite'
                    aria-label={`${equivalent.name || getNameWithoutSuffix(params.language, equivalent)}${equivalent.carpool ? ` un conducteur plus ${equivalent.carpool} ${formatName('passager[s]', equivalent.carpool)}` : ''} ${formatNumber(equivalent.value)} kg CO₂e (${barExplanation})`}>
                    <EquivalentIcon equivalent={equivalent} height={3} />
                    <div className={styles.content} data-testid={`category-${equivalent.slug}`}>
                      <div className={styles.name}>
                        {equivalent.name || getNameWithoutSuffix(params.language, equivalent)}
                      </div>
                      <div className={styles.data}>
                        {equivalent.value !== 0 && (
                          <div
                            className={styles.fullBar}
                            style={{ width: max ? `${(basePercent * equivalent.value) / max}%` : '0px' }}>
                            <div
                              className={styles.halfBar}
                              style={{
                                width: `${usagePercent}%`,
                              }}
                            />
                          </div>
                        )}
                        <span className={styles.value} data-testid={`category-${equivalent.slug}-value`}>
                          <LocalNumber number={formatNumber(equivalent.value)} />
                        </span>{' '}
                        kg CO₂e
                      </div>
                      {hasUsage && <p className='ico2-hidden'>{barExplanation}</p>}
                    </div>
                  </IframeableLink>
                  {!!equivalent.carpool && type && (
                    <div className={styles.carpool}>
                      <div className={styles.triangle} />
                      <div className={styles.conducteur}>
                        <Image src='/icons/conducteur.svg' alt='un conducteur dans la voiture' width={20} height={24} />
                      </div>
                      <PlusMinus
                        value={params[type].carpool[equivalent.slug] || 1}
                        setValue={(value) => {
                          track(
                            `Transport ${type === 'distance' ? 'distance' : 'itinéraire'}`,
                            `Covoiturage ${equivalent.slug}`,
                            value.toString()
                          )
                          params[type].setCarpool({ ...params[type].carpool, [equivalent.slug]: value })
                        }}
                        max={4}
                        label={formatName(t('passenger'), 1)}
                        hiddenLabel={`${t('in')} ${getNameWithoutSuffix(params.language, equivalent)}`}
                        icon='/icons/passager.svg'
                      />
                    </div>
                  )}
                </li>
              )
            })}
      </ul>
      {setDisplayAll && displayAll !== undefined && moreText && (
        <CategoryDisplayAll
          id={id}
          tracking={tracking}
          displayAll={displayAll}
          setDisplayAll={setDisplayAll}
          displayAllText={t(`${moreText}.display`)}
          hideAllText={t(`${moreText}.hide`)}
        />
      )}
      {hasUsage && (
        <div
          className={classNames(styles.legend, {
            [styles.legendRelative]: equivalents[0]?.carpool || equivalents[1]?.carpool || legendRelative,
          })}>
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
