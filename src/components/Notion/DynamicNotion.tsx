import { LinkProps } from 'next/link'
import { ExtendedRecordMap } from 'notion-types'
import { ReactNode, useEffect, useRef } from 'react'
import { NotionRenderer } from 'react-notion-x'
import { Collection } from 'react-notion-x/build/third-party/collection'
import Link from 'components/base/buttons/Link'
import { improveAccessibility } from './utils'
import 'react-notion-x/src/styles.css'

export type DynamicNotionProps = { recordMap: ExtendedRecordMap }
const DynamicNotion = ({ recordMap }: DynamicNotionProps) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) {
      if (ref.current) {
        improveAccessibility(ref.current)
      }
    }
  }, [ref])
  return (
    <div ref={ref} className='notion'>
      <NotionRenderer
        recordMap={recordMap}
        components={{
          Collection,
          Link: ({ href, children, ...props }: LinkProps & { children: ReactNode }) => {
            return (
              // @ts-expect-error: notion type error
              <Link href={href} {...props} target='_blank' rel='noopener noreferrer'>
                {children}
              </Link>
            )
          },
        }}
      />
    </div>
  )
}

export default DynamicNotion
