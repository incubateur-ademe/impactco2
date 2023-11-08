import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import OutboundLink from 'components/base/OutboundLink'
import { Section2, Section2InnerMargin, Section2WideContent } from 'components/base/Section2'

export default function NGCCard() {
  return (
    <Wrapper>
      <Section2>
        <Section2WideContent>
          <Section2InnerMargin>
            <Card>
              <CardImage>
                <Image src='/images/logoNGC.svg' alt='' width={196} height={152} />
              </CardImage>
              <CardTitle>
                <strong>Calculer votre empreinte globale sur le climat</strong>
              </CardTitle>
              <CardText>
                Vous souhaitez aller plus loin en mesurant votre empreinte sur le climat ou celle d’un groupe de
                personnes ?
                <br />
                Rendez-vous sur le simulateur&nbsp;
                <strong>
                  <OutboundLink title='Nos Gestes Climat' href='https://nosgestesclimat.fr'>
                    Nos Gestes Climat
                  </OutboundLink>
                </strong>
              </CardText>
            </Card>
          </Section2InnerMargin>
        </Section2WideContent>
      </Section2>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 3rem;
`
const Card = styled.div`
  border: 1px solid #ccdcfd;
  border-radius: 2rem;
  padding: 2rem 2.5rem;
  position: relative;
`

const CardTitle = styled.div`
  color: ${(props) => props.theme.colors.main};
  font-size: 18px;
  line-height: 32px;
  margin-bottom: 8px;
`
const CardText = styled.div`
  line-height: 24px;
  ${(props) => props.theme.mq.small} {
    margin-top: 0.5rem;
  }
  a {
    text-underline-offset: 6px;
  }
`

const CardImage = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  @media screen and (max-width: 1307px) {
    display: none;
  }
  > img {
    border-bottom-right-radius: 32px;
    border-top-right-radius: 32px;
    height: 100%;
  }
`
