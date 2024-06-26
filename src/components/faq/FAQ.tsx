'use client'

import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { LinkProps } from 'next/link'
import React, { ReactNode, useState } from 'react'
import 'react-notion-x/src/styles.css'
import { FAQ as FAQType } from 'types/faq'
import { track } from 'utils/matomo'
import Link from 'components/base/buttons/Link'
import PlusIcon from 'components/base/icons/plus'
import styles from './FAQ.module.css'

const NotionRenderer = dynamic(() => import('react-notion-x').then((mod) => mod.NotionRenderer))
const Collection = dynamic(() => import('react-notion-x/build/third-party/collection').then((mod) => mod.Collection))

const FAQ = ({ faq, page }: { faq: Pick<FAQType, 'title' | 'content'>; page?: string }) => {
  const [display, setDisplay] = useState(false)
  return faq.content ? (
    <div className={styles.faq}>
      <button
        className={styles.title}
        onClick={() => {
          if (!display) {
            track(page === 'Guide utilisation' ? page : 'FAQ', faq.title, page || 'FAQ')
          }
          setDisplay(!display)
        }}>
        {faq.title}
        <div
          className={classNames(styles.button, { [styles.openButton]: display })}
          title={display ? 'Cacher la réponse' : 'Voir la réponse'}>
          <PlusIcon />
        </div>
      </button>
      {display && (
        <div className={styles.content}>
          <NotionRenderer
            recordMap={faq.content}
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
      )}
    </div>
  ) : null
}

export default FAQ
