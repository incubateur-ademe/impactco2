'use server'

import { getFAQs } from 'utils/faq'

export const fetchFaqs = async (filter?: string) => {
  try {
    return await getFAQs(filter)
  } catch (error) {
    console.error('Unable to fetch FAQs via server function', error)
    return []
  }
}
