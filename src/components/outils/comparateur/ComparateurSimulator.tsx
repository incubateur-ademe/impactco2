'use client'

import classNames from 'classnames'
import NextLink from 'next/link'
import React from 'react'
import formatName from 'utils/formatName'
import formatNumberPrecision from 'utils/formatNumberPrecision'
import useParamContext from 'components/providers/ParamProvider'
import EquivalentIcon from 'components/base/EquivalentIcon'
import Link from 'components/base/buttons/Link'
import Tiles from 'components/comparateur/Tiles'
import NumberInput from 'components/form/NumberInput'
import CloseThickIcon from 'components/osezchanger/icons/close-thick'
import LinkIcon from 'components/osezchanger/icons/link'
import simulatorStyles from '../Simulator.module.css'
import styles from './ComparateurSimulator.module.css'

const ComparateurSimulator = ({ setOverScreen }: { setOverScreen: (overscreen: string) => void }) => {
  const {
    comparateur: { baseValue, weight, setBaseValue, comparedEquivalent, setComparedEquivalent },
  } = useParamContext()

  return (
    <div>
      <div className={simulatorStyles.simulator}>
        <div className={classNames(styles.numberInput, { [styles.numberInputWithEquivalent]: !!comparedEquivalent })}>
          <NumberInput
            id='base-value'
            value={baseValue}
            setValue={setBaseValue}
            label={
              comparedEquivalent
                ? formatName(
                    (('prefix' in comparedEquivalent && comparedEquivalent.prefix) || '') +
                      comparedEquivalent.name +
                      (('suffix' in comparedEquivalent && comparedEquivalent.suffix) || ''),
                    baseValue
                  )
                : 'kg de CO₂'
            }
            unit={
              comparedEquivalent ? (
                <>
                  {formatName(
                    (('prefix' in comparedEquivalent && comparedEquivalent.prefix) || '') +
                      comparedEquivalent.name +
                      (('suffix' in comparedEquivalent && comparedEquivalent.suffix) || ''),
                    baseValue
                  )}
                  <div className={styles.unitIcon}>
                    <CloseThickIcon />
                  </div>
                </>
              ) : (
                'kg de CO₂'
              )
            }
            onUnitClick={comparedEquivalent ? () => setComparedEquivalent(undefined) : undefined}
            extraWidth='8rem'
          />
        </div>
        {comparedEquivalent ? (
          <div className={styles.description}>
            C’est{' '}
            <span className={styles.descriptionValue} data-testid='compared-equivalent-value'>
              {formatNumberPrecision(baseValue * weight)} CO2e
            </span>
            , soit autant d’émissions que pour fabriquer, consommer ou parcourir...
          </div>
        ) : (
          'C’est autant d’émissions que pour fabriquer, consommer ou parcourir...'
        )}
        {comparedEquivalent && (
          <>
            <NextLink
              href={comparedEquivalent.link}
              className={styles.equivalent}
              target='_blank'
              rel='noopener noreferrer'>
              <EquivalentIcon height={2.5} equivalent={comparedEquivalent} />
              <LinkIcon />
            </NextLink>
            <Link
              target='_blank'
              rel='noopener noreferrer'
              href={comparedEquivalent.link}
              className={styles.equivalentLink}>
              Voir le détail
              <LinkIcon />
            </Link>
          </>
        )}
      </div>
      <div className={styles.tiles}>
        <Tiles changeEquivalents={() => setOverScreen('equivalents')} />
      </div>
    </div>
  )
}

export default ComparateurSimulator
