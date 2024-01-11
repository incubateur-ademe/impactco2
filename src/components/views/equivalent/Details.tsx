import React from 'react'
import styled from 'styled-components'
import { Category } from 'types/category'
import { Equivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import { MEDIA } from 'utils/styles'
import useModalContext from 'components/providers/ModalProvider'
import { Section, SectionWideContent } from 'components/base/Section'
import Button from 'components/base/buttons/Button'
import Link from 'components/base/buttons/Link'
import Value from './details/Value'

const Subtitle = styled.span`
  font-size: 1.75rem;
  font-weight: 300;
  line-height: 0;
  white-space: nowrap;

  ${MEDIA.LT.SMALL} {
    font-size: 1.125rem;
    line-height: inherit;
  }
`
const Br = styled.br`
  display: none;
  ${MEDIA.LT.SMALL} {
    display: inline;
  }
`
const Disclaimer = styled.p`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  max-width: 27.25rem;
`
const StyledLink = styled(Link)`
  font-size: 0.875rem;
`

export default function Details({ equivalent, category }: { equivalent: Equivalent; category: Category }) {
  const { setCo2e, setWarningNegaoctet } = useModalContext()
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
                <Button asLink onClick={() => setCo2e(true)}>
                  CO<sub>2</sub>e
                </Button>{' '}
                émis {equivalent.include.post}
              </>
            ) : (
              <>
                Valeurs exprimées en kg{' '}
                <Button asLink onClick={() => setCo2e(true)}>
                  CO<sub>2</sub>e
                </Button>{' '}
                émis {category.include}
              </>
            )}
          </Disclaimer>
          {equivalent?.slug === 'stockagedonnee' ? (
            <>
              <Disclaimer>
                <Button asLink onClick={() => setWarningNegaoctet(true)}>
                  Source
                </Button>
              </Disclaimer>
            </>
          ) : (
            <>{equivalent.source && <StyledLink href={equivalent.source}>Source</StyledLink>}</>
          )}
        </SectionWideContent>
      </Section>
    </>
  )
}
