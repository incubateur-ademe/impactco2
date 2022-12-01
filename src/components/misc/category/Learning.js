import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'components/providers/ModalProvider'
import Section from 'components/base/Section'
import ButtonLink from 'components/base/ButtonLink'

const StyledSection = styled(Section)`
  margin: 5rem 0;
`
const Title = styled.h2``
const Strong = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  font-style: italic;

  ${(props) => props.theme.mq.medium}  {
    font-size: 1.125rem;
  }
`
const Text = styled.p``
export default function Learning(props) {
  const { setCo2e } = useContext(ModalContext)

  const repas = (
    <>
      <Title>Quel est l’impact climat d'un repas ?</Title>
      <Strong>
        Le quart des émissions de gaz à effet de serre en France provient de nos
        assiettes, c’est autant que le logement ou le transport !
      </Strong>
      <Text>
        Un repas végétarien ou végétalien (0,5 et 0,4 kg{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>
        ) a beacoup moins d'impact pour la planète qu’un repas avec du bœuf ou
        du poulet (7 kg{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>{' '}
        et 1,6 kg{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>
        ) ou encore avec du poisson (gras 1,1 kg{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>{' '}
        et blanc 2 kg{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>
        ). Il est donc préférable de manger des produits d'origine végétale pour
        protéger l’écosystème de la planète.
      </Text>
    </>
  )

  return (
    <StyledSection>
      <Section.Content>{{ repas }[props.category.slug]}</Section.Content>
    </StyledSection>
  )
}
