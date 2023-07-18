import Section2 from "components/base/Section2";
import { Emojis } from "components/misc/Visualization";
import styled from "styled-components";

export default function ConclusionLivraison() {
  return (
    <>
      <Wrapper>
        <Section2>
          <Section2.InnerMargin>
            <UpperBubble>
              <Icon>
                <Emojis>📖</Emojis>
              </Icon>
            </UpperBubble>
            <TextContainer>
              <SimpleText>
                Pour plus de conseils, télécharger le guide de l’ADEME « E-consommateur & responsable »
              </SimpleText>
            </TextContainer>
          </Section2.InnerMargin>
        </Section2>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  background-color: #ebf2ff;
  margin-bottom: 2rem;
  margin-top: 2.5rem;
`;

const SimpleText = styled.div`
  color: ${(props) => props.theme.colors.deepDark};
`;

const UpperBubble = styled.div`
  position: relative;
`;

const Icon = styled.div`
  background: #ebf2ff;
  border-radius: 16px;
  position: absolute;
  top: -21px;
  > span {
    display: block;
    font-size: 2rem;
    margin-bottom: 0;
    padding: 0.3rem;
    text-align: left;
  }
`;

const TextContainer = styled.div`
  padding: 1.5rem 0 1.5rem 3rem;
`;
