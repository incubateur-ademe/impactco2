import React, { ForwardedRef, ReactNode, forwardRef } from 'react'
import { Category } from 'types/category'
import MagicLink from 'components/base/MagicLink'
import Signature from 'components/screenshot/Signature'
import { Container, Content, Logos, Screenshot, Sources } from './CategoryWrapper.styles'

const CategoryWrapper = (
  {
    category,
    children,
    isScreenshotting,
  }: {
    category: Category
    children: ReactNode
    isScreenshotting: boolean
  },
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <Container>
      <h3>Découvrer l'impact {category.header} sur le climat</h3>
      {category.sources && (
        <Sources>
          Source{category.sources.length > 1 ? 's' : ''} :{' '}
          {category.sources
            .flatMap((source) => [
              <MagicLink key={source.label} to={source.href} color='blue'>
                {source.label}
              </MagicLink>,
              <> • </>,
            ])
            .slice(0, category.sources.length * 2 - 1)}
        </Sources>
      )}
      <Screenshot ref={ref}>
        <Content>{children}</Content>
        {isScreenshotting && (
          <Logos>
            <Signature noMargin />
          </Logos>
        )}
      </Screenshot>
    </Container>
  )
}

export default forwardRef(CategoryWrapper)
