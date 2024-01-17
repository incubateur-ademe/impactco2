import React, { ReactNode } from 'react'
import { Category } from 'types/category'
import { buildCurrentUrlFor } from 'utils/urls'
import useScreenshot from 'hooks/useScreenshot'
import OverScreen, { OverScreenInfo } from 'components/base/OverScreen'
import { Section, SectionWideContent } from 'components/base/Section'
import Link from 'components/base/buttons/Link'
import useTheme from 'components/layout/Theme'
import Signature from 'components/screenshot/Signature'
import { Container, Content, ContentHeader, IFrameLogos, Logos, Screenshotable } from './ShareableContent.styles'
import Actions from './category/Actions'
import { CustomParamValue } from './category/CustomParam'
import Header from './category/Header'

const ShareableContent = <T extends string>({
  category,
  iframe,
  tracking,
  'data-testid': dataTestId,
  params,
  overScreen,
  setOverScreen,
  children,
  header,
  footer,
  type,
  size,
  title,
  sideContent,
  bottom,
}: {
  category?: Category
  iframe?: boolean
  tracking: string
  ['data-testid']?: string
  params?: Record<string, CustomParamValue>
  overScreen?: OverScreenInfo
  setOverScreen: (overScreen: T | undefined) => void
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  sideContent?: ReactNode
  bottom?: ReactNode
  type?: 'distance' | 'itineraire' | 'teletravail'
  size?: 'sm' | 'lg'
  title?: string
}) => {
  const { ref, takeScreenshot, isScreenshotting } = useScreenshot(tracking.replace(/ /g, '-').toLowerCase(), tracking)
  const { theme } = useTheme()
  return (
    <Section $withoutPadding data-testid={dataTestId}>
      {!iframe && (
        <Header
          category={category}
          params={params}
          takeScreenshot={takeScreenshot}
          tracking={tracking}
          type={type}
          title={title}
        />
      )}
      <SectionWideContent $size={size || 'xs'} $noGutter $flex>
        <Content>
          <Container $iframe={iframe}>
            {header && <ContentHeader>{header}</ContentHeader>}
            <div ref={ref}>
              <Screenshotable $darkMode={theme === 'night'}>
                {children}
                {isScreenshotting && (
                  <Logos>
                    <Signature />
                  </Logos>
                )}
              </Screenshotable>
            </div>
            {footer}
            {iframe && (
              <>
                <IFrameLogos>
                  <Signature noMargin noLink center />
                  <Link href={buildCurrentUrlFor(category ? category.slug : '/comparateur')}>version complète</Link>
                </IFrameLogos>
                <Actions
                  onClick={(value) => {
                    value === 'telecharger' ? takeScreenshot() : setOverScreen(value as T)
                  }}
                  tracking={tracking}
                />
              </>
            )}
            {overScreen && <OverScreen values={overScreen} onClose={() => setOverScreen(undefined)} />}
          </Container>
          {bottom}
        </Content>
        {sideContent}
      </SectionWideContent>
    </Section>
  )
}

export default ShareableContent
