import { ReactNode } from 'react'
import ChauffageSimulator from 'components/outils/ChauffageSimulator'
import FruitsEtLegumesSimulator from 'components/outils/FruitsEtLegumesSimulator'
import TransportSimulator from 'components/outils/TransportSimulator'
import { RulesProviderLivraison } from 'components/livraison/RulesProviderLivraison'
import LivraisonSimulator from './LivraisonSimulator'
import TeletravailSimulator from './TeletravailSimulator'
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
