'use server'

import React from 'react'
import { getFAQs } from 'utils/faq'
import FAQsList, { FAQSListProps } from './FAQsList'

const FAQs = async ({
  filter,
  ...rest
}: {
  filter: string
} & Omit<FAQSListProps, 'faqs' | 'title' | 'description' | 'link' | 'linkLabel'>) => {
  const faqs = await getFAQs()
  return (
    <FAQsList
      faqs={faqs.filter((faq) => faq.pages.includes(filter))}
      title='Questions fréquentes'
      description='Explorer la FAQ pour trouver les réponses à vos questions'
      {...rest}
    />
  )
}

export default FAQs
