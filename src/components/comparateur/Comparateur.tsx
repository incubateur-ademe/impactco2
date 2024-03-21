import classNames from 'classnames'
import NextLink from 'next/link'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import formatName from 'utils/formatName'
import formatNumberPrecision from 'utils/formatNumberPrecision'
import useParamContext from 'components/providers/ParamProvider'
import Emoji from 'components/base/Emoji'
import Link from 'components/base/buttons/Link'
import { HiddenLabel } from 'components/form/HiddenLabel'
import Input from 'components/form/Input'
import ShareableContent from 'components/misc/ShareableContent'
import { Icon } from 'components/osezchanger/icons'
import styles from './Comparateur.module.css'
import Tiles from './Tiles'
import { OverScreenComparateur } from './overscreens/Type'
import { overScreenComparateurValues } from './overscreens/Values'

const Comparateur = ({ iframe }: { iframe?: boolean }) => {
  const {
    comparateur: {
      baseValue,
      weight,
      setBaseValue,
      setEquivalents,
      equivalents,
      comparedEquivalent,
      setComparedEquivalent,
    },
  } = useParamContext()

  const suffixDivRef = useRef<HTMLDivElement>(null)
  const suffixButtonRef = useRef<HTMLButtonElement>(null)
  const [suffixStyle, setSuffixStyle] = useState({ width: '150px', paddingRight: 'calc(150px + 2rem' })
  const [overScreen, setOverScreen] = useState<OverScreenComparateur>()
  const params = useMemo(
    () =>
      `value=${baseValue}&comparisons=${equivalents.join(',')}${comparedEquivalent ? `&equivalent=${comparedEquivalent.slug}` : ''}`,
    [baseValue, equivalents, comparedEquivalent]
  )
  const overScreenValues = useMemo(
    () =>
      overScreenComparateurValues(() => setOverScreen(undefined), {
        comparateur: { value: [], params },
      }),
    [params]
  )

  useEffect(() => {
    const onResize = () => {
      const extraWidth = window.screen.width < 700 ? (window.screen.width < 400 ? 100 : 150) : 200
      if (suffixButtonRef.current) {
        const { width } = suffixButtonRef.current.getBoundingClientRect()
        setSuffixStyle({ width: `${width + extraWidth}px`, paddingRight: `calc(${width}px + 2rem)` })
      }

      if (suffixDivRef.current) {
        const { width } = suffixDivRef.current.getBoundingClientRect()
        setSuffixStyle({ width: `${width + extraWidth}px`, paddingRight: `calc(${width}px + 2rem)` })
      }
    }
    onResize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [suffixButtonRef, suffixDivRef, comparedEquivalent])

  return (
    <ShareableContent<OverScreenComparateur>
      iframe={iframe}
      tracking={'Comparateur'}
      setOverScreen={setOverScreen}
      overScreen={overScreen ? overScreenValues[overScreen] : undefined}
      path='comparateur'
      name={!iframe ? 'Comparateur' : undefined}
      params={{
        comparateur: { value: [], params },
      }}
      noBorder>
      <div className={styles.topContainer}>
        <div className={styles.inputContainer}>
          <HiddenLabel htmlFor='input-base-value'>
            {comparedEquivalent
              ? formatName(
                  (('prefix' in comparedEquivalent && comparedEquivalent.prefix) || '') +
                    comparedEquivalent.name +
                    (('suffix' in comparedEquivalent && comparedEquivalent.suffix) || ''),
                  baseValue
                )
              : 'kg de CO₂'}
          </HiddenLabel>
          <Input
            min={0}
            background='white'
            className={styles.input}
            id='base-value'
            value={baseValue || ''}
            onChange={(e) => {
              const value = Number(e.target.value)
              setBaseValue(value)
            }}
            type='number'
            style={suffixStyle}
          />
          {comparedEquivalent ? (
            <button
              ref={suffixButtonRef}
              className={classNames(styles.greenSuffix, 'text-sm')}
              onClick={() => {
                setComparedEquivalent(undefined)
                setEquivalents([...equivalents, comparedEquivalent.slug])
              }}>
              <span>
                {formatName(
                  (('prefix' in comparedEquivalent && comparedEquivalent.prefix) || '') +
                    comparedEquivalent.name +
                    (('suffix' in comparedEquivalent && comparedEquivalent.suffix) || ''),
                  baseValue * weight
                )}
              </span>
              <Emoji>{comparedEquivalent.emoji}</Emoji>
              <Icon iconId='close-thick' />
            </button>
          ) : (
            <div className={classNames(styles.suffix, 'text-sm')} ref={suffixDivRef}>
              <span>
                kg CO<sub>2</sub>e
              </span>
            </div>
          )}
        </div>
        <div className={styles.description}>
          {comparedEquivalent ? (
            <>
              C’est{' '}
              <span className={styles.descriptionValue} data-testid='compared-equivalent-value'>
                {formatNumberPrecision(baseValue * weight)} CO2e
              </span>
              , soit autant d’émissions que pour fabriquer, consommer ou parcourir...
            </>
          ) : (
            'C’est autant d’émissions que pour fabriquer, consommer ou parcourir...'
          )}
        </div>
        {comparedEquivalent && (
          <>
            <NextLink
              href={comparedEquivalent.link}
              className={styles.equivalent}
              target='_blank'
              rel='noopener noreferrer'>
              <Emoji height='2.5rem'>{comparedEquivalent.emoji}</Emoji>
              <Icon iconId='link' />
            </NextLink>
            <Link
              target='_blank'
              rel='noopener noreferrer'
              href={comparedEquivalent.link}
              className={styles.equivalentLink}>
              Voir le détail
              <Icon iconId='link' />
            </Link>
          </>
        )}
      </div>
      <div className={iframe ? styles.bottomContainerIframe : styles.bottomContainer}>
        <Tiles changeEquivalents={() => setOverScreen('equivalents')} />
      </div>
    </ShareableContent>
  )
}

export default Comparateur
