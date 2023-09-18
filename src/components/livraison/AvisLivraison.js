import Button from "components/base/Button";
import Section2 from "components/base/Section2";
import styled from "styled-components";

export default function AvisLivraison() {
  return (
    <>
      <Wrapper>
        <Section2>
          <Section2.InnerMargin>
            <FlexContainer>
              <TextPart>
                <H3Title>Un avis, une suggestion ? </H3Title>
                <Subtitle>Vos retours sont précieux pour améliorer le site Impact CO2.</Subtitle>
              </TextPart>
              <ButtonPart>
                <StyledButtonWrapper>
                  <Button>Faire une suggestion</Button>
                </StyledButtonWrapper>
              </ButtonPart>
            </FlexContainer>
          </Section2.InnerMargin>
        </Section2>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  border-bottom: 1px solid #6f87ae;
  margin-top: 1.5rem;
  padding-bottom: 2rem;
`;

const FlexContainer = styled.div`
  display: flex;
  ${(props) => props.theme.mq.medium} {
    flex-direction: column;
  }
`;

const TextPart = styled.div``;

const ButtonPart = styled.div`
  margin-left: auto;
  margin-right: 1rem;
`;

const H3Title = styled.h3`
  color: ${(props) => props.theme.colors.deepDark};
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: 0em;
  line-height: 2.5rem;
  margin: 0;
`;

const Subtitle = styled.div`
  color: ${(props) => props.theme.colors.deepDark};
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 1.5rem;
`;

const StyledButtonWrapper = styled(Button.Wrapper)`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 0 0 1rem 1rem;
  border-top: 0.0625rem solid ${(props) => props.theme.colors.textLight};
  padding: 0.5rem;
`;
