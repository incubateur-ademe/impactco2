import React, { useContext } from 'react'
import styled from 'styled-components'

import UXContext from 'utils/UXContext'
import MagicLink from 'components/base/MagicLink'

const Text = styled.p``
const Title = styled.h3``
const StyledLink = styled.button`
  display: inline;
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.colors.main};
  text-decoration: underline;
  background: transparent;
  border: none;
  cursor: pointer;
`
export default function ContactPrompt(props) {
  const { setEmbedOpen } = useContext(UXContext)

  return (
    <>
      {!props.configurator && !props.contact && (
        <>
          <Title>
            Comment intégrer ces données à mon site ou application ?
          </Title>
          <Text>
            <strong>
              Vous souhaitez afficher ce simulateur sur votre site ?
            </strong>
            <br />
            Personnalisez le et intégrez le facilement grace à{' '}
            <StyledLink
              onClick={() => {
                setEmbedOpen(true)
              }}
            >
              notre configurateur
            </StyledLink>
            .
          </Text>
        </>
      )}
      <Text>
        <strong>
          Vous souhaitez réutiliser les données brutes ou obtenir de l'aide pour
          intégrer ce simulateur ?
        </strong>
        <br />
        Contactez nous à{' '}
        <MagicLink to='mailto:datagir@ademe.fr'>
          datagir@ademe.fr
        </MagicLink>{' '}
        pour bénéficier de notre expertise et accompagnement.
      </Text>
      {!props.contact && (
        <Text>
          <strong>Vous souhaitez réutiliser le code du simulateur ?</strong>
          <br />
          Ce simulateur est développé de manière ouverte (open source).
          L’ensemble du code est{' '}
          <MagicLink to={process.env.REACT_APP_REPOSITORY_URL}>
            disponible librement
          </MagicLink>
          .
        </Text>
      )}
    </>
  )
}
