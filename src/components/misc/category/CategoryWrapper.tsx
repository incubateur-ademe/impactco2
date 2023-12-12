import React, { ReactNode } from 'react'
import { Category } from 'types/category'
import MagicLink from 'components/base/MagicLink'
import { Container, Content, Sources } from './CategoryWrapper.styles'

const CategoryWrapper = ({ category, children }: { category: Category; children: ReactNode }) => {
  return (
    <Container>
      <h3>Découvrer l'impact {category.header} sur le climat</h3>
      {category.sources && (
        <Sources>
          Source{category.sources.length > 1 ? 's' : ''} :{' '}
          {category.sources
            .flatMap((source) => [
              <MagicLink key={source.label} to={source.href}>
                {source.label}
              </MagicLink>,
              <> • </>,
            ])
            .slice(0, category.sources.length * 2 - 1)}
        </Sources>
      )}
      <Content>{children}</Content>
    </Container>
  )
}

export default CategoryWrapper
