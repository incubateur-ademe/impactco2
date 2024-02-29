import { LinkProps } from 'next/link'
import { ExtendedRecordMap } from 'notion-types'
import React, { ReactNode } from 'react'
import { NotionRenderer } from 'react-notion-x'
import { Collection } from 'react-notion-x/build/third-party/collection'
import 'react-notion-x/src/styles.css'
import Link from 'components/base/buttons/Link'
import Contenu from 'components/contenu/Contenu'
import styles from './Notion.module.css'
import { NotionStyles } from './Notion.styles'

const Notion = ({ title, recordMap }: { title: string; recordMap: ExtendedRecordMap }) => {
  return (
    <Contenu title={title}>
      <NotionStyles />
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
    </Contenu>
  )
}

export default Notion
