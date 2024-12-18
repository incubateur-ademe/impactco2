import { create } from 'zustand'

interface ChauffageState {
  m2: number
  setM2: (m2: number) => void
}

export const useChauffageStore = create<ChauffageState>((set) => ({
  m2: 63,
  setM2: (m2) => set(() => ({ m2 })),
}))
