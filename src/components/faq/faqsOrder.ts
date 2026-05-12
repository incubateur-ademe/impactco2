import { FAQCategory } from 'types/faq'

export const faqCategoriesOrder: Record<FAQCategory, number> = {
  [FAQCategory.QuestionsGenerales]: 2,
  [FAQCategory.ComprendreLeCalcul]: 3,
  [FAQCategory.CestÉtonnant]: 4,
  [FAQCategory.IdéesPourAgir]: 5,
  [FAQCategory.ÀProposDesOutils]: 1,
}
