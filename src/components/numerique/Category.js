import React, { useState } from 'react'

import Section from 'components/base/Section'
import Wrapper from 'components/misc/category/Wrapper'
import Description from 'components/misc/category/Description'
import Search from './category/Search'
import Result from './category/Result'
import Devices from './category/Devices'

export default function Category(props) {
  const [numberEmails, setNumberEmails] = useState(50)
  const [construction, setConstruction] = useState(true)

  return (
    <Section>
      <Section.Content>
        <Wrapper
          name={props.category.title || props.category.name}
          slug={props.category.slug}
        >
          <Description description={props.category.description} />
          <Search
            numberEmails={numberEmails}
            setNumberEmails={setNumberEmails}
          />
          <Result numberEmails={numberEmails} construction={construction} />
          <Devices
            construction={construction}
            setConstruction={setConstruction}
          />
        </Wrapper>
      </Section.Content>
    </Section>
  )
}
