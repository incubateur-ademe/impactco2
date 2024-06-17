'use server'

import React from 'react'
import { getFAQs } from 'utils/faq'
import FAQsList, { FAQSListProps } from './FAQsList'

const FAQs = async ({
  filter,
  ...rest
}: {
  filter: string
} & Omit<FAQSListProps, 'faqs'>) => {
  const faqs = await getFAQs()
  return <FAQsList faqs={faqs.filter((faq) => faq.pages.includes(filter))} {...rest} />
}

export default FAQs
