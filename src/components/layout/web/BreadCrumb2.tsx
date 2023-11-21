import React from 'react'
import styled from 'styled-components'
import { Category } from 'types/category'
import { Equivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import MagicLink from 'components/base/MagicLink'
import { Section, SectionWideContent } from 'components/base/Section'

const Wrapper = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  height: 3.05rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  padding: 1rem 1rem 1rem 0;
`

export type BreadcrumbProps =
  | {
      type: 'equivalent'
      category: Category
      equivalent?: Equivalent
    }
  | {
      type: 'accueil'
      page: string
    }

export default function BreadCrumb2({ breadcrumb }: { breadcrumb: BreadcrumbProps }) {
  return breadcrumb ? (
    <Section $withoutPadding>
      <SectionWideContent>
        <nav aria-label="fil d'ariane">
          <Wrapper>
            {breadcrumb && breadcrumb.type === 'equivalent' && (
              <>
                <MagicLink to='/thematiques'>Thématiques</MagicLink>
                {' > '}{' '}
                {breadcrumb.equivalent ? (
                  <>
                    <MagicLink to={`/${breadcrumb.category.slug}`}>{breadcrumb.category.name}</MagicLink>
                    {' > '}
                    {formatName(breadcrumb.equivalent.name, 1, true)}
                  </>
                ) : (
                  breadcrumb.category.name
                )}
              </>
            )}
            {breadcrumb && breadcrumb.type === 'accueil' && (
              <>
                <MagicLink to='/'>Page d’accueil</MagicLink>
                {' > '} {breadcrumb.page}
              </>
            )}
          </Wrapper>
        </nav>
      </SectionWideContent>
    </Section>
  ) : (
    <></>
  )
}
