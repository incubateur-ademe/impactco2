import React, { useContext } from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'
import MagicLink from 'components/base/MagicLink'

const Title = styled.h2``
const Text = styled.p`
  font-size: 1.125rem;
`
export default function Contact(props) {
  return (
    <Section>
      <Section.Content>
        {!props.integration && (
          <>
            <Title>
              Comment intégrer ces données
              <br />à mon site ou application ?
            </Title>
            <h3>Vous souhaitez afficher notre simulateur sur votre site ?</h3>
            <Text>
              Personnalisez le et intégrez le facilement grace à{' '}
              <MagicLink to='/integration'>notre configurateur</MagicLink>.
            </Text>
          </>
        )}
        <h3>
          Vous souhaitez réutiliser les données brutes ou obtenir de l'aide pour
          intégrer nos simulateurs ?
        </h3>
        <Text>
          Contactez nous à{' '}
          <MagicLink to='mailto:datagir@ademe.fr'>datagir@ademe.fr</MagicLink>{' '}
          pour bénéficier de notre expertise et accompagnement.
        </Text>
        <h3>Vous souhaitez réutiliser le code d'un de nos simulateurs ?</h3>
        <Text>
          Nos simulateurs sont développés de manière ouverte (open source).
          L’ensemble du code est{' '}
          <MagicLink to='https://github.com/datagir/'>
            disponible librement
          </MagicLink>
          .
        </Text>
      </Section.Content>
    </Section>
  )
}
