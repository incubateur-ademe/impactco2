import React, { useContext } from 'react'
import styled from 'styled-components'
import formatName from 'utils/formatName'
import ModalContext from 'components/providers/ModalProvider'
import ButtonLink from 'components/base/ButtonLink'
import MagicLink from 'components/base/MagicLink'
import { Section, SectionWideContent } from 'components/base/Section'
import Value from './details/Value'

const Title = styled.h1``
const Subtitle = styled.span`
  font-size: 1.75rem;
  font-weight: 300;
  line-height: 0;
  white-space: nowrap;

  ${(props) => props.theme.mq.small} {
    font-size: 1.125rem;
    line-height: inherit;
  }
`
const Br = styled.br`
  display: none;
  ${(props) => props.theme.mq.small} {
    display: inline;
  }
`
const Disclaimer = styled.p`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  max-width: 27.25rem;
`
const StyledMagicLink = styled(MagicLink)`
  font-size: 0.875rem;
`

export default function Details(props) {
  const { setCo2e, setWarningNegaoctet } = useContext(ModalContext)
  return (
    <>
      <Section $withoutPadding>
        <SectionWideContent $small>
          <Title>
            {props.equivalent.prefix && <>{formatName(props.equivalent.prefix, 1, true)}</>}
            {formatName(props.equivalent.name, 1, !props.equivalent.prefix)}
            <Br /> {props.equivalent.subtitle && <Subtitle>({formatName(props.equivalent.subtitle, 1)})</Subtitle>}
          </Title>
        </SectionWideContent>
      </Section>
      <Value equivalent={props.equivalent} category={props.category} />
      <Section $withoutPadding>
        <SectionWideContent $flex $small>
          <Disclaimer>
            Valeurs exprimées en kg{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>{' '}
            émis {props.equivalent?.include || props.category?.include}.
          </Disclaimer>
          {props?.equivalent?.slug === 'stockagedonnee' ? (
            <>
              <Disclaimer>
                <ButtonLink onClick={() => setWarningNegaoctet(true)}>Source</ButtonLink>
              </Disclaimer>
            </>
          ) : (
            <>
              <StyledMagicLink to={props.equivalent.source}>Source</StyledMagicLink>
            </>
          )}
        </SectionWideContent>
      </Section>
    </>
  )
}
