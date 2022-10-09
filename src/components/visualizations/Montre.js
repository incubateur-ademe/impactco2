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

export default function Montre() {
  return (
    <>
      <Title>
        En termes d&apos;émissions de CO<sub>2</sub>e
      </Title>
      <Equivalents>
        <Equivalent size={[7.5, 6, 8]}>
          <Emojis>⌚️</Emojis>
          <Label>
            produire
            <br />
            <strong>1 montre connectée</strong>
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[7.5, 6, 8]}>
          <Emojis margin={70}>🥩</Emojis>
          <Label>
            consommer
            <br />
            <strong>1 repas avec du boeuf</strong>
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[10, 6, 24]}>
          <Emojis large>👕👕</Emojis>
          <Label>
            fabriquer
            <br />
            <strong>2 t-shirts</strong>
          </Label>
        </Equivalent>
      </Equivalents>
      <Small>
        produire
        <br />
        <strong>1 montre connectée</strong>
        <br />=<br />
        consommer
        <br />
        <strong>1 repas avec du boeuf</strong>
        <br />=<br />
        fabriquer
        <br />
        <strong>2 t-shirts</strong>
        <br />
      </Small>
      <CenterLink to='/convertisseur'>Voir plus d&apos;équivalences</CenterLink>
    </>
  )
}
