'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import React, { ReactNode, useCallback, useEffect, useMemo, useRef } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import TranslationProvider from 'src/providers/TranslationProvider'
import { SiteLanguage } from 'types/languages'
import { track } from 'utils/matomo'
import useScreenshot from 'hooks/useScreenshot'
import GhostButton from 'components/base/GhostButton'
import Logos from 'components/base/Logo/Logos'
import Link from 'components/base/buttons/Link'
import CloseIcon from 'components/base/icons/close'
import LanguageIcon from 'components/base/icons/language'
import HiddenLabel from 'components/form/HiddenLabel'
import Select from 'components/form/Select'
import Actions from './Actions'
import Feature from './Feature'
import styles from './Shareable.module.css'
import { OverScreenInfo } from './overScreens/Values'

type ShareableProps = {
  children: ReactNode
  slug: string
  tracking: string
  withoutIntegration?: boolean
  withoutShare?: boolean
  overScreens?: Record<string, OverScreenInfo>
  secondary?: string
  noBottomBorders?: boolean
  small?: boolean
}
const Shareable = ({
  children,
  slug,
  tracking,
  withoutIntegration,
  withoutShare,
  overScreens,
  secondary,
  noBottomBorders,
  small,
}: ShareableProps) => {
  const overscreenRef = useRef<HTMLDialogElement>(null)
  const t = useTranslations('overscreen')
  const tModal = useTranslations('modal')
  const { theme, overscreen, setOverscreen, language, setLanguage } = useParamContext()
  const { ref, takeScreenshot } = useScreenshot(tracking.replace(/ /g, '-').toLowerCase(), tracking)

  const overScreenToDisplay = useMemo(
    () => (overScreens && overscreen ? overScreens[overscreen[slug]] : undefined),
    [overScreens, overscreen, slug]
  )

  const onClose = useCallback(() => setOverscreen(slug, ''), [slug])

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
      lang={language}
      className={classNames(styles.card, {
        [styles.secondaryCard]: secondary !== undefined,
        night: theme === 'night',
        [styles.smallCard]: small,
      })}>
      <div ref={secondary !== undefined ? undefined : ref}>
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
                      {tModal('close')}
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
                    <GhostButton
                      icon={<CloseIcon />}
                      iconPosition='right'
                      onClick={onClose}
                      data-testid='cancel-button'>
                      {tModal('close')}
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
      </div>
      {secondary === undefined && (
        <>
          {overScreens && ('hypothesis' in overScreens || 'data' in overScreens) ? (
            <div className={styles.ressources}>
              {'data' in overScreens && (
                <Feature
                  slug={slug}
                  type='data'
                  tracking={tracking}
                  name='Comprendre les données'
                  info={overScreens.data}
                />
              )}
              {'hypothesis' in overScreens && (
                <Feature
                  slug={slug}
                  type='hypothesis'
                  info={overScreens.hypothesis}
                  name='Aller plus loin'
                  tracking={tracking}
                />
              )}
            </div>
          ) : (
            !noBottomBorders && <div className={styles.separator} />
          )}
          {language !== 'fr' && (
            <div className={styles.disclaimer}>
              {t('disclaimer')} <Link href='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>ADEME</Link>
            </div>
          )}
          <div className={styles.logos}>
            <Logos small />
            <div className={small ? styles.bottomLanguage : styles.language}>
              <HiddenLabel htmlFor={`text-select-${slug}-language`}>{t('language.label')}</HiddenLabel>
              <Select
                id={`${slug}-language`}
                value={language}
                onChange={(event) => {
                  track(tracking, 'Language', event.target.value)
                  setLanguage(event.target.value as SiteLanguage)
                }}>
                <option value='fr'>FR</option>
                <option value='en'>EN</option>
                <option value='es'>ES</option>
              </Select>
              <LanguageIcon />
            </div>
          </div>
        </>
      )}
      <div className={classNames(styles.actions, { [styles.secondaryActions]: secondary !== undefined })}>
        <Actions
          onClick={(action) => {
            if (action === 'telecharger') {
              takeScreenshot()
            } else {
              setOverscreen(slug, action)
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
