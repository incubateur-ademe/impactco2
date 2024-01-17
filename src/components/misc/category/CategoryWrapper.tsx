import React, { ReactNode, useMemo, useState } from 'react'
import { Category } from 'types/category'
import { track } from 'utils/matomo'
import Card from 'components/base/Card'
import { Section, SectionWideContent } from 'components/base/Section'
import Link from 'components/base/buttons/Link'
import OsezChanger from 'components/osezchanger/OsezChanger'
import Learning from '../Learning'
import ShareableContent from '../ShareableContent'
import SourceAgribalyse from '../SourceAgribalyse'
import { Cards, Header, Sources } from './CategoryWrapper.styles'
import { CustomParamValue } from './CustomParam'
import { OverScreenCategory } from './overScreens/Type'
import { overScreenCategoryValues } from './overScreens/Values'

const CategoryWrapper = ({
  category,
  children,
  iframe,
  params,
  withFooter,
}: {
  category: Category
  children: ReactNode
  iframe?: boolean
  params?: Record<string, CustomParamValue>
  withFooter?: boolean
}) => {
  const [overScreen, setOverScreen] = useState<OverScreenCategory | undefined>()
  const overScreenValues = useMemo(() => overScreenCategoryValues(category, params), [category, params])

  return (
    <>
      <ShareableContent<OverScreenCategory>
        category={category}
        iframe={iframe}
        params={params}
        tracking={category.name}
        size={category.slug === 'habillement' ? 'lg' : undefined}
        setOverScreen={setOverScreen}
        overScreen={overScreen ? overScreenValues[overScreen] : undefined}
        header={iframe && <Header className='title-h3'>Découvrir l'impact {category.header} sur le climat</Header>}
        footer={
          withFooter ? (
            <Cards>
              <Card
                tracking={category.name}
                title='Comprendre les données'
                image='/images/magnifying-glass.png'
                small
                color='secondary'
                onClick={() => setOverScreen('data')}
              />
              <Card
                tracking={category.name}
                title='Aller plus loin'
                image='/images/bulb.png'
                small
                onClick={() => setOverScreen('hypothesis')}
              />
            </Cards>
          ) : null
        }
        sideContent={!iframe && category.slug === 'habillement' && <OsezChanger />}
        bottom={
          !iframe && (
            <>
              <Section $withoutPadding $size='sm'>
                <SectionWideContent $size='xs' $noGutter>
                  {category.sources && (
                    <Sources>
                      Source{category.sources.length > 1 ? 's' : ''} :{' '}
                      {category.sources
                        .flatMap((source) => [
                          <Link
                            key={source.label}
                            href={source.href}
                            priority='secondary'
                            onClick={() => track(category.name, 'Source', source.href)}>
                            {source.label}
                          </Link>,
                          <span key={`${source.label}-separator`}> • </span>,
                        ])
                        .slice(0, category.sources.length * 2 - 1)}
                    </Sources>
                  )}
                  {category.slug === 'boisson' && <SourceAgribalyse tracking={category.name} />}
                  <Learning category={category} />
                </SectionWideContent>
              </Section>
            </>
          )
        }>
        {children}
      </ShareableContent>
    </>
  )
}

export default CategoryWrapper
