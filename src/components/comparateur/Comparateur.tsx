import classNames from 'classnames'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import formatName from 'utils/formatName'
import useParamContext from 'components/providers/ParamProvider'
import Emoji from 'components/base/Emoji'
import { HiddenLabel } from 'components/form/HiddenLabel'
import Input from 'components/form/Input'
import ShareableContent from 'components/misc/ShareableContent'
import { OverScreenCategory } from 'components/misc/category/overScreens/Type'
import { overScreenCategoryValues } from 'components/misc/category/overScreens/Values'
import { Icon } from 'components/osezchanger/icons'
import styles from './Comparateur.module.css'
import Tiles from './Tiles'

const Comparateur = ({ iframe }: { iframe?: boolean }) => {
  const {
    comparateur: { baseValue, setBaseValue, setEquivalents, equivalents, comparedEquivalent, setComparedEquivalent },
  } = useParamContext()
  const [overScreen, setOverScreen] = useState<OverScreenCategory>()
  const overScreenValues = useMemo(() => overScreenCategoryValues(), [])

  const weight = comparedEquivalent ? comparedEquivalent.value : 1000
  return (
    <ShareableContent<OverScreenCategory>
      iframe={iframe}
      size='lg'
      tracking={'Comparateur'}
      setOverScreen={setOverScreen}
      overScreen={overScreen ? overScreenValues[overScreen] : undefined}
      path='comparateur'
      name={!iframe ? 'Comparateur' : undefined}
      reverse
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
            value={Math.round((1000 * baseValue) / weight) / 1000}
            onChange={(e) => {
              const value = Number(e.target.value)
              setBaseValue(Number.isNaN(value) || value < 0 ? 0 : Math.round(value * weight))
            }}
            type='number'
          />
          {comparedEquivalent ? (
            <button
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
                  baseValue
                )}
              </span>
              <Emoji>{comparedEquivalent.emoji}</Emoji>
              <Icon iconId='close-thick' />
            </button>
          ) : (
            <div className={classNames(styles.suffix, 'text-sm')}>
              <span>
                kg CO<sub>2</sub>e
              </span>
            </div>
          )}
        </div>
        <div className={styles.description}>C’est autant d’émissions que pour fabriquer, consommer ou parcourir...</div>
        {comparedEquivalent && (
          <Link href={comparedEquivalent.link} className={styles.equivalent} target='_blank' rel='noopener noreferrer'>
            <Emoji height='2.5rem'>{comparedEquivalent.emoji}</Emoji>
            <Icon iconId='link' />
          </Link>
        )}
      </div>
      <div className={iframe ? styles.bottomContainerIframe : styles.bottomContainer}>
        <Tiles />
      </div>
    </ShareableContent>
  )
}

export default Comparateur
