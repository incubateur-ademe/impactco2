import React from 'react'

import Section from 'components/base/Section'
import Wrapper from 'components/misc/category/Wrapper'
import Description from 'components/misc/category/Description'
import Search from './category/Search'

export default function Category(props) {
  return (
    <Section>
      <Section.Content>
        <Wrapper
          name={props.category.title || props.category.name}
          slug={props.category.slug}
        >
          <Description description={props.category.description} />
          <Search />
        </Wrapper>
      </Section.Content>
    </Section>
  )
}
