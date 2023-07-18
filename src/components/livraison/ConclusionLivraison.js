import Section2 from "components/base/Section2";
import { Emojis } from "components/misc/Visualization";
import styled from "styled-components";

export default function ConclusionLivraison() {
  return (
    <>
      <Wrapper>
        <Section2>
          <Section2.InnerMargin>
            <Icon>
              <Emojis>📖</Emojis>
            </Icon>
            <SimpleText>Pour plus de conseils,</SimpleText>
          </Section2.InnerMargin>
        </Section2>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  background-color: #ebf2ff;
`;

const SimpleText = styled.div`
  color: ${(props) => props.theme.colors.deepDark};
`;

const Icon = styled.div`
  > span {
    display: flex;
    justify-content: flex-start;
  }
`;
