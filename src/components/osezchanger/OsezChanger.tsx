import React, { useState } from 'react'
import useScreenshot from 'hooks/useScreenshot'
import Signature from 'components/screenshot/Signature'
import Actions from './Actions'
import Defi from './Defi'
import { Container, DefiButton, Description } from './OsezChanger.styles'
import Share from './Share'

const OsezChanger = () => {
  const [defiMode, setDefiMode] = useState(false)
  const { ref, takeScreenshot, isScreenshotting } = useScreenshot('impactco2_osez_changer', 'png', 'osez_changer')

  return (
    <Container>
      <Description>
        <h2>{defiMode ? 'Challenge chaussures' : '✨ Challengez votre communauté'}</h2>
        En moyenne les français ont trois fois plus de paires de chaussures qu'ils n'en n'ont besoin...
        <br />
        Et vous ?
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
