import OutboundLink from "components/base/OutboundLink.js";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 2rem;
  text-align: right;
  ${(props) => props.theme.mq.medium} {
    margin-bottom: 1rem;
  }
  ${(props) => props.theme.mq.small} {
    margin-bottom: 0;
  }
`;
const UpdatedAt = styled.span`
  color: #564d53;
`;
export default function SourceAgribalyse() {
  return (
    <Wrapper>
      <span> Source : </span>
      <OutboundLink title="Agribalyse 3.1.1" href="https://agribalyse.ademe.fr/app" data-testid="lien-agribalyse">
        Agribalyse 3.1.1{" "}
      </OutboundLink>
      <span> - </span>
      <UpdatedAt>Mise à jour le 10/08/2023 </UpdatedAt>
    </Wrapper>
  );
}
