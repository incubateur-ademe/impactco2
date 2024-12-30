import { ReactNode } from 'react'
import { LivraisonProvider } from 'src/providers/LivraisonProvider'
import { UsageNumeriqueProvider } from 'src/providers/UsageNumeriqueProvider'
import { Params } from 'src/providers/stores/useAllParams'
import { computedEquivalents } from 'data/categories/computedEquivalents'
import { repas } from 'data/categories/repas'
import ChauffageSimulator from 'components/outils/ChauffageSimulator'
import FruitsEtLegumesSimulator from 'components/outils/FruitsEtLegumesSimulator'
import TransportSimulator from 'components/outils/TransportSimulator'
import AlimentationSimulator from './AlimentationSimulator'
import CategorySimulator from './CategorySimulator'
import LivraisonSimulator from './LivraisonSimulator'
import TeletravailSimulator from './TeletravailSimulator'
import OsezChangerSimulator from './osezChanger/OsezChangerSimulator'
import UsageNumeriqueSimulator from './usageNumerique/UsageNumeriqueSimulator'

export const simulators: Record<string, (defaultParams: Params) => ReactNode> = {
  chauffage: (defaultParams) => <ChauffageSimulator defaultParams={defaultParams.chauffage} />,
  transport: () => <TransportSimulator />,
  teletravail: () => <TeletravailSimulator />,
  fruitsetlegumes: () => <FruitsEtLegumesSimulator />,
  alimentation: (defaultParams) => <AlimentationSimulator defaultParams={defaultParams.alimentation} />,
  usagenumerique: () => (
    <UsageNumeriqueProvider>
      <UsageNumeriqueSimulator />
    </UsageNumeriqueProvider>
  ),
  livraison: () => (
    <LivraisonProvider>
      <LivraisonSimulator />
    </LivraisonProvider>
  ),
}

export const extraSimulators: Record<
  string,
  { slug: string; tracking: string; title: string; description: string; simulator: ReactNode; small?: boolean }
> = {
  habillement: {
    slug: 'osez-changer',
    tracking: 'OsezChanger',
    title: 'Défi chaussures',
    description: 'Sensibiliser à l’impact de l’achat de chaussures neuves',
    simulator: <OsezChangerSimulator />,
    small: true,
  },
  alimentation: {
    slug: 'repas',
    tracking: 'Repas',
    title: 'Repas',
    description: "Comparer l'empreinte carbone de différents types de repas",
    simulator: <CategorySimulator tracking='Repas' equivalents={computedEquivalents('alimentation', repas)} />,
  },
}
