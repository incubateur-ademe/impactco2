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
  small,
  loadingText,
}: {
  faq: Pick<FAQType, 'title' | 'content'>
  page?: string
  small?: boolean
  loadingText?: string
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
      className={styles.faq}
      small={small}
      title={faq.title}
      onClick={(display) => {
        setDisplay(display)
      }}>
      {DynamicNotion ? <DynamicNotion recordMap={faq.content} /> : <p>{loadingText || 'Chargement en cours...'}</p>}
    </Dropdown>
  ) : null
}

export default FAQ
