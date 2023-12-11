import IframeResizer from 'iframe-resizer-react'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import DataContext from 'components/providers/DataProvider'
import { Section, SectionWideContent } from 'components/base/Section'
import Web from 'components/layout/Web'
import Configurator from 'components/views/integration/Configurator'

const StyledIframeResizer = styled(IframeResizer)`
  border: 0.125rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  flex: 1;
  width: 100%;
`
const StyledSectionContent = styled(SectionWideContent)`
  align-items: flex-start;
  max-width: 100vw;
  width: 75rem;

  ${(props) => props.theme.mq.medium} {
    display: block;
  }
`
const ConfiguratorWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

export default function Integration() {
  const { equivalents, categories } = useContext(DataContext)

  const [theme, setTheme] = useState('default')

  // We keep "type" in url (and not 'slug") because of possible legacy links
  const [slug, setSlug] = useQueryParam('type', withDefault(StringParam, 'convertisseur'))

  useEffect(() => {
    if (slug === 'habillement/osez-changer') {
      setTheme('default')
    }
  }, [slug])

  const type = useMemo(() => {
    const equivalent = equivalents.find((equivalentItem) => equivalentItem.slug === slug)
    const category = categories.find((categoryItem) => slug.includes(categoryItem.slug))
    if (equivalent) {
      return 'equivalent'
    }
    if (category) {
      return 'category'
    }
    return 'convertisseur'
  }, [slug])

  const path = useMemo(() => {
    if (type === 'convertisseur') {
      return 'convertisseur'
    }
    if (type === 'category') {
      return slug
    }
    if (type === 'equivalent') {
      const equivalentSelected = equivalents.find((equivalentItem) => equivalentItem.slug === slug)
      const categoryOfEquivalent = categories.find((categoryItem) => categoryItem.id === equivalentSelected.category)
      return `${categoryOfEquivalent?.slug}/${slug}`
    }
  }, [categories, equivalents, type, slug])

  return (
    <Web title={"Intégrer l'outil"}>
      <Section>
        <ConfiguratorWrapper>
          <Configurator
            equivalents={equivalents}
            categories={categories}
            theme={theme}
            setTheme={setTheme}
            type={type}
            slug={slug}
            setSlug={setSlug}
            path={path}
          />
        </ConfiguratorWrapper>
      </Section>
      <Section $withoutPadding>
        <StyledSectionContent $flex>
          <StyledIframeResizer
            src={`/iframes/${path}?theme=${theme}`}
            allowFullScreen={true}
            webkitallowfullscreen='true'
            mozallowfullscreen='true'
          />
        </StyledSectionContent>
      </Section>
    </Web>
  )
}
