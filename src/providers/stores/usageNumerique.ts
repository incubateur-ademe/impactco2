import { ASTNode, PublicodesExpression } from 'publicodes'
import { create } from 'zustand'
import { usageNumeriqueDefaultValues } from 'utils/usageNumerique'

interface UsageNumeriqueState {
  displayAll: boolean
  situation: Partial<Record<string, PublicodesExpression | ASTNode>>
  numberEmails: number
  equivalents: string[]
  mode: string
  setDisplayAll: (value: boolean) => void
  setSituation: (situation: Partial<Record<string, PublicodesExpression | ASTNode>>) => void
  setNumberEmails: (numberEmails: number) => void
  setEquivalents: (equivalents: string[]) => void
  setMode: (mode: string) => void
}

export const useUsageNumeriqueStore = create<UsageNumeriqueState>((set) => ({
  displayAll: false,
  situation: { ...usageNumeriqueDefaultValues },
  numberEmails: 50,
  equivalents: [],
  mode: '',
  setDisplayAll: (displayAll) => set(() => ({ displayAll })),
  setSituation: (situation) => set(() => ({ situation })),
  setNumberEmails: (numberEmails) => set(() => ({ numberEmails })),
  setEquivalents: (equivalents) => set(() => ({ equivalents })),
  setMode: (mode) => set(() => ({ mode })),
}))
