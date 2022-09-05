import React from 'react'

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

export default function Avion() {
  return (
    <>
      <Title>
        En termes d&apos;émissions de CO2<sub>e</sub>
      </Title>
      <Equivalents>
        <Equivalent size={[7.5, 6, 8]}>
          <Emojis>✈️</Emojis>
          <Label>
            <strong>1 km</strong>
            <br />
            en avion
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
            🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅
          </Emojis>
          <Label>
            <strong>73 km</strong>
            <br />
            en TGV
          </Label>
        </Equivalent>
      </Equivalents>
      <Small>
        <br />
        <strong>1 km</strong>
        <br />
        en avion
        <br />=
        <br />
        <strong>2 km</strong>
        <br />
        en bus
        <br />=
        <br />
        <strong>73 km</strong>
        <br />
        en TGV
      </Small>
      <CenterLink to='/categories/deplacement'>
        Voir tous les modes de transport
      </CenterLink>
    </>
  )
}
