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

export default function PoissonBlanc() {
  return (
    <>
      <Title>
        En termes d&apos;émissions de CO<sub>2</sub>e
      </Title>
      <Equivalents>
        <Equivalent size={[7.5, 6, 8]}>
          <Emojis>🥩</Emojis>
          <Label>
            1 repas avec
            <br />
            du boeuf
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[12, 7, 30]}>
          <Emojis>🐟🐟🐟🐟🐟🐟🐟</Emojis>
          <Label>
            7 repas avec
            <br />
            du poisson blanc
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[20, 15, 30]}>
          <Emojis>🥗🥗🥗🥗🥗🥗🥗🥗🥗🥗🥗🥗🥗🥗</Emojis>
          <Label>
            14 repas
            <br />
            végétariens
          </Label>
        </Equivalent>
      </Equivalents>
      <Small>
        <br />
        1 repas avec
        <br />
        du boeuf
        <br />=<br />
        7 repas avec
        <br />
        du poisson blanc
        <br />=<br />
        14 repas
        <br />
        végétariens
        <br />
      </Small>
      <CenterLink to='/repas'>Voir tous les repas</CenterLink>
    </>
  )
}
