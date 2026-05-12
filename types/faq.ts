import type { ExtendedRecordMap } from 'notion-types'

export enum FAQCategory {
  QuestionsGenerales = 'Questions générales',
  ComprendreLeCalcul = 'Comprendre le calcul',
  CestÉtonnant = "C'est étonnant !",
  IdéesPourAgir = 'Idées pour agir',
  ÀProposDesOutils = 'À propos des outils',
}

export type FAQ = {
  title: string
  pages: string[]
  categorie: FAQCategory
  ancre?: string
  outils: string[]
  content?: ExtendedRecordMap
}
