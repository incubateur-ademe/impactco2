import React from "react";
import styled from "styled-components";

export default function AdviceLivraisonDetail(props) {
  return (
    <>
      <H3Title>{props.title}</H3Title>
    </>
  );
}

const H3Title = styled.h3`
  color: ${(props) => props.theme.colors.main3};
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;
