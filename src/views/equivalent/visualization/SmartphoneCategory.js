import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'
import Emoji from 'components/base/Emoji'

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
          <Emojis>📺</Emojis>
          <Label>1 télévision</Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[10, 8, 10]}>
          <Emojis>💻💻💻</Emojis>
          <Label>3 ordinateurs portables</Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[20, 12, 12]}>
          <Emojis>📱📱📱📱📱📱📱📱📱📱📱📱📱</Emojis>
          <Label>13 smartphones</Label>
        </Equivalent>
      </Equivalents>
      <CenterLink to='/categories/numerique'>
        Voir la catégorie numérique
      </CenterLink>
    </>
  )
}
