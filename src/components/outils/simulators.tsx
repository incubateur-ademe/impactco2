import { ReactNode } from 'react'
import ChauffageSimulator from 'components/outils/ChauffageSimulator'
import FruitsEtLegumesSimulator from 'components/outils/FruitsEtLegumesSimulator'
import TransportSimulator from 'components/outils/TransportSimulator'

export const simulators: Record<string, ReactNode> = {
  chauffage: <ChauffageSimulator />,
  transport: <TransportSimulator />,
  fruitsetlegumes: <FruitsEtLegumesSimulator />,
}
