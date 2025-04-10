import { ReactNode } from 'react'
import { UsageNumeriqueProvider } from 'src/providers/UsageNumeriqueProvider'
import ChauffageSimulator from 'components/outils/ChauffageSimulator'
import FruitsEtLegumesSimulator from 'components/outils/FruitsEtLegumesSimulator'
import TransportSimulator from 'components/outils/TransportSimulator'
import AlimentationSimulator from './AlimentationSimulator'
import TeletravailSimulator from './TeletravailSimulator'
import LivraisonSimulator from './livraison/LivraisonSimulator'
import UsageNumeriqueSimulator from './usageNumerique/UsageNumeriqueSimulator'

export const simulators: Record<string, ReactNode> = {
  chauffage: <ChauffageSimulator />,
  transport: <TransportSimulator />,
  teletravail: <TeletravailSimulator />,
  fruitsetlegumes: <FruitsEtLegumesSimulator />,
  alimentation: <AlimentationSimulator />,
  usagenumerique: (
    <UsageNumeriqueProvider>
      <UsageNumeriqueSimulator />
    </UsageNumeriqueProvider>
  ),
  livraison: <LivraisonSimulator />,
}
