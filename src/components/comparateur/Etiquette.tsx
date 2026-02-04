'use client'

import classNames from 'classnames'
import { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import { Language } from 'types/equivalent'
import ColumnEquivalent from 'components/externalModules/shopify/ColumnEquivalent'
import EmptyEquivalent from 'components/externalModules/shopify/EmptyEquivalent'
import Equivalent from 'components/externalModules/shopify/Equivalent'

export default forwardRef(function Etiquette(
  {
    comparisons,
    baseValue,
    animated,
    language,
    randomize,
    className,
    columnClassName,
  }: {
    comparisons: string[]
    baseValue: string | number
    animated?: boolean
    language: Language
    randomize?: () => void
    className?: string
    columnClassName?: string
  },
  ref: ForwardedRef<HTMLDivElement>
) {
  const [inline, setInline] = useState(true)

  useEffect(() => {
    const onResize = () => {
      if (typeof ref !== 'function' && ref && ref.current && ref.current.parentElement) {
        const { width } = ref.current.parentElement.getBoundingClientRect()
        setInline(width > (animated ? 2 : comparisons?.length + 1) * 175)
      }
    }
    onResize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [comparisons, ref, animated])

  return (
    <div ref={ref} className={classNames(className, { [columnClassName || '']: !inline })}>
      {Number(baseValue) === 0 ? (
        <EmptyEquivalent />
      ) : inline ? (
        <Equivalent
          language={language}
          baseValue={baseValue}
          comparisons={comparisons}
          randomize={randomize}
          animated={animated}
        />
      ) : (
        <ColumnEquivalent
          language={language}
          baseValue={baseValue}
          comparisons={comparisons}
          randomize={randomize}
          animated={animated}
        />
      )}
    </div>
  )
})
