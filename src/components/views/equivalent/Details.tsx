import React, { useContext } from 'react'
import styled from 'styled-components'
import { Category } from 'types/category'
import { Equivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import ModalContext from 'components/providers/ModalProvider'
import ButtonLink from 'components/base/ButtonLink'
import MagicLink from 'components/base/MagicLink'
import { Section, SectionWideContent } from 'components/base/Section'
import Value from './details/Value'

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

export default function Details({ equivalent, category }: { equivalent: Equivalent; category: Category }) {
  const { setCo2e, setWarningNegaoctet } = useContext(ModalContext)
  return (
    <>
      <Section $withoutPadding>
        <SectionWideContent $size='sm'>
          <h1>
            {equivalent.prefix && <>{formatName(equivalent.prefix, 1, true)}</>}
            {formatName(equivalent.name, 1, !equivalent.prefix)}
            {equivalent.suffix}
            <Br /> {equivalent.subtitle && <Subtitle>({formatName(equivalent.subtitle, 1)})</Subtitle>}
          </h1>
        </SectionWideContent>
      </Section>
      <Value equivalent={equivalent} category={category} />
      <Section $withoutPadding>
        <SectionWideContent $flex $size='sm'>
          <Disclaimer>
            {equivalent.include ? (
              <>
                {equivalent.include.pre}
                <br />
                Valeurs exprimées en kg{' '}
                <ButtonLink onClick={() => setCo2e(true)}>
                  CO<sub>2</sub>e
                </ButtonLink>{' '}
                émis {equivalent.include.post}
              </>
            ) : (
              <>
                Valeurs exprimées en kg{' '}
                <ButtonLink onClick={() => setCo2e(true)}>
                  CO<sub>2</sub>e
                </ButtonLink>{' '}
                émis {category.include}
              </>
            )}
          </Disclaimer>
          {equivalent?.slug === 'stockagedonnee' ? (
            <>
              <Disclaimer>
                <ButtonLink onClick={() => setWarningNegaoctet(true)}>Source</ButtonLink>
              </Disclaimer>
            </>
          ) : (
            <>{equivalent.source && <StyledMagicLink to={equivalent.source}>Source</StyledMagicLink>}</>
          )}
        </SectionWideContent>
      </Section>
    </>
  )
}
