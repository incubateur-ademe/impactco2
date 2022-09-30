import React from 'react'

import Section from 'components/base/Section'
import Contact from './Contact'

export default function Email() {
  return (
    <Section>
      <Section.Content>
        <h2>Sources et hypothèses</h2>
        <p>
          Nous prenons comme hypothèse une visioconférence (basse définition)
          d'une heure entre 2 ordinateurs portables avec une connexion fixe en
          France.
        </p>
        <br />
        <Contact>
          Vous pourrez bientôt personnaliser ces données (nombre de
          participants, types de terminaux, réseau fixe ou mobile, qualité de la
          vidéo, etc.)
        </Contact>
      </Section.Content>
    </Section>
  )
}
