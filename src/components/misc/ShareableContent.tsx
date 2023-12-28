import React, { ReactNode } from 'react'
import { Category } from 'types/category'
import { buildCurrentUrlFor } from 'utils/urls'
import useScreenshot from 'hooks/useScreenshot'
import OverScreen, { OverScreenInfo } from 'components/base/OverScreen'
import { Section, SectionWideContent } from 'components/base/Section'
import Link from 'components/base/buttons/Link'
import Signature from 'components/screenshot/Signature'
import { Container, IFrameLogos, Logos } from './ShareableContent.styles'
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
}: {
  category: Category
  iframe?: boolean
  tracking: string
  ['data-testid']?: string
  params?: Record<string, CustomParamValue>
  overScreen?: OverScreenInfo
  setOverScreen: (overScreen: T | undefined) => void
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  type?: 'distance' | 'itineraire' | 'teletravail'
}) => {
  const { ref, takeScreenshot, isScreenshotting } = useScreenshot(tracking.replaceAll(' ', '-').toLowerCase(), tracking)

  return (
    <Section $withoutPadding data-testid={dataTestId}>
      <SectionWideContent $size='sm'>
        {!iframe && (
          <Header category={category} params={params} takeScreenshot={takeScreenshot} tracking={tracking} type={type} />
        )}
        <SectionWideContent $size='xs' $noGutter>
          <Container $iframe={iframe}>
            {header}
            <div ref={ref}>
              {children}
              {isScreenshotting && (
                <Logos>
                  <Signature />
                </Logos>
              )}
            </div>
            {footer}
            {iframe && (
              <>
                <IFrameLogos>
                  <Signature noMargin noLink center />
                  <Link href={buildCurrentUrlFor(category.slug)}>version complète</Link>
                </IFrameLogos>
                <Actions
                  onClick={(value) => {
                    value === 'telecharger' ? takeScreenshot() : setOverScreen(value as T)
                  }}
                  category={category}
                />
              </>
            )}
            {overScreen && <OverScreen values={overScreen} onClose={() => setOverScreen(undefined)} />}
          </Container>
        </SectionWideContent>
      </SectionWideContent>
    </Section>
  )
}

export default ShareableContent
