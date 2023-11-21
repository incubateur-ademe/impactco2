import React from 'react'
import styled from 'styled-components'
import { Section, SectionWideContent } from 'components/base/Section'
import Web from 'components/layout/Web'

const FormatText = styled.div`
  h1 {
    font-size: 3rem;
  }
`

export default function Politique() {
  return (
    <Web title='Politique de confidentialité'>
      <Section>
        <SectionWideContent>
          <FormatText>
            <h1>Politique de confidentialité</h1>
            <p>
              La simulation et les calculs se font dans votre navigateur Web, donc nous ne collectons aucune données de
              simulation.
            </p>
            <p>
              Cependant, nous suivons quelques informations sur votre utilisation du site, telles que les pages
              consultées, le temps passé, les interactions avec nos simulateurs et nos ressources dans l'unique but de
              l'améliorer.
            </p>
            <p>Toutefois ce site n'utilise pas de cookies.</p>
            <p>
              Nous sommes ainsi en conformité avec la réglementation « Cookies » de la CNIL et exemptés d’autorisation
              préalable. C’est pour cela que vous n’avez pas eu besoin de cliquer sur un bloc pour accepter le dépôt de
              cookies !
            </p>
          </FormatText>
        </SectionWideContent>
      </Section>
    </Web>
  )
}
