import { Emojis } from "components/misc/Visualization";
import React from "react";
import styled from "styled-components";

export default function AdviceLivraisonDetail(props) {
  return (
    <>
      <Wrapper>
        <Heading>
          <H3Title>{props.title}</H3Title>
        </Heading>
        {props.line1Text ? (
          <>
            <Item>
              <Line>
                <Icon>
                  <Emojis>{props.line1Emoji}</Emojis>
                </Icon>
                <Text>{props.line1Text}</Text>
              </Line>
              <Line>
                <Icon></Icon>
                <Subtext>{props.line1Subtext}</Subtext>
              </Line>
            </Item>
          </>
        ) : (
          <></>
        )}
        {props.line2Text ? (
          <>
            <Item>
              <Line>
                <Icon>
                  <Emojis>{props.line2Emoji}</Emojis>
                </Icon>
                <Text>{props.line2Text}</Text>
              </Line>
              <Line>
                <Icon></Icon>
                <Subtext>{props.line2Subtext}</Subtext>
              </Line>
            </Item>
          </>
        ) : (
          <></>
        )}
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
  padding: 2rem;
`;

const Heading = styled.div``;

const Line = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
`;

const Icon = styled.div`
  margin-right: 0.5rem;
  width: 40px;
  > span {
    margin-bottom: 0;
  }
`;

const Text = styled.div`
  color: ${(props) => props.theme.colors.deepDark};
  font-size: 16px;
  line-height: 24px;
`;

const Subtext = styled.div`
  color: ${(props) => props.theme.colors.textGray2};
  font-size: 12px;
  line-height: 16px;
`;

const Item = styled.div`
  margin-bottom: 1rem;
`;
