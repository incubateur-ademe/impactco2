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

export default function ConsoleSalonCategory() {
  return (
    <>
      <Title>
        En termes d'émissions de CO2<sub>e</sub>
      </Title>
      <Equivalents>
        <Equivalent size={[7.5, 6, 8]}>
          <Emojis>🖥️</Emojis>
          <Label>1 ordinateurs de gamer</Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[10, 7, 22]}>
          <Emojis margin={70}>🎮🎮🎮🎮</Emojis>
          <Label>4 consoles de salon</Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[15, 10, 33]}>
          <Emojis>👾👾👾👾👾👾👾👾👾👾</Emojis>
          <Label>10 consoles portable</Label>
        </Equivalent>
      </Equivalents>
      <Small>
        <br />1 ordinateurs de gamer
        <br />=
        <br />4 consoles de salon
        <br />=
        <br />
        10 consoles portable
        <br />
      </Small>
      <CenterLink to='/categories/numerique'>
        Voir la catégorie numérique
      </CenterLink>
    </>
  )
}
