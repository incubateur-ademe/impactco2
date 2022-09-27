import React from 'react'

import Section from 'components/base/Section'
import MagicLink from 'components/base/MagicLink'
import Button from 'components/base/Button'

export default function Email() {
  return (
    <Section>
      <Section.Content>
        <h2>Sources et hypothèses</h2>
        <p>
          Nous prenons comme hypothèse une heure de streaming video (haute
          définition) consommé sur{' '}
          <MagicLink to='https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix'>
            un agrégat de terminaux
          </MagicLink>{' '}
          (15% ordinateur portable, 10% tablette, 5% smartphone et 70%
          télévision).
          <br />
          Ce visionnage est effectué via une connexion fixe, depuis la France
          <br />
        </p>
        <br />
        <p>
          <strong>
            Vous pourrez bientôt personnaliser ces données (qualité de la vidéo,
            types de terminaux, réseau fixe ou mobile, etc.)
          </strong>
        </p>
        <Button.Wrapper onClick={() => alert('Pas maintenant')}>
          <Button>Prévenez moi quand ce sera en ligne</Button>
        </Button.Wrapper>
      </Section.Content>
    </Section>
  )
}
