import React from 'react'
import styled from 'styled-components'

import Select from 'components/base/Select'
import Code from './configurator/Code'

const Wrapper = styled.div`
  width: 24rem;
  margin-right: 2rem;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;

  ${(props) => props.theme.mq.medium} {
    width: 100%;
    margin-bottom: 1.5rem;
  }
`
const Title = styled.h1`
  font-size: 2rem;
`
export default function Configurator(props) {
  return (
    <Wrapper>
      <Title>
        Configurez
        <br />
        votre iframe
      </Title>
      <Select
        onChange={(e) => props.setType(e.value)}
        label={`1) Choisissez le type d'iframe que vous souhaitez intégrer.`}
        name='type'
      >
        <option value='tuiles'>Tuiles</option>
        <option disabled>-----------</option>
        <option value='categories/numerique'>Numérique</option>
        <option value='categories/repas'>Repas</option>
        <option value='categories/boisson'>Boisson</option>
        <option value='categories/transport'>Transport</option>
        <option value='categories/habillement'>Habillement</option>
        <option value='categories/electromenager'>Électroménager</option>
        <option value='categories/mobilier'>Mobilier</option>
        <option value='categories/chauffage'>Chauffage</option>
      </Select>
      <Select
        onChange={({ value }) => props.setTheme(value)}
        label={`2) Choisissez la palette de couleurs de votre iframe.`}
        name='theme'
      >
        <option value='default'>Clair</option>
        <option value='night'>Sombre</option>
      </Select>
      <Code theme={props.theme} />
    </Wrapper>
  )
}
