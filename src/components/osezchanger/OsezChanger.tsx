import Image from 'next/image'
import React, { useState } from 'react'
import { track } from 'utils/matomo'
import useScreenshot from 'hooks/useScreenshot'
import { BottomLogos, Container, DefiButton, Description, Logos, Screenshot, Title } from './OsezChanger.styles'
import Resources from './Resources'

const OsezChanger = ({ iframe }: { iframe?: boolean }) => {
  const [defiMode, setDefiMode] = useState(iframe || false)
  const { ref, isScreenshotting } = useScreenshot('impactco2_osez_changer', 'OsezChanger')

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
              {isScreenshotting && <Logos />}
            </Screenshot>
          </div>
          <Resources />
          {iframe && <BottomLogos />}
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
