import React, { ForwardedRef, ReactNode, forwardRef } from 'react'
import { Category } from 'types/category'
import { buildCurrentUrlFor } from 'utils/urls'
import Card from 'components/base/Card'
import MagicLink from 'components/base/MagicLink'
import Signature from 'components/screenshot/Signature'
import Actions from './Actions'
import { Cards, Container, Content, IFrameLogos, Logos, Screenshot, Sources } from './CategoryWrapper.styles'

const CategoryWrapper = (
  {
    category,
    children,
    isScreenshotting,
    iframe,
  }: {
    category: Category
    children: ReactNode
    isScreenshotting: boolean
    iframe?: boolean
  },
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <Container $iframe={iframe}>
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
      <Cards>
        <Card title='Comprendre les données' image='/images/data.png' small color='blue' />
        <Card title='Aller plus loin' image='/images/hypothesis.png' small />
      </Cards>
      {iframe && (
        <>
          <IFrameLogos>
            <Signature noMargin noLink center />
            <MagicLink to={buildCurrentUrlFor(category.slug)}>version complète</MagicLink>
          </IFrameLogos>
          <Actions onClick={console.log} category={category} />
        </>
      )}
    </Container>
  )
}

export default forwardRef(CategoryWrapper)
