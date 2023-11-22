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
      title='Osez changer'
      description='En moyenne, les Français ont trois fois plus de paires de chaussures qu’ils n’en ont besoin... et vous ? Faites le test avec Impact CO2 et notre simulateur !'
      image='meta/osez-changer.png'
      breadcrumb={{
        type: 'equivalent',
        category: category,
      }}>
      <Section $withoutPadding>
        <Container>
          <Category category={category} />
          <OsezChanger />
        </Container>
      </Section>
      <Learning category={category} />
    </Web>
  )
}

export async function getStaticProps() {
  const category = categories?.find((category) => category.slug === 'habillement')
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
