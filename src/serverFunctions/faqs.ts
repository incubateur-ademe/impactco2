'use server'

import { getFAQs } from 'utils/faq'

export const fetchFaqsByTool = async (tool: string, language?: string) => {
  try {
    const faqs = await getFAQs(undefined, language)
    return faqs.filter((faq) => faq.outils.includes('Tous les outils') || faq.outils.includes(tool))
  } catch (error) {
    console.error('Unable to fetch FAQs via server function', error)
    return []
  }
}
