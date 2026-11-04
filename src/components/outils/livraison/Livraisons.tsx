'use client'

import classNames from 'classnames'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Category as CategoryType } from 'types/category'
import { categories } from 'src/data/categories'
import Shareable from 'components/shareable/Shareable'
import LivraisonEtiquetteIntegrate from 'src/components/shareable/overScreens/LivraisonEtiquetteIntegrate'
import Share from 'src/components/shareable/overScreens/Share'
import { overScreenCategoryValues } from 'src/components/shareable/overScreens/Values/Category'
import Category from '../Category'
import LivraisonEtiquette from './LivraisonEtiquette'
import LivraisonSimulator from './LivraisonSimulator'
import styles from './Livraisons.module.css'

const livraisonCategory = categories.find((category) => category.slug === 'livraison') as CategoryType

const simulateurOverscreen = overScreenCategoryValues(livraisonCategory)
const overScreenEtiquette = {
  etiquette: {
    partager: {
      title: 'share',
      children: <Share path='outils/livraison?tab=etiquettes' tracking='Livraison' extraKit='livraison' />,
    },
    integrer: {
      title: 'integrate-etiquette',
      children: <LivraisonEtiquetteIntegrate />,
    },
  },
  simulateur: {
    ...simulateurOverscreen,
    integrer: { ...simulateurOverscreen.integrer, title: 'integrate-simulateur' },
  },
}

const Livraisons = () => {
  const screenshotRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab') as 'etiquettes' | 'simulateur' | null

  const [selected, setSelected] = useState<'etiquettes' | 'simulateur'>('etiquettes')
  const etiquettesRef = useRef<HTMLButtonElement>(null)
  const simulateurRef = useRef<HTMLButtonElement>(null)
  const [forceFocus, setForceFocus] = useState(false)

  useEffect(() => {
    if (tabParam === 'simulateur' || tabParam === 'etiquettes') {
      setSelected(tabParam)
    }
  }, [tabParam])

  const handleTabChange = (tab: 'etiquettes' | 'simulateur') => {
    setSelected(tab)
    const params = new URLSearchParams(searchParams)
    params.set('tab', tab)
    window.history.replaceState(null, '', `?${params.toString()}`)
  }

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.code === 'ArrowRight') {
        e.preventDefault()
        handleTabChange('simulateur')
        simulateurRef.current?.focus()
        setForceFocus(true)
      }
      if (e.code === 'ArrowLeft') {
        e.preventDefault()
        handleTabChange('etiquettes')
        etiquettesRef.current?.focus()
        setForceFocus(true)
      }
    },
    [etiquettesRef, simulateurRef]
  )

  return (
    <Shareable
      slug='livraison-etiquettes'
      tracking={selected === 'etiquettes' ? 'Livraison Étiquettes' : 'Livraison'}
      overScreens={selected === 'etiquettes' ? overScreenEtiquette.etiquette : overScreenEtiquette.simulateur}
      secondary
      integrateLabel={selected === 'etiquettes' ? 'integrate-etiquette' : 'integrate-simulateur'}
      header={
        <div className={styles.tabs} data-testid='livraison-tabs' role='tablist'>
          <button
            ref={etiquettesRef}
            className={classNames(styles.tab, {
              [styles.selectedTab]: selected === 'etiquettes',
              [styles.forceFocus]: forceFocus,
            })}
            onClick={() => handleTabChange('etiquettes')}
            data-testid='livraison-tab-etiquettes'
            role='tab'
            id='tab-etiquettes'
            aria-controls='tabpanel-etiquettes'
            aria-selected={selected === 'etiquettes'}
            tabIndex={selected === 'etiquettes' ? 0 : -1}
            onKeyDown={onKeyDown}
            onBlur={() => {
              if (selected === 'etiquettes') {
                setForceFocus(false)
              }
            }}>
            <Image src='/images/etiquettes.svg' alt='' width={40} height={40} />
            L'étiquette livraison
          </button>
          <button
            ref={simulateurRef}
            className={classNames(styles.tab, {
              [styles.selectedTab]: selected === 'simulateur',
              [styles.forceFocus]: forceFocus,
            })}
            onClick={() => handleTabChange('simulateur')}
            data-testid='livraison-tab-simulateur'
            role='tab'
            id='tab-simulateur'
            aria-controls='tabpanel-simulateur'
            aria-selected={selected === 'simulateur'}
            tabIndex={selected === 'simulateur' ? 0 : -1}
            onKeyDown={onKeyDown}
            onBlur={() => {
              if (selected === 'simulateur') {
                setForceFocus(false)
              }
            }}>
            <Image src='/images/simulateur.svg' alt='' width={40} height={40} />
            Le simulateur livraison
          </button>
        </div>
      }
      screenshotRef={selected === 'etiquettes' ? screenshotRef : undefined}>
      <div
        id='tabpanel-etiquettes'
        role='tabpanel'
        aria-labelledby='tab-etiquettes'
        className={selected === 'simulateur' ? styles.hidden : undefined}>
        <div className={styles.livraisons}>
          <div>
            <div ref={screenshotRef}>
              <LivraisonEtiquette id='static' />
            </div>
            <p className={styles.label}>étiquette statique</p>
          </div>
          <hr className={styles.separator} />
          <div>
            <LivraisonEtiquette animated id='animated' />
            <p className={styles.label}>étiquette animée</p>
          </div>
        </div>
      </div>
      <div
        id='tabpanel-simulateur'
        role='tabpanel'
        aria-labelledby='tab-simulateur'
        className={selected === 'etiquettes' ? styles.hidden : undefined}>
        <Category category={livraisonCategory} simulator={<LivraisonSimulator />} withoutButtons />
      </div>
    </Shareable>
  )
}

export default Livraisons
