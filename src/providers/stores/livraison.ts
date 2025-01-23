import { create } from 'zustand'

type LivraisonValues = {
  produit: string
  retrait: string
  relay: string
  km: string
  traj: string
}

interface LivraisonState {
  values: LivraisonValues
  equivalents: string[]
  isHabit: boolean
  isPlane: boolean
  number: number
  frequence: number
  setValues: (values: LivraisonValues) => void
  setEquivalents: (equivalents: string[]) => void
  setIsHabit: (isHabit: boolean) => void
  setIsPlane: (isPlane: boolean) => void
  setNumber: (number: number) => void
  setFrequence: (frequence: number) => void
}
const livraisonDefaultValues = {
  produit: 'habillement',
  retrait: 'point de retrait',
  relay: 'voiture thermique',
  km: '7',
  traj: 'dom_tra',
}

export const useLivraisonStore = create<LivraisonState>((set) => ({
  values: livraisonDefaultValues,
  equivalents: [],
  isHabit: false,
  isPlane: false,
  number: 1,
  frequence: 12,
  setValues: (values) => set(() => ({ values })),
  setEquivalents: (equivalents) => set(() => ({ equivalents })),
  setIsHabit: (isHabit) => set(() => ({ isHabit })),
  setIsPlane: (isPlane) => set(() => ({ isPlane })),
  setNumber: (number) => set(() => ({ number })),
  setFrequence: (frequence) => set(() => ({ frequence })),
}))
