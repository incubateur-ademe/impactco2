import { FAQCategory } from 'types/faq'

export const faqCategoriesOrder: Record<FAQCategory, number> = {
  [FAQCategory.QuestionsGenerales]: 2,
  [FAQCategory.GeneralQuestions]: 2,
  [FAQCategory.PreguntasGenerales]: 2,
  [FAQCategory.ComprendreLeCalcul]: 3,
  [FAQCategory.AboutTheCalculation]: 3,
  [FAQCategory.EntenderElCálculo]: 3,
  [FAQCategory.CestÉtonnant]: 4,
  [FAQCategory.ItsSurprising]: 4,
  [FAQCategory.EsSorprendente]: 4,
  [FAQCategory.IdéesPourAgir]: 5,
  [FAQCategory.IdeasForAction]: 5,
  [FAQCategory.IdeasParaActuar]: 5,
  [FAQCategory.ÀProposDesOutils]: 1,
  [FAQCategory.AboutTheTools]: 1,
  [FAQCategory.AcercaDeLasHerramientas]: 1,
}
