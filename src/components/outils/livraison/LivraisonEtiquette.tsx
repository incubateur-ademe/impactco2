'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import useTrackingContext from 'src/providers/TrackingProvider'
import { computedEquivalents } from 'src/providers/equivalents'
import { track } from 'utils/matomo'
import { buildCurrentUrlFor } from 'utils/urls'
import CloseIcon from 'components/base/icons/close'
import InformationIcon from 'components/base/icons/information'
import Logo from 'components/externalModules/Logo'
import Disclaimer from './Disclaimer'
import LivraisonEquivalent from './LivraisonEquivalent'
import Progress from './Progress'
import styles from './LivraisonEtiquette.module.css'

const livraisonEquivalents = computedEquivalents
  .filter((equivalent) => equivalent.category === 12)
  .sort((a, b) => a.value - b.value)

const LivraisonEtiquette = ({ animated, id }: { animated?: boolean; id: string }) => {
  const params = useSearchParams()
  const customTheme = params.get('customTheme')
  const mode = params.get('mode')

  const { trackOnce } = useTrackingContext()
  const t = useTranslations('livraison')

  const {
    livraison: { modes },
  } = useParamContext()

  const [toDisplay, setToDisplay] = useState(0)
  const [fadeIn, setFadeIn] = useState(false)
  const [displayDisclaimer, setDisplayDisclaimer] = useState(false)

  const equivalents = useMemo(
    () =>
      livraisonEquivalents
        .filter((equivalent) => {
          return modes.some((mode) => equivalent.slug.startsWith(mode))
        })
        .filter((equivalent) =>
          mode && mode !== '1' ? equivalent.slug.endsWith(`${mode}kg`) : !equivalent.slug.endsWith('kg')
        ),
    [modes, mode]
  )

  const shouldAnimate = animated && equivalents.length > 1
  return (
    <div className={customTheme === 'grey' ? styles.greyContainer : styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <p>
            {t.rich(customTheme === 'grey' ? 'greyEtiquette' : 'etiquette', {
              important: (chunk) => <span className={styles.bold}>{chunk}</span>,
              value: mode || '1',
              count: mode ? parseInt(mode) : 1,
            })}
          </p>
          <button
            aria-controls={`etiquette-${id}-disclaimer`}
            aria-expanded={displayDisclaimer}
            title='Afficher les informations de contenus'
            className={classNames(styles.disclaimerButton, { [styles.disclaimerAnimated]: shouldAnimate })}
            onClick={() => {
              track('Livraison', 'informations', displayDisclaimer ? 'close' : 'open')
              setDisplayDisclaimer(!displayDisclaimer)
            }}>
            {displayDisclaimer ? <CloseIcon /> : <InformationIcon />}
          </button>
        </div>
        <Logo
          className={styles.logo}
          url={buildCurrentUrlFor('/outils/livraison')}
          onClick={() => trackOnce('Logo')}
          right
          title='Lien externe : accéder au simulateur livraison sur le site Impact CO2'
        />
        {shouldAnimate && <Progress length={equivalents.length} setFadeIn={setFadeIn} setToDisplay={setToDisplay} />}
      </div>
      <div className={styles.content}>
        {displayDisclaimer && (
          <Disclaimer animated={shouldAnimate} id={id} className={styles.disclaimer} mode={mode || '1'} />
        )}
        <ul className={shouldAnimate ? styles.animatedList : ''}>
          {equivalents.map((livraisonEquivalent, index) => (
            <li
              key={livraisonEquivalent.slug}
              className={
                shouldAnimate
                  ? index === toDisplay && !fadeIn
                    ? styles.visibleAnimatedComparison
                    : styles.animatedComparison
                  : styles.comparison
              }>
              <LivraisonEquivalent
                index={index}
                animated={shouldAnimate}
                equivalent={livraisonEquivalent}
                max={equivalents[equivalents.length - 1].value}
                customTheme={customTheme}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default LivraisonEtiquette
