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
          Nous prenons comme hypothèse un email sans pièce jointe, envoyé à une
          personne, écrit et envoyé depuis la France.
        </p>
        <h3>Du côté émetteur</h3>
        <p>
          Cet email à pris 3 minutes à écrire sur{' '}
          <MagicLink to='https://www.arcep.fr/uploads/tx_gspublication/rapport-barometre-numerique-edition-2021.pdf'>
            un agrégat de terminaux
          </MagicLink>{' '}
          (24% ordinateur fixe, 24% ordinateur portable, 8% tablette et 45%
          smartphone).
          <br />
          Cet email est envoyé via le réseau internet fixe. Il sera stocké
          pendant 10 ans dans la boite mail de la personne émettrice.
        </p>
        <h3>Du côté récepteur</h3>
        <p>
          Cet email a pris 10 seconde à lire sur{' '}
          <MagicLink to='https://www.arcep.fr/uploads/tx_gspublication/rapport-barometre-numerique-edition-2021.pdf'>
            un agrégat de terminaux
          </MagicLink>{' '}
          (24% ordinateur fixe, 24% ordinateur portable, 8% tablette et 45%
          smartphone).
          <br />
          Cet email est reçu via le réseau internet fixe. Il sera stocké pendant
          10 ans dans la boite mail de la personne réceptrice.
        </p>
        <br />
        <Contact>
          Vous pourrez bientôt personnaliser ces données (types de terminaux,
          réseau fixe ou mobile, durée de stockage, taille de la pièce jointe,
          etc.)
        </Contact>
      </Section.Content>
    </Section>
  )
}
