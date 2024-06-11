'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import React, { Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  const overscreenRef = useRef<HTMLDialogElement>(null)
  const t = useTranslations('overscreen')
  const { theme } = useParamContext()
  const [overScreenInternal, setOverScreenInternal] = useState<OverScreenInfo | undefined>()
  const { ref, takeScreenshot } = useScreenshot(tracking.replace(/ /g, '-').toLowerCase(), tracking)

  const onClose = useCallback(
    () => (setOverScreen ? setOverScreen(undefined) : setOverScreenInternal(undefined)),
    [setOverScreen]
  )

  const overScreenToDisplay = useMemo(() => {
    if (overScreens) {
      return overScreenInternal
    }
    return overScreen
  }, [overScreens, overScreenInternal, overScreen])

  useEffect(() => {
    if (overScreenToDisplay && overscreenRef.current) {
      const modalElement = overscreenRef.current
      modalElement.focus()

      //add any focusable HTML element you want to include to this string
      const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      const handleTabKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault()
            // @ts-expect-error: Focusable
            lastElement.focus()
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault()
            // @ts-expect-error: Focusable
            firstElement.focus()
          }
        } else if (event.key === 'Escape') {
          onClose()
        }
      }

      modalElement.addEventListener('keydown', handleTabKeyPress)
      return () => modalElement.removeEventListener('keydown', handleTabKeyPress)
    }
  }, [overscreenRef, overScreenToDisplay, onClose])

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
          <dialog
            ref={overscreenRef}
            tabIndex={-1}
            aria-modal
            aria-label={t(overScreenToDisplay.title)}
            className={classNames(styles.overScreen, { [styles.fullHeight]: overScreenToDisplay.fullHeight })}>
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
                  <GhostButton icon={<CloseIcon />} iconPosition='right' onClick={onClose} data-testid='cancel-button'>
                    Annuler
                  </GhostButton>
                </div>
              </div>
            )}
          </dialog>
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
              {'data' in overScreens && (
                <Feature
                  tracking={tracking}
                  name='Comprendre les données'
                  info={overScreens.data}
                  setOverScreen={setOverScreenInternal}
                />
              )}
              {'hypothesis' in overScreens && (
                <Feature
                  info={overScreens.hypothesis}
                  name='Aller plus loin'
                  tracking={tracking}
                  setOverScreen={setOverScreenInternal}
                />
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
