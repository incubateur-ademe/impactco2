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

export default function ImprimanteCategory() {
  return (
    <>
      <Title>
        En termes d'émissions de CO2<sub>e</sub>
      </Title>
      <Equivalents>
        <Equivalent size={[7.5, 6, 8]}>
          <Emojis>💻</Emojis>
          <Label>1 ordinateurs portables</Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[10, 8, 24]}>
          <Emojis>🖨🖨</Emojis>
          <Label>2 imprimantes</Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[20, 12, 24]}>
          <Emojis>📱📱📱📱📱</Emojis>
          <Label>5 smartphones</Label>
        </Equivalent>
      </Equivalents>
      <Small>
        <br />1 ordinateurs portables
        <br />=
        <br />2 imprimantes
        <br />=
        <br />
        5 smartphones
        <br />
      </Small>
      <CenterLink to='/categories/numerique'>
        Voir la catégorie numérique
      </CenterLink>
    </>
  )
}
