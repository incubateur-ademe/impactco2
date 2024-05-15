'use client'

import classNames from 'classnames'
import { LinkProps } from 'next/link'
import React, { ReactNode, useState } from 'react'
import { NotionRenderer } from 'react-notion-x'
import { Collection } from 'react-notion-x/build/third-party/collection'
import 'react-notion-x/src/styles.css'
import { FAQ as FAQType } from 'types/faq'
import Link from 'components/base/buttons/Link'
import PlusIcon from 'components/base/icons/plus'
import styles from './FAQ.module.css'

const FAQ = ({ faq }: { faq: FAQType }) => {
  const [display, setDisplay] = useState(false)
  return faq.content ? (
    <div className={styles.faq}>
      <button className={styles.title} onClick={() => setDisplay(!display)}>
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
