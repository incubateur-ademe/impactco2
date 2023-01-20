import React, { useState, useContext, useMemo } from 'react'
import styled from 'styled-components'
import IframeResizer from 'iframe-resizer-react'
import { useQueryParam, StringParam, withDefault } from 'use-query-params'

import DataContext from 'components/providers/DataProvider'
import Web from 'components/layout/Web'
import Section from 'components/base/Section'
import Configurator from 'components/views/integration/Configurator'

const StyledIframeResizer = styled(IframeResizer)`
  flex: 1;
  width: 100%;
  border: 0.125rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
`
const StyledSectionContent = styled(Section.Content)`
  align-items: flex-start;
  width: 75rem;
  max-width: 100vw;

  ${(props) => props.theme.mq.medium} {
    display: block;
  }
`
export default function Integration() {
  const { equivalents, categories } = useContext(DataContext)

  const [theme, setTheme] = useState('default')

  // We keep "type" in url (and not 'slug") because of possible legacy links
  const [slug, setSlug] = useQueryParam(
    'type',
    withDefault(StringParam, 'tuiles')
  )
  const type = useMemo(() => {
    const equivalent = equivalents.find(
      (equivalentItem) => equivalentItem.slug === slug
    )
    const category = categories.find(
      (categoryItem) => categoryItem.slug === slug
    )
    if (equivalent) {
      return 'equivalent'
    }
    if (category) {
      return 'category'
    }
    return 'tuiles'
  }, [slug])

  const path = useMemo(() => {
    console.log(type)
    if (type === 'tuiles') {
      return 'tuiles'
    }
    if (type === 'category') {
      return slug
    }
    if (type === 'equivalent') {
      const equivalentSelected = equivalents.find(
        (equivalentItem) => equivalentItem.slug === slug
      )
      const categoryOfEquivalent = categories.find(
        (categoryItem) => categoryItem.id === equivalentSelected.id
      )
      return `${categoryOfEquivalent?.slug}/${slug}`
    }
  }, [categories, equivalents, type, slug])

  return (
    <Web>
      <Section>
        <StyledSectionContent flex>
          <Configurator
            equivalents={equivalents}
            categories={categories}
            theme={theme}
            setTheme={setTheme}
            type={type}
            slug={slug}
            setSlug={setSlug}
          />
          <StyledIframeResizer
            src={`/iframes/${path}?theme=${theme}`}
            allowfullscreen='true'
            webkitallowfullscreen='true'
            mozallowfullscreen='true'
          />
        </StyledSectionContent>
      </Section>
    </Web>
  )
}
