import React, { useState } from 'react'
import Section from 'components/base/Section'
import Description from 'components/misc/category/Description'
import Wrapper from 'components/misc/category/Wrapper'
import Hypothèses from './category/Hypothèses'
import Result from './category/Result'
import Search from './category/Search'

export default function Category(props) {
  const [numberEmails, setNumberEmails] = useState(50)

  return (
    <Section>
      <Section.Content>
        <Wrapper name={props.category.title || props.category.name} slug={props.category.slug}>
          <Description description={props.category.description} large />
          <Search numberEmails={numberEmails} setNumberEmails={setNumberEmails} />
          <Hypothèses />

          <Result numberEmails={numberEmails} construction={false} />
        </Wrapper>
      </Section.Content>
    </Section>
  )
}
