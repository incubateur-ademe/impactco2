'use client'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { fetchFaqsSection } from 'src/serverFunctions/faqs'
import { FAQ as FAQType } from 'types/faq'
import FAQ from './FAQ'
import { FAQSListProps } from './FAQsList'
import styles from './FAQsList.module.css'

const FAQsClient = ({ filter, page }: { filter: string } & Omit<FAQSListProps, 'faqs'>) => {
  const { language } = useParamContext()
  const t = useTranslations('faq')
  const [faqs, setFaqs] = useState<FAQType[]>([])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await fetchFaqsSection(filter, language)
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

  if (faqs.length === 0) {
    return <p>{t('loading')}</p>
  }

  return (
    <>
      <ul>
        {faqs.map((faq) => (
          <FAQ key={faq.title} faq={faq} page={page} small loadingText={t('loading')} />
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
