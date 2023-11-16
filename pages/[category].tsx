import React from 'react'
import styled from 'styled-components'
import { Category as CategoryType } from 'types/category'
import categories from 'data/categories.json'
import { Section, SectionWideContent } from 'components/base/Section'
import Web from 'components/layout/Web'
import Category from 'components/misc/Category'
import Learning from 'components/misc/Learning'
import OsezChanger from 'components/osezchanger/OsezChanger'

export default function CategoryPage({ category }: { category: CategoryType }) {
  return (
    <Web
      title={category.meta.title}
      description={category.meta.description}
      breadcrumb={{
        type: 'equivalent',
        category: category,
      }}>
      <Section $withoutPadding>
        <Container>
          <Category category={category} />
          {category.slug === 'habillement' && <OsezChanger />}
        </Container>
      </Section>
      <Learning category={category} />
    </Web>
  )
}

const independantCategories = [4, 9, 10, 12]

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
  gap: 40px 64px;
  justify-content: space-between;
  margin-bottom: 32px;
`
