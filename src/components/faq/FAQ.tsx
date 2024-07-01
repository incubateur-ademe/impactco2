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
          <DynamicNotion recordMap={faq.content} />
        </div>
      )}
    </div>
  ) : null
}

export default FAQ
