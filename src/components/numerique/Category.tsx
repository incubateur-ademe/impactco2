import React, { useState } from 'react'
import { Category as CategoryType } from 'types/category'
import { Section, SectionWideContent } from 'components/base/Section'
import Description from 'components/misc/category/Description'
import Wrapper from 'components/misc/category/Wrapper'
import Hypothèses from './category/Hypothèses'
import Result from './category/Result'
import Search from './category/Search'

export default function Category({ category }: { category: CategoryType }) {
  const [numberEmails, setNumberEmails] = useState(50)

  return (
    <Section $withoutPadding>
      <SectionWideContent $small>
        <Wrapper name={category.title || category.name} slug={category.slug} tracking={category.name}>
          <Description description={category.description} large />
          <Search numberEmails={numberEmails} setNumberEmails={setNumberEmails} />
          <Hypothèses />
          <Result numberEmails={numberEmails} construction={false} />
        </Wrapper>
      </SectionWideContent>
    </Section>
  )
}
