import { ReactNode } from 'react'

export type Question = {
  answer: 'A' | 'B'
  slugA: string
  valueA?: number
  slugB: string
  valueB?: number
  moreInfo: ReactNode
  last?: boolean
}
