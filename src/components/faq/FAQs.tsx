'use server'

import { getFAQs } from 'utils/faq'
import FAQsList, { FAQSListProps } from './FAQsList'

const FAQs = async ({
  filter,
  ...rest
}: {
  filter: string
} & Omit<FAQSListProps, 'faqs' | 'title' | 'description' | 'link' | 'linkLabel'>) => {
  const faqs = await getFAQs(filter)
  return (
    <FAQsList
      faqs={faqs}
      title='Questions fréquentes'
      description='Explorer la FAQ pour trouver les réponses à vos questions'
      {...rest}
    />
  )
}

export default FAQs
