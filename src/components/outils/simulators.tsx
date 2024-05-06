import { ReactNode } from 'react'
import ChauffageSimulator from 'components/outils/ChauffageSimulator'
import FruitsEtLegumesSimulator from 'components/outils/FruitsEtLegumesSimulator'
import TransportSimulator from 'components/outils/TransportSimulator'
import { RulesProviderLivraison } from 'components/providers/RulesProviderLivraison'
import LivraisonSimulator from './LivraisonSimulator'
import TeletravailSimulator from './TeletravailSimulator'
import OsezChangerSimulator from './osezChanger/OsezChangerSimulator'
import UsageNumeriqueSimulator from './usageNumerique/UsageNumeriqueSimulator'

export const simulators: Record<string, ReactNode> = {
  chauffage: <ChauffageSimulator />,
  transport: <TransportSimulator />,
  teletravail: <TeletravailSimulator />,
  fruitsetlegumes: <FruitsEtLegumesSimulator />,
  usagenumerique: <UsageNumeriqueSimulator />,
  livraison: (
    <RulesProviderLivraison>
      <LivraisonSimulator />
    </RulesProviderLivraison>
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
