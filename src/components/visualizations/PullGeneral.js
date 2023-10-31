import React from 'react'
import { CenterLink, Emojis, Equals, Equivalent, Equivalents, Label, Small, Title } from 'components/misc/Visualization'

export default function PullGeneral() {
  return (
    <>
      <Title>
        En termes d&apos;émissions de CO<sub>2</sub>e
      </Title>
      <Equivalents>
        <Equivalent size={[7.5, 6, 8]}>
          <Emojis>🧶</Emojis>
          <Label>
            fabriquer
            <br />
            <strong>1 pull en laine</strong>
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[10, 8, 16]}>
          <Emojis>📱📱</Emojis>
          <Label>
            produire
            <br />
            <strong>2 smartphones</strong>
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent size={[10, 6, 24]}>
          <Emojis>🔊🔊🔊🔊🔊🔊</Emojis>
          <Label>
            produire
            <br />
            <strong>6 enceintes bluetooth</strong>
          </Label>
        </Equivalent>
      </Equivalents>
      <Small>
        produire
        <br />
        <strong>1 smartphone</strong>
        <br />=<br />
        consommer
        <br />
        <strong>4 repas avec du boeuf</strong>
        <br />=<br />
        fabriquer
        <br />
        <strong>5 t-shirts</strong>
        <br />
      </Small>
      <CenterLink to='/convertisseur'>Comparez à d'autres objets du quotidien</CenterLink>
    </>
  )
}
