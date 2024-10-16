'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { getName } from 'utils/Equivalent/equivalent'
import { getNumberPrecision } from 'utils/formatNumberPrecision'
import EquivalentIcon from 'components/base/EquivalentIcon'
import IframeableLink from 'components/base/IframeableLink'
import LocalNumber from 'components/base/LocalNumber'
import CloseThickIcon from 'components/base/icons/close-thick'
import LinkIcon from 'components/base/icons/link'
import Tiles from 'components/comparateur/Tiles'
import NumberInput from 'components/form/NumberInput'
import simulatorStyles from '../Simulator.module.css'
import styles from './ComparateurSimulator.module.css'

const ComparateurSimulator = () => {
  const {
    language,
    comparateur: { baseValue, weight, setBaseValue, comparedEquivalent, setComparedEquivalent },
  } = useParamContext()

  const { value, unit } = getNumberPrecision(baseValue * weight)
  const t = useTranslations('comparateur')
  return (
    <div>
      <div className={simulatorStyles.simulator}>
        <div className={classNames(styles.numberInput, { [styles.numberInputWithEquivalent]: !!comparedEquivalent })}>
          <NumberInput
            id='base-value'
            value={baseValue}
            setValue={setBaseValue}
            label={comparedEquivalent ? getName(language, comparedEquivalent, true, baseValue) : t('co2-unit')}
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
            onUnitClick={comparedEquivalent ? () => setComparedEquivalent(undefined) : undefined}
            extraWidth='8rem'
          />
        </div>
        {comparedEquivalent ? (
          <div className={styles.description}>
            {t('title-bis-1')}{' '}
            <span className={styles.descriptionValue} data-testid='compared-equivalent-value'>
              <LocalNumber number={value} /> {unit} CO₂e
            </span>
            , {t('title-bis-2')}
          </div>
        ) : (
          t('title')
        )}
        {comparedEquivalent && (
          <>
            <IframeableLink
              href={comparedEquivalent.link}
              className={styles.equivalent}
              target='_blank'
              rel='noopener noreferrer'
              data-testid='compared-equivalent-link'>
              <EquivalentIcon height={2.5} equivalent={comparedEquivalent} />
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
