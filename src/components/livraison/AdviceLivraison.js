import React from "react";
import styled from "styled-components";

export default function AdviceLivraison() {
  return (
    <>
      <Separator />
      <H2Title>Conseils pour réduire l'impact carbone de vos livraisons</H2Title>
    </>
  );
}

const Separator = styled.hr`
  background-color: #457be7;
  border: none;
  color: #457be7;
  height: 4px;
  margin-bottom: 2rem;
  margin-left: 0;
  margin-top: 1rem;
  width: 56px;
`;

const H2Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
  margin-top: 0;
`;
