import { ComputedEquivalent, Equivalent } from 'types/equivalent'
import { create } from 'zustand'

interface ComparateurState {
  weight: number
  baseValue: number
  equivalents: string[]
  tiles: Equivalent[]
  comparedEquivalent: ComputedEquivalent | undefined
  setBaseValue: (baseValue: number) => void
  setEquivalents: (equivalents: string[]) => void
  setTiles: (tiles: Equivalent[]) => void
  setComparedEquivalent: (equivalent: ComputedEquivalent | undefined, fromURL?: boolean) => void
}

export const useComparateurStore = create<ComparateurState>((set) => ({
  weight: 1,
  baseValue: 100,
  equivalents: [],
  tiles: [],
  comparedEquivalent: undefined,
  setBaseValue: (baseValue) => set(() => ({ baseValue })),
  setEquivalents: (equivalents) => set(() => ({ equivalents })),
  setTiles: (tiles) => set(() => ({ tiles })),
  setComparedEquivalent: (equivalent, fromURL) =>
    set((state) => {
      const filteredEquivalent = equivalent
        ? state.equivalents.filter((slug) => slug !== equivalent.slug)
        : state.equivalents
      const equivalents = state.comparedEquivalent
        ? [...filteredEquivalent, state.comparedEquivalent.slug]
        : [...filteredEquivalent]

      return {
        baseValue: fromURL ? state.baseValue : 100,
        weight: equivalent ? equivalent.value / (equivalent.percentage ? 100 : 1) : 1,
        comparedEquivalent: equivalent,
        equivalents,
      }
    }),
}))
