import Link from 'next/link'
import styled from 'styled-components'
import Section2 from 'components/base/Section2'

export default function AvisLivraison() {
  return (
    <>
      <Wrapper>
        <Section2>
          <Section2.InnerMargin>
            <FlexContainer>
              <div>
                <H3Title>Un avis, une suggestion ? </H3Title>
                <Subtitle>Vos retours sont précieux pour améliorer le site Impact CO2.</Subtitle>
              </div>
              <ButtonPart>
                <Link
                  title={'Faire une suggestion'}
                  target='_blank'
                  rel='noreferrer noopener'
                  href={'https://tally.so/r/nP1e9b'}>
                  Faire une suggestion
                </Link>
              </ButtonPart>
            </FlexContainer>
          </Section2.InnerMargin>
        </Section2>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  border-bottom: 1px solid #6f87ae;
  margin-top: 1.5rem;
  padding-bottom: 2rem;
`

const FlexContainer = styled.div`
  display: flex;
  ${(props) => props.theme.mq.medium} {
    flex-direction: column;
  }
`

const ButtonPart = styled.div`
  align-items: center;
  display: flex;
  margin-left: auto;
  margin-right: 1rem;
  ${(props) => props.theme.mq.medium} {
    margin-left: 0;
    margin-right: auto;
    margin-top: 0.75rem;
  }
  a {
    background-color: #26827c;
    border-radius: 0.5rem;
    color: ${(props) => props.theme.colors.darkBackground};
    padding: 0.5rem 1rem;
    text-decoration: none;
  }
`

const H3Title = styled.h3`
  color: ${(props) => props.theme.colors.deepDarkReversible};
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: 0em;
  line-height: 2.5rem;
  margin: 0;
`

const Subtitle = styled.div`
  color: ${(props) => props.theme.colors.deepDarkReversible};
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 1.5rem;
`
