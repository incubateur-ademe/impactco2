import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Category as CategoryType } from 'types/category'
import categories from 'data/categories.json'
import { Section, SectionWideContent } from 'components/base/Section'
import SuggestionBanner from 'components/contact/SuggestionBanner'
import Web from 'components/layout/Web'
import Category from 'components/misc/Category'

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
      description='En moyenne, les Français n’utilisent qu’un tiers des chaussures qu’ils possèdent. Et si on les aidait à désencombrer les placards ? Découvrez le nouveau challenge d’Impact CO2 !'
      image='meta/osez-changer.png'
      breadcrumb={{
        type: 'equivalent',
        category: category,
      }}>
      <Section $withoutPadding>
        <Container>
          <Category category={category} />
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
