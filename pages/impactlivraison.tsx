import SuggestionBanner from 'components/contact/SuggestionBanner'
import AdviceLivraison from 'components/livraison/AdviceLivraison'
import CalculateurLivraison from 'components/livraison/CalculateurLivraison'
import ConclusionLivraison from 'components/livraison/ConclusionLivraison'
import IntroLivraison from 'components/livraison/IntroLivraison'
import { RulesProviderLivraison } from 'components/livraison/RulesProviderLivraison'

export default function Impactlivraison() {
  return (
    <>
      <IntroLivraison />
      <RulesProviderLivraison>
        <CalculateurLivraison />
      </RulesProviderLivraison>
      <AdviceLivraison />
      <ConclusionLivraison />
      <SuggestionBanner from='livraison' fromLabel='Livraison' simulatorName='simulateur livraison' />
    </>
  )
}
