import { ReactNode } from 'react'
import { UsageNumeriqueProvider } from 'src/providers/UsageNumeriqueProvider'
import UsageNumeriqueEquivalentSimulator from './UsageNumeriqueEquivalentSimulator'

export const equivalentsSimulators: Record<string, ReactNode> = {
  visioconference: (
    <UsageNumeriqueProvider>
      <UsageNumeriqueEquivalentSimulator slug='visio' />
    </UsageNumeriqueProvider>
  ),
  email: (
    <UsageNumeriqueProvider>
      <UsageNumeriqueEquivalentSimulator slug='email' />
    </UsageNumeriqueProvider>
  ),
  streamingvideo: (
    <UsageNumeriqueProvider>
      <UsageNumeriqueEquivalentSimulator slug='streaming' />
    </UsageNumeriqueProvider>
  ),
}
