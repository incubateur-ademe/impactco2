'use client'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'
import Etiquette from './Etiquette'

const RandomEtiquette = ({ columnClassName }: { columnClassName?: string }) => {
  const [key, setKey] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  return (
    <Etiquette
      ref={ref}
      key={`${key}-${pathname}`}
      comparisons={['random']}
      baseValue={100_000}
      language='fr'
      randomize={() => setKey((prev) => prev + 1)}
      columnClassName={columnClassName}
    />
  )
}

export default RandomEtiquette
