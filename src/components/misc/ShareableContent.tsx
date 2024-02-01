import React, { ReactNode } from 'react'
import { Category } from 'types/category'
import { TransportSimulateur } from 'types/transport'
import { buildCurrentUrlFor } from 'utils/urls'
import useScreenshot from 'hooks/useScreenshot'
import useParamContext from 'components/providers/ParamProvider'
import OverScreen, { OverScreenInfo } from 'components/base/OverScreen'
import { Section, SectionWideContent } from 'components/base/Section'
import Link from 'components/base/buttons/Link'
import Signature from 'components/screenshot/Signature'
import {
  Container,
  Content,
  ContentHeader,
  IFrameLogos,
  Logos,
  Screenshotable,
  Separator,
  Theme,
} from './ShareableContent.styles'
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
  reverse,
  theme,
  withoutIntegration,
  path,
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
  type?: TransportSimulateur
  path?: string
  size?: 'sm' | 'lg'
  title?: string
  reverse?: boolean
  theme?: 'color'
  withoutIntegration?: boolean
}) => {
  const { theme: darkMode } = useParamContext()
  const { ref, takeScreenshot, isScreenshotting } = useScreenshot(tracking.replace(/ /g, '-').toLowerCase(), tracking)
  return (
    <Section $withoutPadding data-testid={dataTestId}>
      <SectionWideContent $reverse={reverse}>
        {!iframe && (
          <>
            <Header
              withoutIntegration={withoutIntegration}
              category={category}
              params={params}
              takeScreenshot={takeScreenshot}
              tracking={tracking}
              type={type}
              title={title}
              path={path}
            />
            <Separator />
          </>
        )}
        <SectionWideContent $size={size || 'xs'} $noGutter $flex>
          <Content>
            <Theme $theme={theme} className={darkMode === 'night' ? 'night' : ''}>
              <Container $iframe={iframe}>
                {header && <ContentHeader>{header}</ContentHeader>}
                <div ref={ref}>
                  <Screenshotable $theme={theme}>
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
            </Theme>
            {bottom}
          </Content>
          {sideContent}
        </SectionWideContent>
      </SectionWideContent>
    </Section>
  )
}

export default ShareableContent
