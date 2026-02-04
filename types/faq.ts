import type { ExtendedRecordMap } from 'notion-types'

export enum FAQCategory {
  QuestionsGenerales = 'Questions générales',
  GeneralQuestions = 'General questions',
  PreguntasGenerales = 'Preguntas generales',
  ComprendreLeCalcul = 'Comprendre le calcul',
  AboutTheCalculation = 'About the calculation',
  EntenderElCálculo = 'Entender el cálculo',
  CestÉtonnant = "C'est étonnant !",
  ItsSurprising = 'It’s surprising',
  EsSorprendente = 'Es sorprendente',
  IdéesPourAgir = 'Idées pour agir',
  IdeasForAction = 'Ideas for action',
  IdeasParaActuar = 'Ideas para actuar',
  ÀProposDesOutils = 'À propos des outils',
  AboutTheTools = 'About the tools',
  AcercaDeLasHerramientas = 'Acerca de las herramientas',
}

export type FAQ = {
  title: string
  pages: string[]
  categorie: FAQCategory
  ancre?: string
  outils: string[]
  content?: ExtendedRecordMap
}
