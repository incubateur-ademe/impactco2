import React from "react";
import styled from "styled-components";

export default function AdviceLivraisonDetail(props) {
  return (
    <>
      <Wrapper>
        <Heading>
          <H3Title>{props.title}</H3Title>
        </Heading>
        {props.line1Title ? <>oui</> : <>non</>}
      </Wrapper>
    </>
  );
}

const H3Title = styled.h3`
  color: ${(props) => props.theme.colors.main3};
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.darkBackground};
  border-radius: 8px;
`;

const Heading = styled.div``;
