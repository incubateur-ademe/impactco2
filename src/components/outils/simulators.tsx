import { ReactNode } from 'react'
import { UsageNumeriqueProvider } from 'src/providers/UsageNumeriqueProvider'
import ChauffageSimulator from 'components/outils/ChauffageSimulator'
import FruitsEtLegumesSimulator from 'components/outils/FruitsEtLegumesSimulator'
import AlimentationSimulator from './alimentation/AlimentationSimulator'
import LivraisonSimulator from './livraison/LivraisonSimulator'
import TeletravailSimulator from './teletravail/TeletravailSimulator'
import TransportSimulator from './transport/TransportSimulator'
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
