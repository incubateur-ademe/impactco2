'use client'

import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { SimpleEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import formatNumber from 'utils/formatNumber'
import CloseIcon from 'components/base/icons/close'
import InformationIcon from 'components/base/icons/information'
import { getValues } from '../SimpleValue'
import styles from './Disclaimer.module.css'

const getDisclaimer = (language: string, comparisons: string[], factor: number) => {
  const equivalent = comparisons.length === 1 && comparisons[0] !== 'random' ? getValues(comparisons[0], 1) : ''

  if (language === 'en') {
    return equivalent
      ? `CO2e corresponds to the carbon impact of ${formatNumber(factor)} ${getName(language, { slug: equivalent.slug, ...equivalent.equivalent }, true, factor)}.`
      : comparisons.length === 1
        ? `CO2e corresponds to the carbon impact of the equivalent listed in this tag.`
        : `CO2e corresponds to the carbon impact of the ${comparisons.length} equivalents listed in this tag.`
  }

  if (language === 'es') {
    return equivalent
      ? `de CO2e corresponden al impacto de carbono de ${formatNumber(factor)} ${getName(language, { slug: equivalent.slug, ...equivalent.equivalent }, true, factor)}`
      : comparisons.length === 1
        ? `de CO2e corresponden al impacto de carbono del equivalente enumerado en esta etiqueta.`
        : `de CO2e corresponden al impacto de carbono de los ${comparisons.length} equivalentes enumerados en esta etiqueta`
  }

  return equivalent
    ? `CO2e correspondent à l’impact carbone de ${formatNumber(factor)} ${getName(language, { slug: equivalent.slug, ...equivalent.equivalent }, true, factor)}`
    : comparisons.length === 1
      ? `CO2e correspondent à l’impact carbone de l'équivalent listé dans cette étiquette.`
      : `CO2e correspondent à l’impact carbone des ${comparisons.length} équivalents listés dans cette étiquette.`
}

const basis = {
  fr: 'L’ADEME garantit exclusivement',
  en: 'ADEME exclusively guarantees',
  es: 'ADEME garantiza exclusivamente',
} as Record<string, string>

const ques = {
  fr: 'que ',
  en: 'that ',
  es: 'que ',
} as Record<string, string>

const Disclaimer = ({
  comparisons,
  language,
  value,
  unit,
  column,
}: {
  comparisons: string[]
  language: string
  value: number
  unit: string
  column?: boolean
}) => {
  const [display, setDisplay] = useState(false)
  const [factor, setFactor] = useState<number | undefined>(
    comparisons.length !== 1 || comparisons[0] === 'random'
      ? undefined
      : getValues(comparisons[0], value).equivalent.value
  )

  useEffect(() => {
    setFactor(
      comparisons.length !== 1 || comparisons[0] === 'random'
        ? undefined
        : getValues(comparisons[0], value).equivalent.value
    )
  }, [comparisons, value])

  return (
    <>
      {display && (
        <div className={classNames(styles.disclaimer, { [styles.disclaimerColumn]: column })}>
          {basis[language]}
          <br />
          {ques[language]} {value} {unit}{' '}
          {getDisclaimer(language, comparisons, factor ? (unit === 'g' ? value : value * 1000) / factor : 0)}
        </div>
      )}
      <button
        title='Afficher les informations de contenus'
        className={classNames(styles.button, { [styles.opened]: display, [styles.buttonColumn]: column })}
        onClick={() => setDisplay(!display)}>
        {display ? <CloseIcon /> : <InformationIcon />}
      </button>
    </>
  )
}

export default Disclaimer
