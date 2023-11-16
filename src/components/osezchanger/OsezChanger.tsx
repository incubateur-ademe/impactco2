import Image from 'next/image'
import React, { useState } from 'react'
import useScreenshot from 'hooks/useScreenshot'
import Signature from 'components/screenshot/Signature'
import Actions from './Actions'
import Defi from './Defi'
import { Container, DefiButton, Description, Title } from './OsezChanger.styles'
import Share from './Share'

const OsezChanger = () => {
  const [defiMode, setDefiMode] = useState(false)
  const { ref, takeScreenshot, isScreenshotting } = useScreenshot('impactco2_osez_changer', 'png', 'osez_changer')

  return (
    <Container $defiMode={defiMode}>
      <Title>{defiMode ? 'Challenge chaussures' : '✨ Challengez votre communauté'}</Title>
      <Image color='var(--primary-40' src='/images/separator.svg' alt='' width={36} height={20} />
      <Description>
        En moyenne, les Français ont trois fois plus de paires de chaussures qu’ils n’en ont besoin... et vous ?
      </Description>
      {defiMode ? (
        <>
          <div ref={ref}>
            <Defi />
            {isScreenshotting && <Signature />}
          </div>
          <Actions />
          <Share takeScreenshot={takeScreenshot} />
        </>
      ) : (
        <DefiButton onClick={() => setDefiMode(true)}>Relever le défi</DefiButton>
      )}
    </Container>
  )
}

export default OsezChanger
