import Link, { LinkProps } from 'next/link'
import { ExtendedRecordMap } from 'notion-types'
import React, { ReactNode } from 'react'
import { NotionRenderer } from 'react-notion-x'
import 'react-notion-x/src/styles.css'
import Contenu from 'components/contenu/Contenu'

const Notion = ({ title, recordMap }: { title: string; recordMap: ExtendedRecordMap }) => {
  return (
    <Contenu title={title}>
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
                  className='notion-link'
                  onClick={() => {
                    const block = document.getElementsByClassName(
                      `notion-block-${href.toString().replace('https://sources/', '')}`
                    )
                    if (block && block[0]) {
                      block[0].scrollIntoView({ behavior: 'smooth' })
                    }
                  }}>
                  {children}
                </button>
              )
            }
            return (
              <Link href={href} {...props} target='_blank' rel='noopener noreferrer'>
                {children}
              </Link>
            )
          },
        }}
      />
    </Contenu>
  )
}

export default Notion
