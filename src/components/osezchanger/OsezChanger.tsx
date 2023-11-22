import Image from 'next/image'
import React, { useState } from 'react'
import useScreenshot from 'hooks/useScreenshot'
import Signature from 'components/screenshot/Signature'
import Actions from './Actions'
import Defi from './Defi'
import { BottomLogos, Container, DefiButton, Description, Logos, Screenshot, Title } from './OsezChanger.styles'
import Resources from './Resources'
import Modal, { ModalType } from './modals/Modal'

const OsezChanger = ({ iframe }: { iframe?: boolean }) => {
  const [defiMode, setDefiMode] = useState(iframe || false)
  const [modal, setModal] = useState<ModalType | undefined>()
  const { ref, takeScreenshot, isScreenshotting } = useScreenshot('impactco2_osez_changer', 'png', 'osez_changer')

  return (
    <Container $defiMode={defiMode} id='osez-changer'>
      <Title>{defiMode ? 'Challenge chaussures' : '✨ Challengez votre communauté'}</Title>
      <Image color='var(--primary-40' src='/images/separator.svg' alt='' width={36} height={20} />
      <Description>
        En moyenne, les Français ont trois fois plus de paires de chaussures qu’ils n’en ont besoin... et vous ?
      </Description>
      {defiMode ? (
        <>
          <Screenshot ref={ref} data-testid='defi' $isScreenshotting={isScreenshotting}>
            <Defi setModal={setModal} />
            {isScreenshotting && (
              <Logos>
                <Signature noMargin />
              </Logos>
            )}
          </Screenshot>
          <Resources />
          {iframe && (
            <BottomLogos>
              <Signature noMargin noLink />
            </BottomLogos>
          )}
          <Actions takeScreenshot={takeScreenshot} setModal={setModal} />
          {modal && <Modal type={modal} onClose={() => setModal(undefined)} />}
        </>
      ) : (
        <DefiButton
          onClick={() => {
            window?.please?.track(['trackEvent', 'OsezChanger', 'Start', 'osez_changer_start'])
            setDefiMode(true)
          }}>
          Relever le défi
        </DefiButton>
      )}
    </Container>
  )
}

export default OsezChanger
