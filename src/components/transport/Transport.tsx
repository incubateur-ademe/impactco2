import React, { ReactNode, useContext, useMemo, useState } from 'react'
import { Category } from 'types/category'
import { buildCurrentUrlFor } from 'utils/urls'
import useScreenshot from 'hooks/useScreenshot'
import MagicLink from 'components/base/MagicLink'
import OverScreen from 'components/base/OverScreen'
import { Section, SectionWideContent } from 'components/base/Section'
import Actions from 'components/misc/category/Actions'
import { IFrameLogos } from 'components/misc/category/CategoryWrapper.styles'
import { CustomParamValue } from 'components/misc/category/CustomParam'
import Header from 'components/misc/category/Header'
import { OverScreenTransport } from 'components/misc/category/overScreens/TransportType'
import { overScreenTransportValues } from 'components/misc/category/overScreens/TransportValues'
import Signature from 'components/screenshot/Signature'
import { Container, Screenshot } from './Transport.styles'
import TransportContext from './TransportProvider'

const Transport = ({
  children,
  category,
  tracking,
  iframe,
  type,
}: {
  children: ReactNode
  category: Category
  tracking: string
  iframe?: boolean
  type: 'distance' | 'itineraire' | 'teletravail'
}) => {
  const { km, start, end } = useContext<{
    km: number
    start: {
      latitude: number
      longitude: number
      city: string
      address: string
    }
    end: {
      latitude: number
      longitude: number
      city: string
      address: string
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: TODO
  }>(TransportContext)
  const { ref, takeScreenshot, isScreenshotting } = useScreenshot(tracking.replaceAll(' ', '-').toLowerCase(), tracking)

  const params = useMemo(() => {
    switch (type) {
      case 'distance':
        return { km: km.toString() } as Record<string, CustomParamValue>
      case 'itineraire':
        return {
          itineraire: {
            start: start.address,
            end: end.address,
          },
        } as Record<string, CustomParamValue>
      case 'teletravail':
        return {
          teletravail: {
            start: start.address,
            end: end.address,
          },
        } as Record<string, CustomParamValue>
    }
  }, [km, type, start, end])

  const [overScreen, setOverScreen] = useState<OverScreenTransport | undefined>()
  const overScreenValues = useMemo(
    () => overScreenTransportValues(category, params, tracking, type),
    [category, params, tracking, type]
  )

  return (
    <Section $withoutPadding data-testid={`${type}-wrapper`}>
      <SectionWideContent $size='sm'>
        {!iframe && (
          <Header category={category} params={params} takeScreenshot={takeScreenshot} tracking={tracking} type={type} />
        )}
        <SectionWideContent $size='xs' $noGutter>
          <Container $iframe={iframe}>
            <Screenshot ref={ref}>
              {children}
              {isScreenshotting && <Signature />}
            </Screenshot>
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
            {overScreen && (
              <OverScreen values={overScreenValues[overScreen]} onClose={() => setOverScreen(undefined)} />
            )}
          </Container>
        </SectionWideContent>
      </SectionWideContent>
    </Section>
  )
}

export default Transport
