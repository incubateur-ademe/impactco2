import React, { useState } from 'react'

import Section from 'components/base/Section'
import Wrapper from 'components/misc/category/Wrapper'
import Search from './category/Search'
import Result from './category/Result'
import Learning from 'components/misc/category/Learning'
import Hypothèses from './category/Hypothèses'
import Description from 'components/misc/category/Description'

export default function Category(props) {
  const [numberEmails, setNumberEmails] = useState(50)

  return (
    <Section>
      <Section.Content>
        <Wrapper
          name={props.category.title || props.category.name}
          slug={props.category.slug}
        >
          <Description description={props.category.description} large />
          <Search
            numberEmails={numberEmails}
            setNumberEmails={setNumberEmails}
          />
          <Hypothèses />

          <Result numberEmails={numberEmails} construction={false} />
        </Wrapper>
      </Section.Content>
      <Learning category={props.category} />
    </Section>
  )
}
