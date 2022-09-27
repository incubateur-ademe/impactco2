import React from 'react'

import Section from 'components/base/Section'
import Button from 'components/base/Button'

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
        <p>
          <strong>
            Vous pourrez bientôt personnaliser ces données (nombre de
            participants, types de terminaux, réseau fixe ou mobile, qualité de
            la vidéo, etc.)
          </strong>
        </p>
        <Button.Wrapper onClick={() => alert('Pas maintenant')}>
          <Button>Prévenez moi quand ce sera en ligne</Button>
        </Button.Wrapper>
      </Section.Content>
    </Section>
  )
}
