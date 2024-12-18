import { ComputedEquivalent, Equivalent } from 'types/equivalent'
import { create } from 'zustand'

interface ComparateurState {
  weight: number
  baseValue: number
  equivalents: string[]
  tiles: Equivalent[]
  comparedEquivalent: ComputedEquivalent | undefined
  comparisonMode: 'list' | 'comparison'
  comparison: string[]
  setBaseValue: (baseValue: number) => void
  setEquivalents: (equivalents: string[]) => void
  setTiles: (tiles: Equivalent[]) => void
  setComparedEquivalent: (equivalent: ComputedEquivalent | undefined) => void
  setComparisonMode: (mode: 'list' | 'comparison') => void
  setComparison: (comparison: string[]) => void
}

export const useComparateurStore = create<ComparateurState>((set) => ({
  weight: 1,
  baseValue: 100,
  equivalents: [],
  tiles: [],
  comparedEquivalent: undefined,
  comparisonMode: 'list',
  comparison: ['voiturethermique', 'tgv'],
  setBaseValue: (baseValue) => set(() => ({ baseValue })),
  setEquivalents: (equivalents) => set(() => ({ equivalents })),
  setTiles: (tiles) => set(() => ({ tiles })),
  setComparedEquivalent: (equivalent) =>
    set((state) => {
      const filteredEquivalent = equivalent
        ? state.equivalents.filter((slug) => slug !== equivalent.slug)
        : state.equivalents
      const equivalents = state.comparedEquivalent
        ? [...filteredEquivalent, state.comparedEquivalent.slug]
        : [...filteredEquivalent]

      return {
        baseValue: 100,
        weight: equivalent ? equivalent.value / (equivalent.percentage ? 100 : 1) : 1,
        comparedEquivalent: equivalent,
        equivalents,
      }
    }),
  setComparisonMode: (mode) => set(() => ({ comparisonMode: mode })),
  setComparison: (comparison) => set(() => ({ comparison })),
}))
