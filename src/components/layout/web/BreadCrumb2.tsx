import React from 'react'
import styled from 'styled-components'
import { Category } from 'types/category'
import { Equivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import MagicLink from 'components/base/MagicLink'
import { Section, SectionWideContent } from 'components/base/Section'
import { Icon } from 'components/osezchanger/icons'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  font-size: 0.875rem;
  font-weight: 400;
  gap: 0.125rem;
  justify-content: center;
  line-height: 1.25rem;
  margin: 1.5rem auto;

  a {
    font-weight: 500;
  }
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
                <MagicLink to='/'>Accueil</MagicLink>
                <Icon iconId='dropdown-arrow-right' />
                <MagicLink to='/thematiques'>Thématiques</MagicLink>
                <Icon iconId='dropdown-arrow-right' />
                {breadcrumb.equivalent ? (
                  <>
                    <MagicLink to={`/${breadcrumb.category.slug}`}>{breadcrumb.category.name}</MagicLink>
                    <Icon iconId='dropdown-arrow-right' />
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
                <Icon iconId='dropdown-arrow-right' /> {breadcrumb.page}
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
