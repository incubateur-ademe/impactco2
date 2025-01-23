import { create } from 'zustand'
import { Point } from 'hooks/useItineraries'

interface ItineraireState {
  roundTrip: boolean
  start?: Point
  end?: Point
  carpool: Record<string, number>
  displayAll: boolean
  setRoundTrip: (roundTrip: boolean) => void
  setStart: (start?: Point) => void
  setEnd: (end?: Point) => void
  setCarpool: (carpool: Record<string, number>) => void
  setDisplayAll: (displayAll: boolean) => void
}

export const useItineraireStore = create<ItineraireState>((set) => ({
  roundTrip: false,
  start: undefined,
  end: undefined,
  carpool: {},
  displayAll: false,
  setRoundTrip: (roundTrip) => set(() => ({ roundTrip })),
  setStart: (start) => set(() => ({ start })),
  setEnd: (end) => set(() => ({ end })),
  setCarpool: (carpool) => set(() => ({ carpool })),
  setDisplayAll: (displayAll) => set(() => ({ displayAll })),
}))
