import { Section2, Section2InnerMargin } from 'components/base/Section2'
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
      <Section2>
        <Section2InnerMargin>
          <AdviceLivraison />
        </Section2InnerMargin>
      </Section2>
      <ConclusionLivraison />
      <AvisLivraison />
    </main>
  )
}
