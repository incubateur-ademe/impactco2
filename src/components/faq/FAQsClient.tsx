'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ElementType, useEffect, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { fetchFaqs } from 'src/serverFunctions/faqs'
import { FAQ as FAQType } from 'types/faq'
import { DynamicNotionProps } from '../Notion/DynamicNotion'
import FAQ from './FAQ'
import { FAQSListProps } from './FAQsList'
import styles from './FAQsList.module.css'

const FAQsClient = ({ filter, page }: { filter: string } & Omit<FAQSListProps, 'faqs'>) => {
  const { language } = useParamContext()
  const t = useTranslations('faq')
  const [faqs, setFaqs] = useState<FAQType[]>([])
  const [DynamicNotion, setDynamicNotion] = useState<ElementType<DynamicNotionProps> | undefined>(undefined)

  useEffect(() => {
    import('../Notion/DynamicNotion').then((module) => {
      setDynamicNotion(() => module.default)
    })
  }, [])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await fetchFaqs(filter, language)
        if (!cancelled) {
          setFaqs(data)
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Unable to load FAQs', error)
          setFaqs([])
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [filter, language])

  if (faqs.length === 0 || !DynamicNotion) {
    return <p>{t('loading')}</p>
  }

  return (
    <>
      <ul>
        {faqs.map((faq) => (
          <FAQ key={faq.title} faq={faq} page={page} DynamicNotion={DynamicNotion} small />
        ))}
      </ul>
      <div className={classNames(styles.footer, styles.footerTop)}>
        <p>{t('notFound')}</p>
        <ul className={styles.footer}>
          <li className={styles.footer}>
            <Link href={`/suggestion?fromLabel=${page}`}>{t('contact')}</Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default FAQsClient
