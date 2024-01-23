import Image from 'next/image'
import React, { useState } from 'react'
import { track } from 'utils/matomo'
import useScreenshot from 'hooks/useScreenshot'
import Signature from 'components/screenshot/Signature'
import OverScreen from '../base/OverScreen'
import Actions from './Actions'
import Defi from './Defi'
import { BottomLogos, Container, DefiButton, Description, Logos, Screenshot, Title } from './OsezChanger.styles'
import Resources from './Resources'
import { OverScreenOsezChanger } from './overScreens/Type'
import { overScreenOsezChangerValues } from './overScreens/Values'

const OsezChanger = ({ iframe }: { iframe?: boolean }) => {
  const [defiMode, setDefiMode] = useState(iframe || false)
  const [overScreen, setOverScreen] = useState<OverScreenOsezChanger | undefined>()
  const { ref, takeScreenshot, isScreenshotting } = useScreenshot('impactco2_osez_changer', 'OsezChanger')

  return (
    <Container $defiMode={defiMode} id='osez-changer'>
      <Title>{defiMode ? 'Comptez vos chaussures !' : '✨ Challengez votre communauté'}</Title>
      <Image color='var(--primary-40' src='/images/separator.svg' alt='' width={36} height={20} />
      <Description>
        {defiMode
          ? 'En moyenne, les Français n’utilisent qu’un tiers des chaussures qu’ils possèdent. Et si on désencombrait les placards ?'
          : 'En moyenne, les Français n’utilisent qu’un tiers des chaussures qu’ils possèdent. Et si on les aidait à désencombrer les placards ?'}
      </Description>
      {defiMode ? (
        <>
          <div ref={ref}>
            <Screenshot data-testid='defi' $isScreenshotting={isScreenshotting}>
              <Defi setOverScreen={setOverScreen} />
              {isScreenshotting && (
                <Logos>
                  <Signature noMargin />
                </Logos>
              )}
            </Screenshot>
          </div>
          <Resources />
          {iframe && (
            <BottomLogos>
              <Signature noMargin noLink />
            </BottomLogos>
          )}
          <Actions takeScreenshot={takeScreenshot} setOverScreen={setOverScreen} />
          {overScreen && (
            <OverScreen
              color='secondary'
              values={overScreenOsezChangerValues[overScreen]}
              onClose={() => setOverScreen(undefined)}
            />
          )}
        </>
      ) : (
        <DefiButton
          data-testid='osez-changer-start-button'
          onClick={() => {
            track('OsezChanger', 'Start', 'osez_changer_start')
            setDefiMode(true)
          }}>
          Découvrir le défi
        </DefiButton>
      )}
    </Container>
  )
}

export default OsezChanger
