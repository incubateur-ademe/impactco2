import React from 'react'

import {
  Emojis,
  Equals,
  Equivalent,
  Equivalents,
  Label,
  Small,
  Title,
} from 'components/misc/Visualization'

export default function Liseuse() {
  return (
    <>
      <Title>
        En termes d&apos;émissions de CO<sub>2</sub>e
      </Title>

      <Equivalents>
        <Equivalent size={[7.5, 6, 8]}>
          <Emojis>📱</Emojis>
          <Label>1 liseuse</Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[29, 18, 66]}>
          <Emojis>
            📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗
            📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗📗
          </Emojis>
          <Label>50 livres papier</Label>
        </Equivalent>
      </Equivalents>
      <Small>
        <br />
        1 liseuse
        <br />=<br />
        50 livres papier
        <br />
      </Small>
    </>
  )
}
