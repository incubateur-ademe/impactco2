'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
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
  const t = useTranslations('livraison')

  const {
    livraison: { modes },
  } = useParamContext()

  const [toDisplay, setToDisplay] = useState(0)
  const [fadeIn, setFadeIn] = useState(false)
  const [displayDisclaimer, setDisplayDisclaimer] = useState(false)

  const equivalents = useMemo(
    () =>
      livraisonEquivalents.filter((equivalent) => {
        return modes.some((mode) => equivalent.slug.startsWith(mode))
      }),
    [modes]
  )

  const shouldAnimate = animated && equivalents.length > 1
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <p>{t.rich('etiquette', { important: (chunk) => <span className={styles.bold}>{chunk}</span> })}</p>
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
          url={buildCurrentUrlFor('/outils/livraison')}
          right
          title='Lien externe : accéder au simulateur livraison sur le site Impact CO2'
        />
        {shouldAnimate && <Progress length={equivalents.length} setFadeIn={setFadeIn} setToDisplay={setToDisplay} />}
      </div>
      <div className={styles.content}>
        {displayDisclaimer && <Disclaimer animated={shouldAnimate} id={id} />}
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
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default LivraisonEtiquette
