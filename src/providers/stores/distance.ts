import { create } from 'zustand'

interface DistanceState {
  km: number
  carpool: Record<string, number>
  displayAll: boolean
  setKm: (km: number) => void
  setCarpool: (carpool: Record<string, number>) => void
  setDisplayAll: (displayAll: boolean) => void
}

export const useDistanceStore = create<DistanceState>((set) => ({
  km: 0,
  carpool: {},
  displayAll: false,
  setKm: (km) => set(() => ({ km })),
  setCarpool: (carpool) => set(() => ({ carpool })),
  setDisplayAll: (displayAll) => set(() => ({ displayAll })),
}))
