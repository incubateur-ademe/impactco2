'use server'

import { getFAQs } from 'utils/faq'

export const fetchFaqsSection = async (section: string, language?: string) => {
  try {
    const faqs = await getFAQs(undefined, language)
    return faqs.filter((faq) => faq.section === section)
  } catch (error) {
    console.error('Unable to fetch FAQs via server function', error)
    return []
  }
}
