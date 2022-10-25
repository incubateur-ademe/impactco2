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

export default function SmartphoneCategory() {
  return (
    <>
      <Title>
        En termes d&apos;émissions de CO<sub>2</sub>e
      </Title>
      <Equivalents>
        <Equivalent size={[7.5, 6, 8]}>
          <Emojis>🖥️</Emojis>
          <Label>1 ordinateur fixe (avec écran)</Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[10, 8, 24]}>
          <Emojis>💻💻💻</Emojis>
          <Label>3 ordinateurs portables</Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[13, 10, 24]}>
          <Emojis>📱📱📱📱📱📱📱📱📱</Emojis>
          <Label>9 tablettes</Label>
        </Equivalent>
      </Equivalents>
      <Small>
        <br />1 ordinateur fixe (avec écran)
        <br />=
        <br />3 ordinateurs portables
        <br />=
        <br />
        9 tablettes
        <br />
      </Small>
      <CenterLink to='/numerique'>Voir la catégorie numérique</CenterLink>
    </>
  )
}
