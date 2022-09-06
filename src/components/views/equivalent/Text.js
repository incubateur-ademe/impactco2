import React from 'react'

import Section from 'components/base/Section'
export default function Text(props) {
  return props.equivalent.hypothesis ? (
    <Section>
      <Section.Content>
        <p
          dangerouslySetInnerHTML={{ __html: props.equivalent.hypothesis.fr }}
        />
      </Section.Content>
    </Section>
  ) : null
}
