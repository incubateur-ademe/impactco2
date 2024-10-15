'use client'

import { useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { useSearchEquivalent } from 'src/providers/useSearchEquivalent'
import { categories } from 'data/categories'
import { track } from 'utils/matomo'
import Button from 'components/base/buttons/Button'
import SearchIcon from 'components/base/icons/search'
import HiddenLabel from 'components/form/HiddenLabel'
import Input from 'components/form/Input'
import Category from './Category'
import Equivalents from './Equivalents'
import styles from './EquivalentsOverscreen.module.css'

const EquivalentsOverscreen = () => {
  const equivalentRef = useRef<HTMLInputElement>(null)
  const noResultRef = useRef<HTMLParagraphElement>(null)
  const {
    setOverscreen,
    comparateur: { equivalents, setEquivalents },
  } = useParamContext()

  const [tempEquivalents, setTempEquivalents] = useState(equivalents)

  useEffect(() => {
    setTempEquivalents(equivalents)
  }, [equivalents])

  const [search, setSearch] = useState('')
  const results = useSearchEquivalent(search, true)

  const t = useTranslations('comparateur.overscreen')
  const tModal = useTranslations('modal')
  return (
    <>
      <div className={styles.header}>
        <HiddenLabel htmlFor='input-search'>{t('search')}</HiddenLabel>
        <Input
          id='search'
          placeholder={t('search')}
          value={search}
          padding='lg'
          onChange={(e) => setSearch(e.target.value)}
          icon={<SearchIcon />}
          iconAria='Afficher les résultats'
          onIconClick={() => {
            if (noResultRef.current) {
              noResultRef.current.focus()
            } else if (equivalentRef.current) {
              equivalentRef.current.focus()
            }
          }}
        />
        <Button
          size='sm'
          onClick={() => {
            setEquivalents(tempEquivalents)
            setOverscreen('comparateur', '')
            tempEquivalents.forEach((equivalent) => track('Comparateur', equivalent, tempEquivalents.join(', ')))
          }}>
          {tModal('close')}
        </Button>
      </div>
      <ul className={styles.content}>
        {search ? (
          results.length > 0 ? (
            <Equivalents
              firstRef={equivalentRef}
              equivalents={tempEquivalents}
              equivalentsToDisplay={results}
              setEquivalents={setTempEquivalents}
            />
          ) : (
            <p className={styles.noResult} ref={noResultRef} tabIndex={-1}>
              {t('no-result-1')}
              <br />
              {t('no-result-2')}{' '}
              <Button
                asLink
                onClick={() => {
                  setSearch('')
                }}>
                {t('no-result-3')}
              </Button>
              .
            </p>
          )
        ) : (
          categories
            .filter((category) => category.id !== 12 && category.id !== 11)
            .map((category) => (
              <Category
                category={category}
                key={category.slug}
                equivalents={tempEquivalents}
                setEquivalents={setTempEquivalents}
                onClose={() => setOverscreen('comparateur', '')}
              />
            ))
        )}
      </ul>
      <div className={styles.footer}>
        <div role='status'>
          <span className={styles.equivalentsNumber} data-testid='selected-equivalents-number'>
            {tempEquivalents.length}
          </span>
          <span className={styles.equivalentsInfo}> / 8 {t('equivalents')}</span>
        </div>
        <div>
          <Button
            title={t('back-title')}
            onClick={() => {
              setEquivalents(tempEquivalents)
              setOverscreen('comparateur', '')
              tempEquivalents.forEach((equivalent) => track('Comparateur', equivalent, tempEquivalents.join(', ')))
            }}>
            {t('back')}
          </Button>
        </div>
      </div>
    </>
  )
}

export default EquivalentsOverscreen
