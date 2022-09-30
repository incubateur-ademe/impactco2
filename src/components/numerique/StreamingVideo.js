import React from 'react'

import Section from 'components/base/Section'
import MagicLink from 'components/base/MagicLink'
import Contact from './Contact'

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
        <Contact>
          Vous pourrez bientôt personnaliser ces données (qualité de la vidéo,
          types de terminaux, réseau fixe ou mobile, etc.)
        </Contact>
      </Section.Content>
    </Section>
  )
}
