import React from 'react'
import styled from 'styled-components'
import { Section, SectionWideContent } from 'components/base/Section'

const Title = styled.h2`
  color: ${(props) => props.theme.colors.text};
  text-align: center;
`
const Text = styled.div``
export default function Details(props) {
  return (
    <Section id='sources'>
      <SectionWideContent>
        <Title>Sources et hypothèses</Title>
        <Text
          dangerouslySetInnerHTML={{
            __html: props.equivalent.sources,
          }}
        />
      </SectionWideContent>
    </Section>
  )
}
