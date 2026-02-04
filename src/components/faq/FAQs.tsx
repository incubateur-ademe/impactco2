'use server'

import { FAQ, FAQCategory } from 'types/faq'
import { getFAQs } from 'utils/faq'
import FAQsList, { FAQSListProps } from './FAQsList'
import { faqCategoriesOrder } from './faqsOrder'

const FAQs = async ({
  filter,
  ...rest
}: {
  filter: string
} & Omit<FAQSListProps, 'faqs' | 'title' | 'description' | 'link' | 'linkLabel'>) => {
  const faqs = await getFAQs(filter)

  const categories: Partial<Record<FAQCategory, FAQ[]>> = {}
  faqs.forEach((faq) => {
    if (!categories[faq.categorie]) {
      categories[faq.categorie] = []
    }
    categories[faq.categorie]?.push(faq)
  })
  const orderedFaqs = Object.entries(categories).sort(
    ([a], [b]) => (faqCategoriesOrder[a as FAQCategory] || 99) - (faqCategoriesOrder[b as FAQCategory] || 99)
  )
  return (
    <FAQsList
      faqs={orderedFaqs.flatMap(([, faqs]) => faqs)}
      title='Questions fréquentes'
      description='Explorer la FAQ pour trouver les réponses à vos questions'
      {...rest}
    />
  )
}

export default FAQs
