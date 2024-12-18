import { create } from 'zustand'

interface FruitsetlegumesState {
  month: number
  search: string
  sorting: string
  setMonth: (month: number) => void
  setSearch: (search: string) => void
  setSorting: (sorting: string) => void
}

export const useFruitsetlegumesStore = create<FruitsetlegumesState>((set) => ({
  month: new Date().getMonth(),
  search: '',
  sorting: 'alph_desc',
  setMonth: (month) => set(() => ({ month })),
  setSearch: (search) => set(() => ({ search })),
  setSorting: (sorting) => set(() => ({ sorting })),
}))
