import { create } from 'zustand'

interface HabillementState {
  displayAll: boolean
  setDisplayAll: (displayAll: boolean) => void
}

export const useHabillementStore = create<HabillementState>((set) => ({
  displayAll: false,
  setDisplayAll: (displayAll) => set(() => ({ displayAll })),
}))
