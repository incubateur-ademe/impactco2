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

export default function Laut() {
  return (
    <>
      <Title>
        En termes d&apos;émissions de CO2<sub>e</sub>
      </Title>
      <Equivalents>
        <Equivalent size={[14, 8, 30]}>
          <Emojis margin={50}>🥛</Emojis>
          <Label>
            1 litre
            <br />
            de lait de vache
          </Label>
        </Equivalent>
        <Equals>=</Equals>

        <Equivalent size={[14, 8, 30]}>
          <Emojis margin={50}>🍈🍈🍈🍈</Emojis>
          <Label>
            4 litres
            <br />
            de lait de soja
          </Label>
        </Equivalent>
      </Equivalents>
      <Small>
        <br /> 1 litre de lait de vache
        <br />=
        <br />
        4 litres de lait de soja
        <br />
      </Small>
      <CenterLink to='/categories/boisson'>
        Voir la catégorie boisson
      </CenterLink>{' '}
    </>
  )
}
