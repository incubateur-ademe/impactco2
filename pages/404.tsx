import React from 'react'
import { Section, SectionWideContent } from 'components/base/Section'
import Web from 'components/layout/Web'

export default function notfound() {
  return (
    <Web>
      <Section>
        <SectionWideContent>
          <br />
          <br />
          <h1>Page non trouvée</h1>
          <h2>La page que vous cherchez est introuvable. Excusez-nous pour la gène occasionnée.</h2>
          Si vous avez tapé l&apos;adresse web dans le navigateur, vérifiez qu&apos;elle est correcte. La page n’est
          peut-être plus disponible.
          <br />
          Dans ce cas, pour continuer votre visite vous pouvez consulter notre page d’accueil.
        </SectionWideContent>
      </Section>
    </Web>
  )
}
