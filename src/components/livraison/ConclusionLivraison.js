import Section2 from "components/base/Section2";
import { Emojis } from "components/misc/Visualization";
import Link from "next/link";
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
                Pour plus de conseils,{" "}
                <Link
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://librairie.ademe.fr/cadic/4466/guide-pratique-econsommateur-responsable.pdf"
                >
                  télécharger le guide de l’ADEME « E-consommateur & responsable »
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-box-arrow-up-right"
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
                </Link>
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
  border-bottom: 1px solid #6f87ae;
  margin-bottom: 2rem;
  margin-top: 2.5rem;
`;

const SimpleText = styled.div`
  color: ${(props) => props.theme.colors.deepDark};
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  > a {
    color: ${(props) => props.theme.colors.firstBlue};
  }
  svg {
    margin-left: 0.25rem;
  }
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
    padding: 0.25rem;
    padding-top: 0.1rem;
    text-align: left;
  }
`;

const TextContainer = styled.div`
  padding: 1.5rem 0 1.5rem 3rem;
`;
