import { useAlimentationStore } from './alimentation'
import { useChauffageStore } from './chauffage'
import { useComparateurStore } from './comparateur'
import { useDistanceStore } from './distance'
import { useFruitsetlegumesStore } from './fruitsetlegumes'
import { useHabillementStore } from './habillement'
import { useItineraireStore } from './itineraire'
import { useLivraisonStore } from './livraison'
import { useNumeriqueStore } from './numerique'
import { useTeletravailStore } from './teletravail'
import { useUsageNumeriqueStore } from './usageNumerique'

const useAllParams = () => {
  const alimentation = useAlimentationStore()
  const chauffage = useChauffageStore()
  const fruitsetlegumes = useFruitsetlegumesStore()
  const habillement = useHabillementStore()
  const livraison = useLivraisonStore()
  const numerique = useNumeriqueStore()
  const usageNumerique = useUsageNumeriqueStore()
  const teletravail = useTeletravailStore()
  const distance = useDistanceStore()
  const itineraire = useItineraireStore()
  const comparateur = useComparateurStore()

  return {
    alimentation,
    chauffage,
    fruitsetlegumes,
    habillement,
    livraison,
    numerique,
    usageNumerique,
    teletravail,
    distance,
    itineraire,
    comparateur,
  }
}

export default useAllParams

export type AllParams = ReturnType<typeof useAllParams>
