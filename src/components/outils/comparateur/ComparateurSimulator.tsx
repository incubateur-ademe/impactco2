'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import { useComparateurStore } from 'src/providers/stores/comparateur'
import { useGlobalStore } from 'src/providers/stores/global'
import { getName } from 'utils/Equivalent/equivalent'
import { getNumberPrecision } from 'utils/formatNumberPrecision'
import { metaTitles } from 'utils/meta'
import { DefaultParams } from 'utils/params'
import EquivalentIcon from 'components/base/EquivalentIcon'
import IframeableLink from 'components/base/IframeableLink'
import LocalNumber from 'components/base/LocalNumber'
import CloseThickIcon from 'components/base/icons/close-thick'
import LinkIcon from 'components/base/icons/link'
import Tiles from 'components/comparateur/Tiles'
import NumberInput from 'components/form/NumberInput'
import simulatorStyles from '../Simulator.module.css'
import styles from './ComparateurSimulator.module.css'

const ComparateurSimulator = ({ defaultParams }: { defaultParams: DefaultParams['comparateur'] }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const isInitialRender = useRef(true)
  const { language } = useGlobalStore()

  const { baseValue, weight, setBaseValue, comparedEquivalent, setComparedEquivalent, setEquivalents } =
    useComparateurStore()

  const { value, unit } = getNumberPrecision(baseValue * weight)
  const t = useTranslations('comparateur')

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }
    if (inputRef.current) {
      inputRef.current.focus()
    }
    document.title = `${metaTitles.comparateur[language]} - ${comparedEquivalent ? getName(language, comparedEquivalent) : t('co2-unit')} | Impact CO₂`
  }, [comparedEquivalent, inputRef])

  useEffect(() => {
    setBaseValue(defaultParams.baseValue)
    setComparedEquivalent(defaultParams.comparedEquivalent, true)
    setEquivalents(defaultParams.equivalents)
  }, [defaultParams])

  return (
    <div>
      <div className={simulatorStyles.simulator}>
        <div className={classNames(styles.numberInput, { [styles.numberInputWithEquivalent]: !!comparedEquivalent })}>
          <NumberInput
            ref={inputRef}
            id='base-value'
            value={baseValue}
            setValue={setBaseValue}
            label={`${t('number-of')} ${comparedEquivalent ? getName(language, comparedEquivalent, true, baseValue) : t('co2-unit')}`}
            unit={
              comparedEquivalent ? (
                <>
                  {getName(language, comparedEquivalent, true, baseValue, true)}
                  <div className={styles.unitIcon}>
                    <CloseThickIcon />
                  </div>
                </>
              ) : (
                t('co2-unit')
              )
            }
            unitTitle={
              comparedEquivalent
                ? t('unit-title', {
                    equivalent: getName(language, comparedEquivalent, true, baseValue, true),
                  })
                : undefined
            }
            onUnitClick={comparedEquivalent ? () => setComparedEquivalent(undefined) : undefined}
            extraWidth='8rem'
          />
        </div>
        {comparedEquivalent ? (
          <p className={styles.description}>
            {t('title-bis-1')}{' '}
            <span className={styles.descriptionValue} data-testid='compared-equivalent-value'>
              <LocalNumber number={value} /> {unit} CO₂e
            </span>
            , {t('title-bis-2')}
          </p>
        ) : (
          <p>{t('title')}</p>
        )}
        {comparedEquivalent && (
          <>
            <IframeableLink
              href={comparedEquivalent.link}
              className={styles.equivalent}
              target='_blank'
              rel='noopener noreferrer'
              data-testid='compared-equivalent-link'
              title={`${getName(language, comparedEquivalent, true, baseValue)} - Nouvelle fenêtre`}>
              <EquivalentIcon
                height={2.5}
                equivalent={comparedEquivalent}
                alt={getName(language, comparedEquivalent, true, baseValue)}
              />
              <LinkIcon />
            </IframeableLink>
            <IframeableLink
              target='_blank'
              rel='noopener noreferrer'
              href={comparedEquivalent.link}
              className={styles.equivalentLink}>
              {t('detail')}
              <LinkIcon />
            </IframeableLink>
          </>
        )}
      </div>
      <div className={styles.tiles}>
        <Tiles />
      </div>
    </div>
  )
}

export default ComparateurSimulator
