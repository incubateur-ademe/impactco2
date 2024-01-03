import React from 'react'
import { Section, SectionWideContent } from 'components/base/Section'
import Link from 'components/base/buttons/Link'
import Contact from './Contact'

export default function Email() {
  return (
    <Section>
      <SectionWideContent>
        <h2>Sources et hypothèses</h2>
        <p>
          Le périmètre de cet équivalent comprend une recherche effectuée sur un moteur de recherche et la consultation
          de la page de résultats.
          <br />
          Le suivi des liens et la consultation des pages associées n'est pas prise en compte.
          <br />
          N'est pas non plus pris en compte l'indexation des sites internet par le moteur de recherche (considéré
          mutualisée entre les utilisateurs)
        </p>
        <p>
          Nous prenons comme hypothèse une recherche effectuée depuis la France. Cette requête a pris 50 secondes à
          écrire sur{' '}
          <Link href='https://www.arcep.fr/uploads/tx_gspublication/rapport-barometre-numerique-edition-2021.pdf'>
            un agrégat de terminaux
          </Link>{' '}
          (24% ordinateur fixe, 24% ordinateur portable, 8% tablette et 45% smartphone).
          <br />
          Cette requête est envoyée via le réseau internet fixe. Elle pèse 16ko.
          <br />
        </p>
        <Contact>
          Vous pourrez bientôt personnaliser ces données (types de terminaux, réseau fixe ou mobile, etc.)
        </Contact>
      </SectionWideContent>
    </Section>
  )
}
