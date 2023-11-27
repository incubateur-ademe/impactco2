import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Category as CategoryType } from 'types/category'
import categories from 'data/categories.json'
import { Section, SectionWideContent } from 'components/base/Section'
import Web from 'components/layout/Web'
import Category from 'components/misc/Category'
import Learning from 'components/misc/Learning'
import MobileAction from 'components/osezchanger/MobileAction'
import OsezChanger from 'components/osezchanger/OsezChanger'

export default function CategoryPage({ category }: { category: CategoryType }) {
  useEffect(() => {
    const challenge = document.getElementById('osez-changer')
    if (challenge) {
      window.scrollTo({
        top: challenge.offsetTop,
        behavior: 'smooth',
      })
    }
  }, [])
  return (
    <Web
      title='Osez changer'
      description='En moyenne, les Français ont trois fois plus de paires de chaussures qu’ils n’en ont besoin... Et vous ? Faites le test avec Impact CO2 et notre simulateur !'
      image='meta/osez-changer.png'
      breadcrumb={{
        type: 'equivalent',
        category: category,
      }}>
      <Section $withoutPadding>
        <Container>
          <MobileAction />
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
  gap: 2.5rem 4rem;
  justify-content: space-between;
  margin-bottom: 2rem;
`
