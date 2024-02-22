import classNames from 'classnames'
import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { Icon } from 'components/osezchanger/icons'
import Logo from '../Logo'
import SimpleValue from '../SimpleValue'
import styles from './Detector.module.css'

export const regex =
  /([0-9]+(,|\.)?[0-9]*)(\s|&nbsp;)?(kg|kilo(s)?|g|t|tonne(s)?)(\s|&nbsp;)?(de\s|&nbsp;)?(d’équivalent\s|&nbsp;)?(co(2|₂|<sub>2<\/sub>)|dioxyde de carbone)(eq|équivalent|e)?/i

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

const getFactor = (unit: string) => {
  switch (unit) {
    case 't':
    case 'tonne':
    case 'tonnes':
      return 1000000
    case 'kilo':
    case 'kilos':
    case 'kg':
      return 1000
    default:
      return 1
  }
}

const Detector = ({ impact }: { impact: string }) => {
  const [display, setDisplay] = useState('')
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  const ref = useRef<HTMLDivElement>(null)
  const etiquetteRef = useRef<HTMLDivElement>(null)

  const value = useMemo(() => {
    const values = regex.exec(impact)
    if (values) {
      return Number(values[1].replace(',', '.')) * getFactor(values[4])
    }
    return 0
  }, [impact])

  const onClick = useCallback(() => {
    {
      if (etiquetteRef.current && !display) {
        const distances = etiquetteRef.current.getBoundingClientRect()
        const xOverflow = getOverflow(etiquetteRef.current)
        setDisplay(`${distances.top < 0 ? 'bottom' : ''}-${xOverflow}`)
      }

      if (display) {
        setDisplay('')
      }
    }
  }, [display])

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setDisplay('')
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    <div className={styles.container} ref={ref}>
      <button
        className={styles.value}
        onClick={onClick}
        dangerouslySetInnerHTML={{
          __html: impact,
        }}
      />
      <div
        className={classNames(styles.etiquette, {
          [styles.hide]: !display,
          [styles.bottom]: display.includes('bottom'),
          [styles.right]: display.includes('right'),
          [styles.left]: display.includes('left'),
        })}
        ref={etiquetteRef}>
        <Logo value={value} />
        <div className={styles.simpleValue}>
          <SimpleValue value={value} comparison='random' />
        </div>
        <button className={styles.random} onClick={forceUpdate}>
          <Icon iconId='refresh' />
        </button>
      </div>
    </div>
  )
}

export default Detector
