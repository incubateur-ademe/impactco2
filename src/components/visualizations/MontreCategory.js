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

export default function MontreCategory() {
  return (
    <>
      <Title>
        En termes d&apos;émissions de CO<sub>2</sub>e
      </Title>
      <Equivalents>
        <Equivalent size={[7.5, 6, 8]}>
          <Emojis>💻</Emojis>
          <Label>1 ordinateur portable</Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[10, 8, 24]}>
          <Emojis>📱📱📱📱📱📱</Emojis>
          <Label>5 smartphones</Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[20, 12, 24]}>
          <Emojis>⌚️⌚️⌚️⌚️⌚️⌚️⌚️⌚️⌚️⌚️⌚️⌚️⌚️⌚️</Emojis>
          <Label>14 montres connectées</Label>
        </Equivalent>
      </Equivalents>
      <Small>
        <br />
        1 ordinateur portable
        <br />=
        <br />5 smartphones
        <br />=
        <br />
        14 montres connectées
        <br />
      </Small>
      <CenterLink to='/numerique'>
        Comparez avec d'autres objets numériques
      </CenterLink>
    </>
  )
}
