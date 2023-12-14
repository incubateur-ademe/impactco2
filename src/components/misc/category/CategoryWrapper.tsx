import React, { ForwardedRef, ReactNode, forwardRef, useState } from 'react'
import { Category } from 'types/category'
import { buildCurrentUrlFor } from 'utils/urls'
import Card from 'components/base/Card'
import MagicLink from 'components/base/MagicLink'
import OverScreen from 'components/base/OverScreen'
import Signature from 'components/screenshot/Signature'
import Actions from './Actions'
import { Cards, Container, Content, IFrameLogos, Logos, Screenshot, Sources } from './CategoryWrapper.styles'
import { OverScreenCategory } from './overScreens/Type'
import { overScreenCategoryValues } from './overScreens/Values'

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
  const [overScreen, setOverScreen] = useState<OverScreenCategory | undefined>()
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
        <Card
          title='Comprendre les données'
          image='/images/data.png'
          small
          color='blue'
          onClick={() => setOverScreen('data')}
        />
        <Card
          title='Aller plus loin'
          image='/images/hypothesis.png'
          small
          onClick={() => setOverScreen('hypothesis')}
        />
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
      {overScreen && (
        <OverScreen values={overScreenCategoryValues[overScreen]} onClose={() => setOverScreen(undefined)} />
      )}
    </Container>
  )
}

export default forwardRef(CategoryWrapper)
