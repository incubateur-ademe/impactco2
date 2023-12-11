import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import { track } from 'utils/matomo'
import OutboundLink from 'components/base/OutboundLink'
import { Section, SectionWideContent } from 'components/base/Section'

const LOGO_HEIGHT = 152

export default function NGCCard() {
  return (
    <Section>
      <SectionWideContent>
        <Card>
          <CardImage>
            <Image src='/images/logoNGC.svg' alt='' width={196} height={LOGO_HEIGHT} />
          </CardImage>
          <CardTitle>
            <strong>Calculez votre empreinte globale sur le climat</strong>
          </CardTitle>
          <CardText>
            Vous souhaitez aller plus loin en mesurant votre empreinte sur le climat ou celle d’un groupe de personnes ?
            <br />
            Rendez-vous sur le simulateur&nbsp;
            <strong>
              <OutboundLink
                title='Nos Gestes Climat'
                href='https://nosgestesclimat.fr'
                onClick={() => track('Click', 'NGC', 'click_ngc')}>
                Nos Gestes Climat
              </OutboundLink>
            </strong>
          </CardText>
        </Card>
      </SectionWideContent>
    </Section>
  )
}

const Card = styled.div`
  border-radius: 2rem;
  min-height: ${LOGO_HEIGHT}px;
  outline: 1px solid #ccdcfd;
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
    border-bottom-right-radius: 2rem;
    border-top-right-radius: 2rem;
  }
`
