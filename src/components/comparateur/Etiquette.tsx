import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import ColumnEquivalent from 'components/externalModules/shopify/ColumnEquivalent'
import Equivalent from 'components/externalModules/shopify/Equivalent'

export default forwardRef(function Etiquette(
  {
    comparisons,
    baseValue,
    animated,
  }: {
    comparisons: string[]
    baseValue: string
    animated?: boolean
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
    return <Equivalent baseValue={baseValue} comparisons={comparisons} animated />
  }
  return (
    <div ref={ref}>
      {inline ? (
        <Equivalent baseValue={baseValue} comparisons={comparisons} />
      ) : (
        <ColumnEquivalent baseValue={baseValue} comparisons={comparisons} />
      )}
    </div>
  )
})
