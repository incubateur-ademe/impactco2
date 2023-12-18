import React from 'react'
import { Section, SectionWideContent } from 'components/base/Section'

export default function Text(props) {
  return props.equivalent.hypothesis ? (
    <Section>
      <SectionWideContent $size='sm'>
        <p dangerouslySetInnerHTML={{ __html: props.equivalent.hypothesis }} />
      </SectionWideContent>
    </Section>
  ) : null
}
