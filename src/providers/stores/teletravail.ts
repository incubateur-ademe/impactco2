import { create } from 'zustand'
import { Point } from 'hooks/useItineraries'

interface TeletravailState {
  start?: Point
  setStart: (start: Point | undefined) => void
  end?: Point
  setEnd: (end: Point | undefined) => void
  carpool: Record<string, number>
  setCarpool: (carpool: Record<string, number>) => void
  displayAll: boolean
  setDisplayAll: (displayAll: boolean) => void
  transport: string
  setTransport: (transport: string) => void
  presentiel: number
  setPresentiel: (presentiel: number) => void
  homeOffice: number
  setHomeOffice: (homeOffice: number) => void
  equivalents: string[]
  setEquivalents: (equivalents: string[]) => void
}

export const useTeletravailStore = create<TeletravailState>((set) => ({
  start: undefined,
  end: undefined,
  carpool: {},
  displayAll: false,
  transport: 'voiturethermique',
  presentiel: 4,
  homeOffice: 1,
  equivalents: [],
  setStart: (start) => set(() => ({ start })),
  setEnd: (end) => set(() => ({ end })),
  setCarpool: (carpool) => set(() => ({ carpool })),
  setDisplayAll: (displayAll) => set(() => ({ displayAll })),
  setTransport: (transport) => set(() => ({ transport })),
  setPresentiel: (presentiel) => set(() => ({ presentiel })),
  setHomeOffice: (homeOffice) => set(() => ({ homeOffice })),
  setEquivalents: (equivalents) => set(() => ({ equivalents })),
}))
