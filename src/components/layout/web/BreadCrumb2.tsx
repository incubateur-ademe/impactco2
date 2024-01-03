import React from 'react'
import styled from 'styled-components'
import { Category } from 'types/category'
import { Equivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import { Section, SectionWideContent } from 'components/base/Section'
import Link from 'components/base/buttons/Link'
import { Icon } from 'components/osezchanger/icons'

const Wrapper = styled.div<{ $noMargin?: boolean }>`
  align-items: center;
  display: flex;
  font-size: 0.875rem;
  font-weight: 400;
  gap: 0.125rem;
  justify-content: center;
  line-height: 1.25rem;
  ${({ $noMargin }) => !$noMargin && 'margin: 3.75rem auto 1.5rem auto;'}

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
  | {
      type: 'other'
      previous: { to: string; label: string }
      current: string
    }

export default function BreadCrumb2({ breadcrumb, noMargin }: { breadcrumb: BreadcrumbProps; noMargin?: boolean }) {
  return breadcrumb ? (
    <Section $withoutPadding>
      <SectionWideContent>
        <nav aria-label="fil d'ariane">
          <Wrapper $noMargin={noMargin}>
            {breadcrumb && breadcrumb.type === 'equivalent' && (
              <>
                <Link href='/'>Accueil</Link>
                <Icon iconId='dropdown-arrow-right' />
                <Link href='/thematiques'>Thématiques</Link>
                <Icon iconId='dropdown-arrow-right' />
                {breadcrumb.equivalent ? (
                  <>
                    <Link href={`/${breadcrumb.category.slug}`}>{breadcrumb.category.name}</Link>
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
                <Link href='/'>Page d’accueil</Link>
                <Icon iconId='dropdown-arrow-right' /> {breadcrumb.page}
              </>
            )}
            {breadcrumb && breadcrumb.type === 'other' && (
              <>
                <Link href='/'>Page d’accueil</Link>
                <Icon iconId='dropdown-arrow-right' />
                <Link href={breadcrumb.previous.to}>{breadcrumb.previous.label}</Link>
                <Icon iconId='dropdown-arrow-right' />
                {breadcrumb.current}
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
