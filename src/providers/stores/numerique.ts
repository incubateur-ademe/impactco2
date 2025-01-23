import { create } from 'zustand'

interface NumeriqueState {
  displayAll: boolean
  setDisplayAll: (displayAll: boolean) => void
}

export const useNumeriqueStore = create<NumeriqueState>((set) => ({
  displayAll: false,
  setDisplayAll: (displayAll) => set(() => ({ displayAll })),
}))
