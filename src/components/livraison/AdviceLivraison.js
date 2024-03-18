import React, { useState } from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import useScreenshot from 'hooks/useScreenshot'
import { Section, SectionWideContent } from 'components/base/Section'
import Button from 'components/base/buttons/Button'
import ScreenshotWrapper2 from 'components/misc/ScreenshotWrapper2'
import ReduireModal from 'components/modals/ReduireModal'
import AdviceLivraisonDetail from './AdviceLivraisonDetail'

export default function AdviceLivraison() {
  const { ref, takeScreenshot, isScreenshotting } = useScreenshot('impactco2_livraison_advice', 'Livraison', 'jpg')
  const [openModal, setOpenModal] = useState(false)

  return (
    <Section $withoutPadding>
      {openModal && <ReduireModal setOpen={setOpenModal} />}
      <SectionWideContent>
        <Separator />
        <ScreenshotWrapper2 innerRef={ref} isScreenshotting={isScreenshotting}>
          <Flex>
            <H2Title id='ressource' data-testid='titleAdviceLivraison'>
              Conseil pour réduire l’impact carbone de vos livraisons
            </H2Title>
            <div className='buttons'>
              <Button
                priority='secondary'
                size='sm'
                onClick={() => setOpenModal(true)}
                className='noscreenshot'
                id='shareDown'
                aria-label='Partager'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16px' height='16px' viewBox='0 -2 24 24'>
                  <path
                    fill='currentcolor'
                    d='M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z'
                  />
                </svg>
                <HideableSpan>&nbsp;Partager</HideableSpan>
              </Button>
              <Button
                priority='secondary'
                size='sm'
                onClick={takeScreenshot}
                className='noscreenshot'
                aria-label='Télécharger'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                  <path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z' />
                  <path d='M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z' />
                </svg>
                <HideableSpan>&nbsp;Télécharger</HideableSpan>
              </Button>
            </div>
          </Flex>

          <br />
          <AdviceLivraisonDetail
            title='Veiller au dernier km'
            line1Emoji='🚲'
            line1Text='Aller chercher son colis à pied ou à vélo.'
            line1Subtext='... ou utiliser son trajet domicile-travail pour éviter un trajet spécifique en voiture.'
            line2Emoji='🏠'
            line2Text="Se faire livrer à domicile uniquement lorsque l'on est présent•e"
            line2Subtext="A minima indiquer ses préférences de livraison en cas d'absence (laisser le colis à un endroit ou chez un voisin)"
          />
          <br />
          <AdviceLivraisonDetail
            title='Éviter les allers-retours de colis'
            line1Emoji='📧'
            line1Text='Retourner un produit doit rester exceptionnel.'
            line1Subtext='Cette pratique a pour effet de démultiplier les transports, même si, comme 32 % des e-acheteurs, on détient un abonnement incluant des offres de livraison gratuites et illimitées.'
            line2Emoji='📦'
            line2Text='Une seule commande vaut mieux que plusieurs petites.'
            line2Subtext='C’est moins de transport et moins d’emballages. D’ailleurs, pourquoi ne pas faire des achats groupés entre amis ou proches ?'
          />
          <br />
          <AdviceLivraisonDetail
            title='Limiter le suremballage'
            line1Emoji='💬'
            line1Text='Indiquer au vendeur que le produit était inutilement suremballé ou livré dans un trop un emballage trop grand.'
            line1Subtext='Laisser un commentaire sur le site du vendeur pourra l’aider à progresser dans sa démarche.'
            line2Emoji='🛍️'
            line2Text='Garder les emballages pour les réutiliser.'
            line2Subtext='Vous en aurez certainement besoin si vous vendez également des objets sur des plateformes en ligne ou pour un éventuel déménagement.'
            line3Emoji='♻️'
            line3Text='Déposer les emballages non réutilisables dans les bacs de tri.'
            line3Subtext='Pour faciliter le recyclage des papiers, cartons et plastiques, respectez bien les consignes de la commune. Les emballages volumineux sont à déposer en déchèterie.'
          />
        </ScreenshotWrapper2>
      </SectionWideContent>
    </Section>
  )
}

const Separator = styled.hr`
  background-color: #457be7;
  border: none;
  color: #457be7;
  height: 4px;
  margin-bottom: 2.5rem;
  margin-left: 0;
  margin-top: 0.5rem;
  width: 56px;
`

const H2Title = styled.h2`
  font-size: 1.375rem; // 22px/16px
  font-weight: 700;
  margin-bottom: 0;
  margin-top: 0;
`

const Flex = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 1rem;

  > .buttons {
    display: flex;
    gap: 0.5rem;
  }
`

const HideableSpan = styled.span`
  ${MEDIA.LT.XSMALL} {
    display: none;
  }
`
