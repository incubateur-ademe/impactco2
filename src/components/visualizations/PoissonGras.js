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

export default function PoissonGras() {
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
        <Equivalent size={[10, 7, 22]}>
          <Emojis margin={70}>🐟🐟🐟🐟</Emojis>
          <Label>
            4 repas avec
            <br />
            du poisson gras
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
        4 repas avec
        <br />
        du poisson gras
        <br />=<br />
        14 repas
        <br />
        végétariens
        <br />
      </Small>
      <CenterLink to='/repas'>Comparez avec d'autres repas</CenterLink>
    </>
  )
}
