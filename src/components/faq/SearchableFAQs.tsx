'use client'
import Fuse from 'fuse.js'
import { useEffect, useMemo, useState } from 'react'
import { FAQ, FAQCategory } from 'types/faq'
import { track } from 'utils/matomo'
import { faqCategoriesOrder } from './faqsOrder'

const extractPlainText = (value: unknown): string[] => {
  if (value === null || value === undefined) {
    return []
  }
  if (typeof value === 'string') {
    return [value]
  }
  if (Array.isArray(value)) {
    return value.flatMap(extractPlainText)
  }
  if (typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).flatMap(extractPlainText)
  }
  return []
}

const extractTextFromRecordMap = (recordMap: FAQ['content']) => {
  if (!recordMap?.block) {
    return ''
  }

  return Object.values(recordMap.block)
    .map((block) => extractPlainText(block?.value?.properties).join(' '))
    .filter(Boolean)
    .join(' ')
}

const useSearchableFAQs = ({
  faqs,
  search,
  categoryOrder,
  tracking,
}: {
  faqs: FAQ[]
  search: string
  categoryOrder?: Record<FAQCategory, number>
  tracking?: string
}) => {
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const fuse = useMemo(() => {
    const searchableFaqs = faqs.map((faq) => ({
      ...faq,
      searchText: extractTextFromRecordMap(faq.content),
    }))
    return new Fuse(searchableFaqs, {
      keys: [
        { name: 'title', weight: 1 },
        { name: 'searchText', weight: 0.3 },
      ],
      threshold: 0.2,
      ignoreLocation: true,
      minMatchCharLength: 2,
      includeScore: true,
    })
  }, [faqs])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search.trim())
    }, 300)

    return () => clearTimeout(timeout)
  }, [search])

  const faqsByCategory = useMemo(() => {
    if (debouncedSearch) {
      track('Recherche FAQ', tracking || 'Global', debouncedSearch)
    }
    const filteredFaqs = debouncedSearch ? fuse.search(debouncedSearch).map(({ item }) => item) : faqs
    const categories: Partial<Record<FAQCategory, FAQ[]>> = {}
    filteredFaqs.forEach((faq) => {
      if (!categories[faq.categorie]) {
        categories[faq.categorie] = []
      }
      categories[faq.categorie]?.push(faq)
    })

    return Object.entries(categories).sort(
      ([a], [b]) =>
        ((categoryOrder || faqCategoriesOrder)[a as FAQCategory] || 99) -
        ((categoryOrder || faqCategoriesOrder)[b as FAQCategory] || 99)
    )
  }, [fuse, faqs, debouncedSearch, categoryOrder, tracking])

  return {
    faqsByCategory,
  }
}

export default useSearchableFAQs
