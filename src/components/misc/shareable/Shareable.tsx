'use client'

import React, { ReactNode, useState } from 'react'
import useScreenshot from 'hooks/useScreenshot'
import TranslationProvider from 'components/providers/TranslationProvider'
import GhostButton from 'components/base/GhostButton'
import Logos from 'components/base/Logo/Logos'
import { OverScreenInfo } from 'components/base/OverScreen'
import Actions from './Actions'
import styles from './Shareable.module.css'

const Shareable = ({
  children,
  tracking,
  withoutIntegration,
  withoutShare,
  overScreens,
}: {
  children: ReactNode
  tracking: string
  withoutIntegration?: boolean
  withoutShare?: boolean
  overScreens: Record<'partager' | 'integrer', OverScreenInfo>
}) => {
  const [overScreen, setOverScreen] = useState<OverScreenInfo | undefined>()
  const onClose = () => setOverScreen(undefined)
  const { ref, takeScreenshot } = useScreenshot(tracking.replace(/ /g, '-').toLowerCase(), tracking)

  return (
    <TranslationProvider>
      <div className={styles.card} ref={ref}>
        {overScreen && (
          <>
            <div className={styles.filler} />
            <div className={styles.overScreen}>
              {overScreen.title && (
                <div className={styles.header}>
                  <b className='text-lg'>{overScreen.title}</b>
                  <GhostButton icon='close' iconPosition='right' onClick={onClose}>
                    Fermer
                  </GhostButton>
                </div>
              )}
              <div className={styles.overScreenChildren}>{overScreen.children}</div>
              <div className={styles.footer}>
                <GhostButton icon='close' iconPosition='right' onClick={onClose}>
                  Annuler
                </GhostButton>
              </div>
            </div>
          </>
        )}
        <div>{children}</div>
        <div className={styles.separator} />
        <div className={styles.logos}>
          <Logos small />
        </div>
        <div className={styles.actions}>
          <Actions
            onClick={(action) => {
              if (action === 'telecharger') {
                takeScreenshot()
              } else {
                setOverScreen(overScreens[action])
              }
            }}
            tracking={tracking}
            withoutIntegration={withoutIntegration}
            withoutShare={withoutShare}
          />
        </div>
      </div>
    </TranslationProvider>
  )
}

export default Shareable
