import {
  CenterLink,
  Emojis,
  Equals,
  Equivalent,
  Equivalents,
  Label,
  Small,
  Title,
} from "components/misc/Visualization";
import React from "react";

export default function Laut() {
  return (
    <>
      <Title>
        En termes d&apos;émissions de CO<sub>2</sub>e
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
          <Emojis margin={50}>🍈🍈🍈</Emojis>
          <Label>
            3 litres
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
      <CenterLink to="/boisson">Comparez avec d'autres boissons</CenterLink>
    </>
  );
}
