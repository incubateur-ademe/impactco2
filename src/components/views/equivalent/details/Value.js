import Emoji from "components/base/Emoji";
import Section from "components/base/Section";
import React from "react";
import styled from "styled-components";
import { getFrenchFormattedNumber, getNumberWithNDigitsAfterComma, formatTotal, formatNumber } from "utils/formatters";

const StyledSection = styled(Section)`
  background-color: ${(props) => props.theme.colors.main};
  margin-bottom: 0.75rem;
  padding: 0.5rem 0;
`;
const Top = styled.div`
  border-radius: 1rem 1rem 0 0;
  color: ${(props) => props.theme.colors.background};
  position: relative;
`;
const Number = styled.span`
  font-size: 3.75rem;
  font-weight: bold;

  ${(props) => props.theme.mq.small} {
    font-size: 3rem;
  }
`;
const Unit = styled.span`
  font-size: 1rem;

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`;
const Big = styled.span`
  font-size: 1.25rem;

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
`;
const StyledEmoji = styled(Emoji)`
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 5.25rem;
  display: flex;
  font-size: 3rem;
  height: 4.5rem;
  justify-content: center;
  margin-top: 0.325rem;
  width: 4.5rem;

  ${(props) => props.theme.mq.small} {
    font-size: 2rem;
    height: 3.25rem;
    width: 3.25rem;
  }
`;
export default function Value(props) {
  let numberToDisplay = formatTotal(props.equivalent);
  return (
    <StyledSection>
      <Section.Content flex>
        <Top>
          <div>
            <Number>
              {numberToDisplay < 0.02
                ? formatNumber(formatTotal(props.equivalent))
                : getFrenchFormattedNumber(getNumberWithNDigitsAfterComma(formatTotal(props.equivalent), 2))}
            </Number>{" "}
            <Unit>
              kg <Big>CO2</Big>e{" "}
              {(props.equivalent.unit || props.category.unit) && <>/ {props.equivalent.unit || props.category.unit}</>}
            </Unit>
          </div>
        </Top>
        <StyledEmoji>{props.equivalent.emoji}</StyledEmoji>
      </Section.Content>
    </StyledSection>
  );
}
