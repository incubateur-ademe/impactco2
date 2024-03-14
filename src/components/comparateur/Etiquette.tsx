import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import { Language } from 'types/equivalent'
import ColumnEquivalent from 'components/externalModules/shopify/ColumnEquivalent'
import Equivalent from 'components/externalModules/shopify/Equivalent'

export default forwardRef(function Etiquette(
  {
    comparisons,
    baseValue,
    animated,
    language,
  }: {
    comparisons: string[]
    baseValue: string
    animated?: boolean
    language?: Language
  },
  ref: ForwardedRef<HTMLDivElement>
) {
  const [inline, setInline] = useState(true)

  useEffect(() => {
    const onResize = () => {
      if (typeof ref !== 'function' && ref && ref.current && ref.current.parentElement) {
        const { width } = ref.current.parentElement.getBoundingClientRect()
        setInline(width > (comparisons.length + 1) * 175)
      }
    }
    onResize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [comparisons, ref])

  if (animated) {
    return <Equivalent language={language} baseValue={baseValue} comparisons={comparisons} animated />
  }
  return (
    <div ref={ref}>
      {inline ? (
        <Equivalent language={language} baseValue={baseValue} comparisons={comparisons} />
      ) : (
        <ColumnEquivalent language={language} baseValue={baseValue} comparisons={comparisons} />
      )}
    </div>
  )
})
