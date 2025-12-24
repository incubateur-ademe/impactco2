'use client'

import { ElementType, useEffect, useState } from 'react'
import { fetchFaqs } from 'src/serverFunctions/faqs'
import { FAQ } from 'types/faq'
import { DynamicNotionProps } from '../Notion/DynamicNotion'
import FAQsList, { FAQSListProps } from './FAQsList'

const FAQsClient = ({ filter, ...rest }: { filter: string } & Omit<FAQSListProps, 'faqs'>) => {
  const [faqs, setFaqs] = useState<FAQ[]>([])
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
        const data = await fetchFaqs(filter)
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
  }, [filter])

  if (faqs.length === 0 || !DynamicNotion) {
    return <p>Chargement en cours...</p>
  }

  return <FAQsList faqs={faqs} small DynamicNotion={DynamicNotion} {...rest} />
}

export default FAQsClient
