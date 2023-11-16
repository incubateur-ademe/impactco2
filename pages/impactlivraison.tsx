import AdviceLivraison from 'components/livraison/AdviceLivraison'
import AvisLivraison from 'components/livraison/AvisLivraison'
import CalculateurLivraison from 'components/livraison/CalculateurLivraison'
import ConclusionLivraison from 'components/livraison/ConclusionLivraison'
import IntroLivraison from 'components/livraison/IntroLivraison'
import { RulesProviderLivraison } from 'components/livraison/RulesProviderLivraison'

export default function Impactlivraison() {
  return (
    <main id='contenu'>
      <IntroLivraison />
      <RulesProviderLivraison>
        <CalculateurLivraison />
      </RulesProviderLivraison>
      <AdviceLivraison />
      <ConclusionLivraison />
      <AvisLivraison />
    </main>
  )
}
