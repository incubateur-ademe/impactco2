import { create } from 'zustand'
import { AlimentationCategories } from 'utils/alimentation'

interface AlimentationState {
  category: AlimentationCategories
  customList: boolean
  equivalents: string[]
  setCategory: (category: AlimentationCategories) => void
  setCustomList: (customList: boolean) => void
  setEquivalents: (equivalents: string[]) => void
}

export const useAlimentationStore = create<AlimentationState>((set) => ({
  category: AlimentationCategories.Group,
  customList: false,
  equivalents: [],
  setCategory: (category) => set(() => ({ category })),
  setCustomList: (customList) => set(() => ({ customList })),
  setEquivalents: (equivalents) => set(() => ({ equivalents })),
}))
