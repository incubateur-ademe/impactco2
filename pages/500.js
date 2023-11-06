import React from 'react'
import Section from 'components/base/Section'
import Web from 'components/layout/Web'

export default function notfound() {
  return (
    <Web>
      <Section>
        <Section.Content>
          <br />
          <br />
          <h1>Erreur inattendue</h1>
          <h2>
            Désolé, le service rencontre un problème, nous travaillons pour le résoudre le plus rapidement possible.
          </h2>
          Essayez de rafraichir la page ou bien ressayez plus tard.
        </Section.Content>
      </Section>
    </Web>
  )
}
