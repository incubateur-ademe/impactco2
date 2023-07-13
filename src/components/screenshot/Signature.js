import Logo from "components/base/Logo";
import MagicLink from "components/base/MagicLink";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  bottom: 1rem;
  font-size: 0.875rem;
  left: 50%;
  pointer-events: none;
  position: absolute;
  transform: translateX(-50%);

  ${(props) => props.theme.mq.small} {
    left: auto;
    right: 1rem;
    transform: none;
  }
`;
const StyledLogo = styled(Logo)`
  bottom: 1rem;
  font-size: 0.571428571rem;
  left: 1rem;
  pointer-events: none;
  position: absolute;
`;

export default function Signature() {
  return (
    <>
      <StyledLogo />
      <Wrapper>
        <MagicLink to="https://impactco2.fr" noIcon>
          impactco2.fr
        </MagicLink>
      </Wrapper>
    </>
  );
}
