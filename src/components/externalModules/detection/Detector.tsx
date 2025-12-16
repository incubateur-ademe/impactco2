import classNames from 'classnames'
import { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SimpleEquivalent } from 'types/equivalent'
import values from 'utils/Equivalent/values.json'
import { track } from 'utils/matomo'
import RefreshIcon from 'components/base/icons/refresh'
import { RandomCategory, getRandomEquivalentForValue } from 'components/comparateur/randomEtiquette'
import Logo from '../Logo'
import SimpleValue, { getRandomEquivalent } from '../SimpleValue'
import styles from './Detector.module.css'

export const regexs = {
  fr: /([0-9]+(?:[,.\s|&nbsp;][0-9]+)*)(?:\s|&nbsp;)*(milliers?|milles?|millions?|milliards?|gigas?|mégas?|megas?)?(?:\s|&nbsp;)*(?:de(?:\s|&nbsp;)*)?(gigatonnes?|gigatons?|kgs?|kilos?|kilo(?:&shy;|­)?grammes?|tonnes?|(?:\(\s*)?[mMgG]t(?:\s*\))?|[gt])(?:\s|&nbsp;)*(?:\(\s*[mMgG]t\s*\))?(?:\s|&nbsp;)*(?:d'émissions(?:\s|&nbsp;)*)?(?:de(?:\s|&nbsp;)*)?(?:d['']équivalent(?:\s|&nbsp;)*)?(eq|équivalent|éq)?(?:\s|&nbsp;)*(c(?:o|0)(?:2|₂|<sub>2(?:\s|&nbsp;)*<\/sub>)|dioxyde de carbone)(?:eq|(?:(?:\s|&nbsp;)*équivalent)|e)?/i,
  en: /([0-9]+(?:[,.\s|&nbsp;][0-9]+)*)(?:\s|&nbsp;)*(thousands?|millions?|billions?|gigas?|megas?)?(?:\s|&nbsp;)*(?:of(?:\s|&nbsp;)*)?(gigatonnes?|gigatons?|kgs?|kilos?|kilo(?:&shy;|­)?grams?|tonnes?|tons?|(?:\(\s*)?[mMgG]t(?:\s*\))?|[gt])(?:\s|&nbsp;)*(?:\(\s*[mMgG]t\s*\))?(?:\s|&nbsp;)*(?:of(?:\s|&nbsp;)*)?(?:emissions(?:\s|&nbsp;)*)?(?:of(?:\s|&nbsp;)*)?(equivalent|eq)?(?:\s|&nbsp;)*(c(?:o|0)(?:2|₂|<sub>2(?:\s|&nbsp;)*<\/sub>)|carbon (?:di)?oxide)(?:eq|(?:(?:\s|&nbsp;)*equivalent)|e)?/i,
}

const getComputedStyle = (el: Element, property: string) => {
  if (document.defaultView) {
    const computedStyle = document.defaultView.getComputedStyle(el, null)
    return computedStyle.getPropertyValue(property)
  }
  return ''
}
const isOverflowHidden = (el: Element) => getComputedStyle(el, 'overflow') === 'hidden'

const getOverflow = (element: HTMLDivElement) => {
  const elPositioning = element.getBoundingClientRect()
  if (elPositioning.left < 0) {
    return 'left'
  }

  let parent = element.parentNode as Element
  while (parent) {
    if (parent.nodeType !== 9 && isOverflowHidden(parent)) {
      const parentElPositioning = parent.getBoundingClientRect()

      if (elPositioning.x < parentElPositioning.x) {
        return 'left'
      }

      if (elPositioning.x + elPositioning.width > parentElPositioning.x + parentElPositioning.width) {
        return 'right'
      }
    }
    parent = parent.parentNode as Element
  }

  return ''
}

const getUnitFactor = (unit: string) => {
  if (!unit) {
    return 1
  }

  const lowerUnit = unit.toLowerCase().replace(/[()\s]/g, '')

  if (lowerUnit === 'gt' || lowerUnit.includes('gigatonne') || lowerUnit.includes('gigaton')) {
    return 1000000000000000
  }

  if (lowerUnit === 'mt') {
    return 1000000000000
  }

  if (lowerUnit === 't' || lowerUnit.includes('ton')) {
    return 1000000
  }

  if (lowerUnit === 'kg' || lowerUnit === 'kgs' || lowerUnit.includes('kilo')) {
    return 1000
  }

  return 1
}

const getFactor = (unit: string) => {
  if (!unit) {
    return 1
  }

  const lowerUnit = unit.toLowerCase()

  if (lowerUnit.includes('milliard') || lowerUnit.includes('billion')) {
    return 1000000000
  }
  if (lowerUnit.includes('million')) {
    return 1000000
  }
  if (lowerUnit.includes('millier') || lowerUnit.includes('mille') || lowerUnit.includes('thousand')) {
    return 1000
  }
  if (lowerUnit === 'giga' || lowerUnit === 'gigas') {
    return 1000000000
  }
  if (lowerUnit === 'méga' || lowerUnit === 'mega' || lowerUnit === 'mégas' || lowerUnit === 'megas') {
    return 1000000
  }

  return 1
}

export const getValue = (regexResult: string[], language: 'fr' | 'en') => {
  const numberStr = regexResult[1]
    .replace(/,/g, '.') // virgule -> point décimal
    .replace(/&nbsp;/g, '') // supprime &nbsp;
    .replace(/\s/g, '') // supprime espaces

  const number = Number(numberStr)

  // Groupe 2: multiplicateur (million, milliard, etc.)
  const multiplier = getFactor(regexResult[2])

  // Groupe 3: unité (kg, t, Mt, Gt, gigatonnes, etc.)
  const unit = regexResult[3]
  const unitFactor = getUnitFactor(unit)

  return number * multiplier * unitFactor
}

const transportEquivalents = [
  'tgv-paris-berlin',
  'tgv-paris-marseille',
  'avion-pny',
  'voiture-lille-nimes',
  'terre-voiture',
  'trainenfrancejour',
  'voiturefrancaiseheure',
  'voiturefrancaisejour',
  'aviationcivileenfrance',
  'voiturefrancaisean',
]
const voitureEquivalents = [
  'voiturethermique',
  'terre-voiture',
  'voiturefrancaiseheure',
  'voiturefrancaisejour',
  'voiturefrancaisean',
]
const numeriqueEquivalents = [
  'game-of-thrones',
  'friends',
  'harry-potter',
  'datacenterjour',
  'numeriqueenfrance',
  'numeriqueenfrancejour',
]

const allEquivalents = values as Record<string, SimpleEquivalent>
const equivalentCategories: Record<RandomCategory, Record<string, SimpleEquivalent>> = {
  all: allEquivalents,
  transport: Object.fromEntries(
    Object.entries(allEquivalents).filter(
      ([key, equivalent]) => transportEquivalents.includes(key) || equivalent.category === 4
    )
  ),
  voiture: Object.fromEntries(Object.entries(allEquivalents).filter(([key]) => voitureEquivalents.includes(key))),
  numerique: Object.fromEntries(
    Object.entries(allEquivalents).filter(
      ([key, equivalent]) =>
        numeriqueEquivalents.includes(key) || equivalent.category === 1 || equivalent.category === 10
    )
  ),
  custom: {},
}

const getCustomEquivalents = (customEquivalents?: string) => {
  if (!customEquivalents) {
    return {}
  }
  const equivalents = customEquivalents.split(',').map((equivalent) => equivalent.trim())
  return Object.fromEntries(Object.entries(allEquivalents).filter(([key]) => equivalents.includes(key)))
}

const Detector = ({
  impact,
  language,
  category,
  customEquivalents,
}: {
  impact: string
  language: 'fr' | 'en'
  category: RandomCategory
  customEquivalents?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const etiquetteRef = useRef<HTMLDivElement>(null)

  // inspired from https://usehooks-ts.com/react-hook/use-intersection-observer
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [observed, setObserved] = useState(false)
  const [display, setDisplay] = useState('')

  useEffect(() => {
    const node = ref.current // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver
    if (!hasIOSupport || !node) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => setEntry(entry))
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref])

  useEffect(() => {
    if (!observed && entry && entry.isIntersecting) {
      setObserved(true)
      track('Detecteur carbone', 'View', window.location.href)
    }
  }, [entry, observed])

  const onClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      event.stopPropagation()
      track('Detecteur carbone', 'Click', impact)
      if (etiquetteRef.current && !display) {
        const distances = etiquetteRef.current.getBoundingClientRect()
        const xOverflow = getOverflow(etiquetteRef.current)
        setDisplay(`${distances.top < 0 ? 'bottom' : ''}-${xOverflow}`)
      }

      if (display) {
        setDisplay('')
      }
    },
    [display, impact]
  )
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setDisplay('')
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDisplay('')
      }
    }

    document.addEventListener('click', handleClickOutside, true)
    document.addEventListener('keydown', handleKeyDown, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
      document.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [])

  const value = useMemo(() => {
    const values = regexs[language].exec(impact)
    if (values) {
      return getValue(values, language)
    }
    return 0
  }, [impact, language])

  const startingEquivalents = useMemo(() => {
    return getRandomEquivalentForValue(value, category)
  }, [value, category])

  const meaningfullEquivalents = useMemo(() => {
    const equivalents = category === 'custom' ? getCustomEquivalents(customEquivalents) : equivalentCategories[category]
    return Object.entries(equivalents).filter(
      ([, ecv]) => value / ecv.value >= 1 && value / ecv.value <= 99_999 && ecv.value > 0
    )
  }, [value, category])

  const [count, setCount] = useState(0)
  const [equivalent, setEquivalent] = useState<string | null>(getRandomEquivalent(meaningfullEquivalents)?.slug || null)

  const refresh = useCallback(() => {
    setCount((prevCount) => prevCount + 1)
    if (count >= startingEquivalents.length && meaningfullEquivalents.length > 1) {
      let newEquivalent = equivalent
      while (newEquivalent === equivalent) {
        newEquivalent = getRandomEquivalent(meaningfullEquivalents)?.slug || null
      }

      setEquivalent(newEquivalent)
    }
  }, [startingEquivalents, count])

  return (
    <div className={styles.container} ref={ref}>
      <button
        aria-expanded={!!display}
        className={classNames(styles.value, 'impactCO2-etiquette-detected-value')}
        onClick={onClick}
        dangerouslySetInnerHTML={{
          __html: impact + '<span class="ico2-hidden">Comprendre cette valeur</span>',
        }}
      />
      <div
        data-testId='etiquette'
        aria-labelledby='etiquette-value'
        className={classNames(styles.etiquette, {
          [styles.hide]: !display,
          [styles.bottom]: display.includes('bottom'),
          [styles.right]: display.includes('right'),
          [styles.left]: display.includes('left'),
        })}
        ref={etiquetteRef}>
        <Logo value={value} onClick={() => track('Detecteur carbone', 'Logo', 'logo')} />
        <div className={styles.simpleValue}>
          <SimpleValue
            language={language}
            value={value}
            // Dirty tricks to refresh random values...
            comparison={startingEquivalents[count] || equivalent}
            id='etiquette-value'
          />
        </div>
        {(count < startingEquivalents.length ||
          (count >= startingEquivalents.length && meaningfullEquivalents.length > 1)) && (
          <button
            className={styles.random}
            title='Obtenir une nouvelle comparaison'
            onClick={() => {
              refresh()
              track('Detecteur carbone', 'Reload', 'reload')
            }}>
            <RefreshIcon />
          </button>
        )}
      </div>
    </div>
  )
}

export default Detector
