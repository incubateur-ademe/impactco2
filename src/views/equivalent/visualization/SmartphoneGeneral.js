import React from 'react'

import {
  Title,
  Equivalents,
  Equivalent,
  Emojis,
  Label,
  Equals,
  CenterLink,
} from 'components/misc/Visualization'

export default function Boeuf() {
  return (
    <>
      <Title>
        En terme d'émissions de CO2<sub>e</sub>
      </Title>
      <Equivalents>
        <Equivalent size={[7.5, 6, 4]}>
          <Emojis>📱</Emojis>
          <Label>
            produire
            <br />
            <strong>1 smartphone</strong>
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[10, 7, 7]}>
          <Emojis margin={70}>🥩🥩🥩🥩</Emojis>
          <Label>
            consommer
            <br />
            <strong>4 repas avec du boeuf</strong>
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[10, 6, 6]}>
          <Emojis large>👕👕👕👕👕</Emojis>
          <Label>
            fabriquer
            <br />
            <strong>5 t-shirts</strong>
          </Label>
        </Equivalent>
      </Equivalents>
      <CenterLink to='/co2e'>Voir plus d'équivalences</CenterLink>
    </>
  )
}
