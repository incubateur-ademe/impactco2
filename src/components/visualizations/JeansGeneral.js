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

export default function JeansGeneral() {
  return (
    <>
      <Title>
        En termes d&apos;émissions de CO<sub>2</sub>e
      </Title>
      <Equivalents>
        <Equivalent size={[7.5, 6, 8]}>
          <Emojis large>👖</Emojis>
          <Label>
            fabriquer
            <br />
            <strong>1 jeans</strong>
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[7.5, 6, 8]}>
          <Emojis>📱</Emojis>
          <Label>
            produire
            <br />
            <strong>1 smartphone</strong>
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[10, 8, 24]}>
          <Emojis>🥩🥩🥩</Emojis>
          <Label>
            consommer
            <br />
            <strong>3 repas avec du boeuf</strong>
          </Label>
        </Equivalent>
      </Equivalents>
      <Small>
        fabriquer
        <br />
        <strong>1 jeans</strong>
        <br />=<br />
        produire
        <br />
        <strong>1 smartphone</strong>
        <br />=<br />
        consommer
        <br />
        <strong>4 repas avec du boeuf</strong>
      </Small>
      <CenterLink to='/convertisseur'>
        Comparez à d'autres objets du quotidien
      </CenterLink>
    </>
  )
}
