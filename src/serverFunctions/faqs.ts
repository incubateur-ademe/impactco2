'use server'

import { getFAQs } from 'utils/faq'

export const fetchFaqs = async (filter?: string, language?: string) => {
  try {
    return await getFAQs(filter, language)
  } catch (error) {
    console.error('Unable to fetch FAQs via server function', error)
    return []
  }
}
