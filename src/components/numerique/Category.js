import React, { useState } from 'react'

import Section from 'components/base/Section'
import Wrapper from 'components/misc/category/Wrapper'
import Search from './category/Search'
import Result from './category/Result'

export default function Category(props) {
  const [numberEmails, setNumberEmails] = useState(50)
  const [construction, setConstruction] = useState(false)

  return (
    <Section>
      <Section.Content>
        <Wrapper
          name={props.category.title || props.category.name}
          description={props.category.description}
          descriptionKeyword={props.category.descriptionKeyword}
          slug={props.category.slug}
        >
          <Search
            numberEmails={numberEmails}
            setNumberEmails={setNumberEmails}
          />
          <Result numberEmails={numberEmails} construction={construction} />
        </Wrapper>
      </Section.Content>
    </Section>
  )
}
