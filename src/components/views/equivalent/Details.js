import Value from "./details/Value";
import ButtonLink from "components/base/ButtonLink";
import MagicLink from "components/base/MagicLink";
import Section from "components/base/Section";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";
import styled from "styled-components";
import { formatName } from "utils/formatters";

const Title = styled.h1``;
const Subtitle = styled.span`
  font-size: 1.75rem;
  font-weight: 300;
  line-height: 0;
  white-space: nowrap;

  ${(props) => props.theme.mq.small} {
    font-size: 1.125rem;
    line-height: inherit;
  }
`;
const Br = styled.br`
  display: none;
  ${(props) => props.theme.mq.small} {
    display: inline;
  }
`;
const StyledSectionContent = styled(Section.Content)`
  margin-bottom: 3.5rem;

  ${(props) => props.theme.mq.small} {
    display: block;
    margin-bottom: 2rem;
  }
`;
const Disclaimer = styled.p`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  max-width: 27.25rem;
`;
const StyledMagicLink = styled(MagicLink)`
  font-size: 0.875rem;
`;

const ButtonWarning = styled.button`
  cursor: pointer;
`;

export default function Details(props) {
  const { setCo2e, setWarningNegaoctet } = useContext(ModalContext);
  console.log(props);
  return (
    <>
      <Section>
        <Section.Content flex>
          <Title>
            {props.equivalent.prefix && <>{formatName(props.equivalent.prefix, 1, true)}</>}
            {formatName(props.equivalent.name, 1, !props.equivalent.prefix)}
            <Br /> {props.equivalent.subtitle && <Subtitle>({formatName(props.equivalent.subtitle, 1)})</Subtitle>}
          </Title>
        </Section.Content>
      </Section>
      <Value equivalent={props.equivalent} category={props.category} />
      <Section>
        <StyledSectionContent flex>
          <Disclaimer>
            Valeurs exprimées en kg{" "}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>{" "}
            émis {props.equivalent?.include || props.category?.include}.
          </Disclaimer>
          {props?.equivalent?.slug === "stockagedonnee" ? (
            <>
              <ButtonWarning onClick={() => setWarningNegaoctet(true)}>
                Source
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-box-arrow-up-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                  />
                </svg>
              </ButtonWarning>
            </>
          ) : (
            <>
              <StyledMagicLink to={props.equivalent.source}>Source</StyledMagicLink>
            </>
          )}
        </StyledSectionContent>
      </Section>
    </>
  );
}
