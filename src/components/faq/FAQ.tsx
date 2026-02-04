'use client'
import { ElementType, useEffect, useState } from 'react'
import { FAQ as FAQType } from 'types/faq'
import { track } from 'utils/matomo'
import Dropdown from 'components/base/Dropdown'
import { DynamicNotionProps } from '../Notion/DynamicNotion'
import styles from './FAQ.module.css'

const FAQ = ({
  faq,
  page,
  loadingText,
  withAnchor,
}: {
  faq: Pick<FAQType, 'title' | 'content' | 'ancre'>
  page?: string
  loadingText?: string
  withAnchor?: boolean
}) => {
  const [display, setDisplay] = useState(false)
  const [DynamicNotion, setDynamicNotion] = useState<ElementType<DynamicNotionProps> | undefined>(undefined)

  useEffect(() => {
    if (display && !DynamicNotion) {
      track(page === 'Guide utilisation' ? page : 'FAQ', faq.title, page || 'FAQ')
      import('../Notion/DynamicNotion').then((module) => {
        setDynamicNotion(() => module.default)
      })
    }
  }, [display, DynamicNotion, page, faq.title])

  return faq.content ? (
    <Dropdown
      anchor={withAnchor ? faq.ancre || undefined : undefined}
      className={styles.faq}
      title={faq.title}
      onClick={(display) => {
        setDisplay(display)
      }}>
      {DynamicNotion ? <DynamicNotion recordMap={faq.content} /> : <p>{loadingText || 'Chargement en cours...'}</p>}
    </Dropdown>
  ) : null
}

export default FAQ
