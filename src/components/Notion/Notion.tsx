'use client'

import dynamic from 'next/dynamic'
import { LinkProps } from 'next/link'
import { ExtendedRecordMap } from 'notion-types'
import { ReactNode, useEffect, useRef } from 'react'
import { Collection } from 'react-notion-x/build/third-party/collection'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import Block from 'components/layout/Block'
import Link from '../base/buttons/Link'
import NotionErrorBoundary from './NotionErrorBoundary'
import { improveAccessibility } from './utils'
import styles from './Notion.module.css'
import 'react-notion-x/src/styles.css'

const NotionRenderer = dynamic(() => import('react-notion-x').then((mod) => mod.NotionRenderer), {
  ssr: false,
})

const Notion = ({
  title,
  description,
  recordMap,
  previous,
  noTitle,
}: {
  title: string
  description?: string
  recordMap: ExtendedRecordMap | undefined
  previous?: { link: string; label: string }
  noTitle?: boolean
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current

    if (!container) {
      return
    }

    const applyAccessibility = () => {
      improveAccessibility(container, noTitle)
    }

    applyAccessibility()

    const observeConfig: MutationObserverInit = {
      childList: true,
      subtree: true,
    }

    let disposed = false
    const observer = new MutationObserver(() => {
      if (disposed) {
        return
      }
      observer.disconnect()
      applyAccessibility()
      if (!disposed) {
        observer.observe(container, observeConfig)
      }
    })

    observer.observe(container, observeConfig)

    return () => {
      disposed = true
      observer.disconnect()
    }
  }, [recordMap, noTitle])

  return (
    <>
      <Breadcrumbs links={[{ link: '/', label: 'Accueil' }].concat(previous || [])} current={title} />
      {recordMap && (
        <Block title={title} description={description} as='h1'>
          <div className={styles.container} ref={ref}>
            <NotionErrorBoundary>
              <NotionRenderer
                recordMap={recordMap}
                fullPage={true}
                disableHeader
                isLinkCollectionToUrlProperty
                components={{
                  Link: ({ href, children, ...props }: LinkProps & { children: ReactNode }) => {
                    if (href.toString().startsWith('https://sources/')) {
                      return (
                        <button
                          className={styles.buttonRef}
                          onClick={() => {
                            const block = document.getElementsByClassName(
                              `notion-block-${href.toString().replace('https://sources/', '')}`
                            )
                            if (block && block[0]) {
                              block[0].scrollIntoView({ behavior: 'smooth' })
                            }
                          }}>
                          ({children})
                        </button>
                      )
                    }
                    return (
                      // @ts-expect-error: notion type error
                      <Link href={href} {...props} target='_blank' rel='noopener noreferrer'>
                        {children}
                      </Link>
                    )
                  },
                  Collection,
                }}
              />
            </NotionErrorBoundary>
          </div>
        </Block>
      )}
    </>
  )
}

export default Notion
