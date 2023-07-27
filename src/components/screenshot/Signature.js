import Ademe from "components/base/Ademe";
import Logo from "components/base/Logo";
import MagicLink from "components/base/MagicLink";
import Marianne from "components/base/Marianne";
import React from "react";
import styled from "styled-components";

export default function Signature() {
  return (
    <>
      <OutsideGrid>
        <FirstWrapper>
          <Marianne />
          <Ademe />
        </FirstWrapper>
        <MiddleWrapper>
          <MagicLink to="https://impactco2.fr" noIcon>
            impactco2.fr
          </MagicLink>
        </MiddleWrapper>
        <StyledLogo />
      </OutsideGrid>
    </>
  );
}

const StyledLogo = styled(Logo)`
  display: flex;
  justify-content: flex-end;
`;

const OutsideGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const FirstWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 1.25rem;
`;

const MiddleWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;
