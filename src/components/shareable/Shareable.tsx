'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import React, { Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import TranslationProvider from 'src/providers/TranslationProvider'
import useScreenshot from 'hooks/useScreenshot'
import GhostButton from 'components/base/GhostButton'
import Logos from 'components/base/Logo/Logos'
import CloseIcon from 'components/base/icons/close'
import Actions from './Actions'
import Feature from './Feature'
import styles from './Shareable.module.css'
import { OverScreenInfo } from './overScreens/Values'

type ShareableProps = {
  children: ReactNode
  tracking: string
  withoutIntegration?: boolean
  withoutShare?: boolean
  overScreens?: Record<string, OverScreenInfo>
  secondary?: string
  overScreen?: OverScreenInfo | undefined
  setOverScreen?: Dispatch<SetStateAction<string | undefined>>
  noBottomBorders?: boolean
  small?: boolean
}
const Shareable = ({
  children,
  tracking,
  withoutIntegration,
  withoutShare,
  overScreens,
  secondary,
  overScreen,
  setOverScreen,
  noBottomBorders,
  small,
}: ShareableProps) => {
  const t = useTranslations('overscreen')
  const { theme } = useParamContext()
  const [overScreenInternal, setOverScreenInternal] = useState<OverScreenInfo | undefined>()
  const onClose = () => (setOverScreen ? setOverScreen(undefined) : setOverScreenInternal(undefined))
  const { ref, takeScreenshot } = useScreenshot(tracking.replace(/ /g, '-').toLowerCase(), tracking)

  const overScreenToDisplay = useMemo(() => {
    if (overScreens) {
      return overScreenInternal
    }
    return overScreen
  }, [overScreens, overScreenInternal, overScreen])

  return (
    <div
      className={classNames(styles.card, {
        [styles.secondaryCard]: secondary !== undefined,
        night: theme === 'night',
        [styles.smallCard]: small,
      })}
      ref={secondary !== undefined ? undefined : ref}>
      {overScreenToDisplay && (
        <>
          <div className={classNames(styles.filler, { [styles.noBorder]: secondary !== undefined })} />
          <div className={classNames(styles.overScreen, { [styles.fullHeight]: overScreenToDisplay.fullWidth })}>
            {overScreenToDisplay.title && (
              <div>
                <div className={styles.header}>
                  <b className='text-lg'>{t(overScreenToDisplay.title)}</b>
                  <GhostButton icon={<CloseIcon />} iconPosition='right' onClick={onClose}>
                    Fermer
                  </GhostButton>
                </div>
                <div className={styles.separatorBothBorders} />
              </div>
            )}
            <div className={classNames(styles.overScreenChildren, { [styles.noScroll]: !overScreenToDisplay.title })}>
              {overScreenToDisplay.children}
            </div>
            {overScreenToDisplay.title && (
              <div>
                <div className={styles.separatorBothBorders} />
                <div className={styles.footer}>
                  <GhostButton icon={<CloseIcon />} iconPosition='right' onClick={onClose}>
                    Annuler
                  </GhostButton>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      <div className={secondary !== undefined ? styles.secondaryContainer : ''}>
        <div
          ref={secondary !== undefined ? ref : undefined}
          className={secondary !== undefined ? styles.secondaryContent : ''}>
          {children}
        </div>
        {secondary && <div className={styles.secondaryText}>{secondary}</div>}
      </div>
      {secondary === undefined && (
        <>
          {overScreens && ('hypothesis' in overScreens || 'data' in overScreens) ? (
            <div className={styles.ressources}>
              {'data' in overScreens && <Feature info={overScreens.data} setOverScreen={setOverScreenInternal} />}
              {'hypothesis' in overScreens && (
                <Feature info={overScreens.hypothesis} setOverScreen={setOverScreenInternal} />
              )}
            </div>
          ) : (
            !noBottomBorders && <div className={styles.separator} />
          )}
          <div className={styles.logos}>
            <Logos small />
          </div>
        </>
      )}
      <div className={classNames(styles.actions, { [styles.secondaryActions]: secondary !== undefined })}>
        <Actions
          onClick={(action) => {
            if (action === 'telecharger') {
              takeScreenshot()
            } else {
              if (overScreens) {
                setOverScreenInternal(overScreens[action])
              } else if (setOverScreen) {
                setOverScreen(action)
              }
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
