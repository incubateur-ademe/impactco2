import React, { useEffect, useRef, useState } from 'react'
import ColumnEquivalent from 'components/externalModules/shopify/ColumnEquivalent'
import Equivalent from 'components/externalModules/shopify/Equivalent'

const Etiquette = ({
  comparisons,
  baseValue,
  animated,
}: {
  comparisons: string[]
  baseValue: string
  animated?: boolean
}) => {
  const [inline, setInline] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onResize = () => {
      if (ref.current && ref.current.parentElement) {
        const { width } = ref.current.parentElement.getBoundingClientRect()
        setInline(width > (comparisons.length + 1) * 175)
      }
    }
    onResize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [comparisons])

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
}

export default Etiquette
