import React from 'react'
import styled from 'styled-components'
import { Category as CategoryType } from 'types/category'
import categories from 'data/categories.json'
import { Section, SectionWideContent } from 'components/base/Section'
import SuggestionBanner from 'components/contact/SuggestionBanner'
import Web from 'components/layout/Web'
import Category from 'components/misc/Category'

export default function CategoryPage({ category }: { category: CategoryType }) {
  return (
    <Web
      title={category.meta.title}
      description={category.meta.description}
      image={`meta/${category.slug}.png`}
      breadcrumb={{
        type: 'equivalent',
        category: category,
      }}>
      <Section $withoutPadding>
        <Container>
          <Content>
            <Category category={category} />
          </Content>
        </Container>
      </Section>
      <SuggestionBanner
        from={category.slug}
        fromLabel={category.name}
        simulatorName={`comparateur ${category.name.toLowerCase()}`}
      />
    </Web>
  )
}

const independantCategories = [4, 8, 9, 10, 12]

export async function getStaticPaths() {
  return {
    paths: categories
      .filter((category) => !independantCategories.includes(category.id))
      .map((category) => ({
        params: { category: category.slug },
      })),
    fallback: 'blocking',
  }
}
export async function getStaticProps({ params }: { params: { category: string } }) {
  const category = categories?.find((category) => category.slug === params.category)
  if (!category) {
    return { notFound: true }
  }
  return {
    props: {
      category,
    },
  }
}

const Container = styled(SectionWideContent)`
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem 4rem;
  justify-content: center;
  margin-bottom: 2rem;
`

const Content = styled.div`
  flex: 1;
`
