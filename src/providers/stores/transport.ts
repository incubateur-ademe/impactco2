import { TransportSimulateur } from 'types/transport'
import { create } from 'zustand'
import { deplacements } from 'data/categories/deplacement'

interface TransportState {
  comparisonMode: 'list' | 'comparison'
  comparison: string[]
  modes: string[]
  mode: string
  selected: TransportSimulateur
  tabs: boolean
  setComparisonMode: (mode: 'list' | 'comparison') => void
  setComparison: (comparison: string[]) => void
  setModes: (modes: string[]) => void
  setMode: (mode: string) => void
  setSelected: (selected: TransportSimulateur) => void
  setTabs: (tabs: boolean) => void
}

export const useTransportStore = create<TransportState>((set) => ({
  comparisonMode: 'list',
  comparison: ['voiturethermique', 'tgv'],
  modes: deplacements.flatMap((transport) =>
    transport.withCarpool ? [`${transport.slug}+1`, transport.slug] : [transport.slug]
  ),
  mode: '',
  selected: 'distance',
  tabs: true,
  setComparisonMode: (mode) => set(() => ({ comparisonMode: mode })),
  setComparison: (comparison) => set(() => ({ comparison })),
  setModes: (modes) => set(() => ({ modes })),
  setMode: (mode) => set(() => ({ mode })),
  setSelected: (selected) => set(() => ({ selected })),
  setTabs: (tabs) => set(() => ({ tabs })),
}))
