import React from 'react'
import styled from 'styled-components'

import {
  Title,
  Equivalents,
  Equivalent,
  Emojis,
  Label,
  Equals,
  CenterLink,
  Small,
} from 'components/misc/Visualization'

export default function Voiture() {
  return (
    <>
      <Title>
        En terme d'émissions de CO2<sub>e</sub>
      </Title>
      <Equivalents>
        <Equivalent size={[7.5, 6, 8]}>
          <Emojis>🚗</Emojis>
          <Label>
            <strong>1 km</strong>
            <br />
            en voiture
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[6, 7, 22]}>
          <Emojis>🚌🚌</Emojis>
          <Label>
            <strong>2 km</strong>
            <br />
            en bus
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[20, 16, 35]}>
          <Emojis small>
            🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅
          </Emojis>
          <Label>
            <strong>112 km</strong>
            <br />
            en TGV
          </Label>
        </Equivalent>
      </Equivalents>
      <Small>
        <br />
        <strong>1 km</strong>
        <br />
        en voiture
        <br />=
        <br />
        <strong>2 km</strong>
        <br />
        en bus
        <br />=
        <br />
        <strong>112 km</strong>
        <br />
        en TGV
      </Small>
      <CenterLink to='/co2e'>Voir plus d'équivalences</CenterLink>
    </>
  )
}
