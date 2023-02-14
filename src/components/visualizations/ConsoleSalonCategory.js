import React from 'react'

import {
  CenterLink,
  Emojis,
  Equals,
  Equivalent,
  Equivalents,
  Label,
  Small,
  Title,
} from 'components/misc/Visualization'

export default function ConsoleSalonCategory() {
  return (
    <>
      <Title>
        En termes d&apos;émissions de CO<sub>2</sub>e
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
      <CenterLink to='/numerique'>Voir la catégorie numérique</CenterLink>
    </>
  )
}
