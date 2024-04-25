'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import React, { ReactNode, useState } from 'react'
import useScreenshot from 'hooks/useScreenshot'
import useParamContext from 'components/providers/ParamProvider'
import TranslationProvider from 'components/providers/TranslationProvider'
import GhostButton from 'components/base/GhostButton'
import Logos from 'components/base/Logo/Logos'
import CloseIcon from 'components/osezchanger/icons/close'
import { OverScreenInfo } from '../category/overScreens/Values'
import Actions from './Actions'
import Feature from './Feature'
import styles from './Shareable.module.css'

type ShareableProps = {
  children: ReactNode
  tracking: string
  withoutIntegration?: boolean
  withoutShare?: boolean
  overScreens: Record<string, OverScreenInfo>
  secondary?: boolean
}
const Shareable = ({
  children,
  tracking,
  withoutIntegration,
  withoutShare,
  overScreens,
  secondary,
}: ShareableProps) => {
  const t = useTranslations('overscreen')
  const { theme } = useParamContext()
  const [overScreen, setOverScreen] = useState<OverScreenInfo | undefined>()
  const onClose = () => setOverScreen(undefined)
  const { ref, takeScreenshot } = useScreenshot(tracking.replace(/ /g, '-').toLowerCase(), tracking)

  return (
    <div
      className={classNames(styles.card, { [styles.secondaryCard]: secondary, night: theme === 'night' })}
      ref={secondary ? undefined : ref}>
      {overScreen && (
        <>
          <div className={styles.filler} />
          <div className={styles.overScreen}>
            {overScreen.title && (
              <div>
                <div className={styles.header}>
                  <b className='text-lg'>{t(overScreen.title)}</b>
                  <GhostButton icon={<CloseIcon />} iconPosition='right' onClick={onClose}>
                    Fermer
                  </GhostButton>
                </div>
                <div className={styles.separatorBothBorders} />
              </div>
            )}
            <div className={styles.overScreenChildren}>{overScreen.children}</div>
            <div>
              <div className={styles.separatorBothBorders} />
              <div className={styles.footer}>
                <GhostButton icon={<CloseIcon />} iconPosition='right' onClick={onClose}>
                  Annuler
                </GhostButton>
              </div>
            </div>
          </div>
        </>
      )}
      <div className={secondary ? styles.secondaryContainer : ''}>
        <div ref={secondary ? ref : undefined} className={secondary ? styles.secondaryContent : ''}>
          {children}
        </div>
      </div>
      {!secondary && (
        <>
          {'hypothesis' in overScreens || 'data' in overScreens ? (
            <div className={styles.ressources}>
              {'data' in overScreens && <Feature info={overScreens.data} setOverScreen={setOverScreen} />}
              {'hypothesis' in overScreens && <Feature info={overScreens.hypothesis} setOverScreen={setOverScreen} />}
            </div>
          ) : (
            <div className={styles.separator} />
          )}
          <div className={styles.logos}>
            <Logos small />
          </div>
        </>
      )}
      <div className={classNames(styles.actions, { [styles.secondaryActions]: secondary })}>
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
  )
}

const ShareableWithTranslation = (props: ShareableProps) => (
  <TranslationProvider>
    <Shareable {...props} />
  </TranslationProvider>
)

export default ShareableWithTranslation
