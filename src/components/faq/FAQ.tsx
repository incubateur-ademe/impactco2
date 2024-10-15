'use client'

import classNames from 'classnames'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { FAQ as FAQType } from 'types/faq'
import { track } from 'utils/matomo'
import PlusIcon from 'components/base/icons/plus'
import styles from './FAQ.module.css'

const DynamicNotion = dynamic(() => import('../Notion/DynamicNotion'))

const FAQ = ({ faq, page }: { faq: Pick<FAQType, 'title' | 'content'>; page?: string }) => {
  const [display, setDisplay] = useState(false)
  return faq.content ? (
    <li className={styles.faq}>
      <button
        className={styles.title}
        aria-expanded={display}
        aria-controls={`${faq.title}-content`}
        onClick={() => {
          if (!display) {
            track(page === 'Guide utilisation' ? page : 'FAQ', faq.title, page || 'FAQ')
          }
          setDisplay(!display)
        }}>
        <h3>{faq.title}</h3>
        <span className={classNames(styles.button, { [styles.openButton]: display })}>
          <PlusIcon />
        </span>
      </button>
      {display && (
        <div className={styles.content} id={`${faq.title}-content`}>
          <DynamicNotion recordMap={faq.content} />
        </div>
      )}
    </li>
  ) : null
}

export default FAQ
