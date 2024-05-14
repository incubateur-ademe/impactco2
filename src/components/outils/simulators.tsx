import { ReactNode } from 'react'
import { LivraisonProvider } from 'src/providers/LivraisonProvider'
import { UsageNumeriqueProvider } from 'src/providers/UsageNumeriqueProvider'
import ChauffageSimulator from 'components/outils/ChauffageSimulator'
import FruitsEtLegumesSimulator from 'components/outils/FruitsEtLegumesSimulator'
import TransportSimulator from 'components/outils/TransportSimulator'
import LivraisonSimulator from './LivraisonSimulator'
import TeletravailSimulator from './TeletravailSimulator'
import OsezChangerSimulator from './osezChanger/OsezChangerSimulator'
import UsageNumeriqueSimulator from './usageNumerique/UsageNumeriqueSimulator'

export const simulators: Record<string, ReactNode> = {
  chauffage: <ChauffageSimulator />,
  transport: <TransportSimulator />,
  teletravail: <TeletravailSimulator />,
  fruitsetlegumes: <FruitsEtLegumesSimulator />,
  usagenumerique: (
    <UsageNumeriqueProvider>
      <UsageNumeriqueSimulator />
    </UsageNumeriqueProvider>
  ),
  livraison: (
    <LivraisonProvider>
      <LivraisonSimulator />
    </LivraisonProvider>
  ),
}

export const extraSimulators: Record<
  string,
  { slug: string; tracking: string; title: string; description: string; simulator: ReactNode }
> = {
  habillement: {
    slug: 'osez-changer',
    tracking: 'OsezChanger',
    title: 'Défi chaussures',
    description: 'Sensibiliser à l’impact de l’achat de chaussures neuves',
    simulator: <OsezChangerSimulator />,
  },
}
