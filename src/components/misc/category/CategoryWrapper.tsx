import React, { ForwardedRef, ReactNode, forwardRef, useMemo, useState } from 'react'
import { Category } from 'types/category'
import { track } from 'utils/matomo'
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
    params,
    takeScreenshot,
  }: {
    category: Category
    children: ReactNode
    isScreenshotting: boolean
    iframe?: boolean
    params: Record<string, string>
    takeScreenshot: () => void
  },
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [overScreen, setOverScreen] = useState<OverScreenCategory | undefined>()
  const overScreenValues = useMemo(() => overScreenCategoryValues(category, params), [category, params])

  return (
    <Container $iframe={iframe}>
      <h3>Découvrir l'impact {category.header} sur le climat</h3>
      {category.sources && (
        <Sources>
          Source{category.sources.length > 1 ? 's' : ''} :{' '}
          {category.sources
            .flatMap((source) => [
              <MagicLink
                key={source.label}
                to={source.href}
                color='blue'
                onClick={() => track(category.name, 'Source', source.href)}>
                {source.label}
              </MagicLink>,
              <span key={`${source.label}-separator`}> • </span>,
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
          tracking={category.name}
          title='Comprendre les données'
          image='/images/data.png'
          small
          color='blue'
          onClick={() => setOverScreen('data')}
        />
        <Card
          tracking={category.name}
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
          <Actions
            onClick={(value) => {
              value === 'telecharger' ? takeScreenshot() : setOverScreen(value)
            }}
            category={category}
          />
        </>
      )}
      {overScreen && <OverScreen values={overScreenValues[overScreen]} onClose={() => setOverScreen(undefined)} />}
    </Container>
  )
}

export default forwardRef(CategoryWrapper)
