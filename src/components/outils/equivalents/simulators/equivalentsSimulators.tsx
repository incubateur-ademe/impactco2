import { ReactNode } from 'react'
import { UsageNumeriqueProvider } from 'src/providers/UsageNumeriqueProvider'
import VisioConferenceSimulator from './VisioConferenceSimulator'

export const equivalentsSimulators: Record<string, ReactNode> = {
  visioconference: (
    <UsageNumeriqueProvider>
      <VisioConferenceSimulator />
    </UsageNumeriqueProvider>
  ),
}
