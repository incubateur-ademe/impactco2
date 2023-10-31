import React from 'react'
import styled from 'styled-components'
import OutboundLink from 'components/base/OutboundLink'
import Section2 from 'components/base/Section2'
import LogoNGC from './img/LogoNGC'

export default function NGCCard() {
  return (
    <Wrapper>
      <Section2>
        <Section2.WideContent>
          <Section2.InnerMargin>
            <Card>
              <FlexContainer>
                <FlexLine1>
                  <CardTitle>
                    <strong>Calculer votre empreinte globale sur le climat</strong>
                  </CardTitle>
                  <CardText1>
                    Vous souhaitez aller plus loin en mesurant votre empreinte sur le climat ou celle d’un groupe de
                    personnes ?{' '}
                  </CardText1>
                  <CardText2>
                    Rendez-vous sur le simulateur&nbsp;
                    <strong>
                      <OutboundLink title='Nos Gestes Climat' href='https://nosgestesclimat.fr'>
                        Nos Gestes Climat
                      </OutboundLink>
                    </strong>
                  </CardText2>
                </FlexLine1>
                <FlexLine2>
                  <LogoNGC></LogoNGC>
                </FlexLine2>
              </FlexContainer>
            </Card>
          </Section2.InnerMargin>
        </Section2.WideContent>
      </Section2>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 3rem;
`
const Card = styled.div`
  border: 1px solid #ccdcfd;
  border-radius: 1rem;
`

const CardTitle = styled.div`
  color: ${(props) => props.theme.colors.main};
`
const CardText1 = styled.div`
  margin-top: 1rem;
`
const CardText2 = styled.div`
  margin-top: 0.25rem;
  ${(props) => props.theme.mq.small} {
    margin-top: 0.5rem;
  }
  a {
    text-underline-offset: 6px;
  }
`

const FlexContainer = styled.div`
  display: flex;
`
const FlexLine1 = styled.div`
  padding: 1rem;
`

const FlexLine2 = styled.div`
  margin-left: auto;
  ${(props) => props.theme.mq.medium} {
    display: none;
  }
  > svg {
    border-bottom-right-radius: 15px;
    border-top-right-radius: 15px;
    height: 100%;
  }
`
