'use client'

import dynamic from 'next/dynamic'
import { ElementType } from 'react'
import { FAQ as FAQType } from 'types/faq'
import { track } from 'utils/matomo'
import Dropdown from 'components/base/Dropdown'
import { DynamicNotionProps } from '../Notion/DynamicNotion'
import styles from './FAQ.module.css'

const DefaultDynamicNotion = dynamic(() => import('../Notion/DynamicNotion'))

const FAQ = ({
  faq,
  page,
  small,
  DynamicNotion,
}: {
  faq: Pick<FAQType, 'title' | 'content'>
  page?: string
  small?: boolean
  DynamicNotion?: ElementType<DynamicNotionProps>
}) => {
  const NotionComponent = DynamicNotion || DefaultDynamicNotion

  return faq.content ? (
    <Dropdown
      className={styles.faq}
      small={small}
      title={faq.title}
      onClick={(display) => {
        if (!display) {
          track(page === 'Guide utilisation' ? page : 'FAQ', faq.title, page || 'FAQ')
        }
      }}>
      <NotionComponent recordMap={faq.content} />
    </Dropdown>
  ) : null
}

export default FAQ
