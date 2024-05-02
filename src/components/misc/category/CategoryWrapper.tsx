import React, { ReactNode, useMemo, useState } from 'react'
import { Category } from 'types/category'
import Card from 'components/base/Card'
import { Section, SectionWideContent } from 'components/base/Section'
import OsezChanger from 'components/osezchanger/OsezChanger'
import Learning from '../Learning'
import ShareableContent from '../ShareableContent'
import SourceAgribalyse from '../SourceAgribalyse'
import { CustomParamValue } from '../shareable/overScreens/CustomParam'
import { overScreenCategoryValues } from '../shareable/overScreens/Values'
import { Cards, Header, SourcesWrapper } from './CategoryWrapper.styles'
import Sources from './Sources'

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
  const [overScreen, setOverScreen] = useState<string | undefined>()
  const overScreenValues = useMemo(() => overScreenCategoryValues(category), [category, params])

  return (
    <>
      <ShareableContent<string>
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
                trackingCategory={category.name}
                trackingAction='Ressources simulateur'
                title='Comprendre les données'
                image='/images/magnifying-glass.png'
                small
                color='secondary'
                onClick={() => setOverScreen('data')}
              />
              <Card
                trackingCategory={category.name}
                trackingAction='Ressources simulateur'
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
                    <SourcesWrapper>
                      <Sources priority='secondary' sources={category.sources} tracking={category.name} />
                    </SourcesWrapper>
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
