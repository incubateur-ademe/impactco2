import { FAQCategory } from 'types/faq'
import { prismaClient } from './prismaClient'

export const getFAQs = async (filter?: string, language?: string) => {
  try {
    const normalizedLanguage = language?.toUpperCase() || 'FR'
    const faqs = await prismaClient.faq.findMany({
      select: { id: true, title: true, pages: true, categorie: true, ancre: true, outils: true, content: true },
      where: {
        language: normalizedLanguage,
        ...(filter ? { pages: { hasSome: [filter, 'Toutes les pages'] } } : undefined),
      },
      orderBy: { createdAt: 'asc' },
    })

    return faqs
      .filter((faq) => (filter ? faq.pages.some((page) => page === filter || page === 'Toutes les pages') : true))
      .map((faq) => ({
        title: faq.title,
        pages: faq.pages,
        content: faq.content,
        categorie: faq.categorie as FAQCategory,
        ancre: faq.ancre || undefined,
        outils: faq.outils,
      }))
  } catch {
    return []
  }
}
