'use client'

import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { useSearchEquivalent } from 'src/providers/useSearchEquivalent'
import { categories } from 'data/categories'
import { track } from 'utils/matomo'
import useDebounce from 'hooks/useDebounce'
import Button from 'components/base/buttons/Button'
import SearchIcon from 'components/base/icons/search'
import HiddenLabel from 'components/form/HiddenLabel'
import Input from 'components/form/Input'
import Category from './Category'
import Equivalents from './Equivalents'
import styles from './EquivalentsOverscreen.module.css'

const EquivalentsOverscreen = ({
  onClose,
  bottomButtonLabel,
  equivalents,
  setEquivalents,
}: {
  onClose?: () => void
  bottomButtonLabel?: string
  equivalents?: string[]
  setEquivalents?: (equivalents: string[]) => void
}) => {
  const equivalentRef = useRef<HTMLInputElement>(null)
  const noResultRef = useRef<HTMLParagraphElement>(null)
  const { setOverscreen, comparateur } = useParamContext()

  const [tempEquivalents, setTempEquivalents] = useState(equivalents || comparateur.equivalents)

  const close = useCallback(() => {
    if (onClose) {
      onClose()
    } else {
      setOverscreen('comparateur', '')
    }
  }, [onClose, setOverscreen])

  useEffect(() => {
    setTempEquivalents(equivalents || comparateur.equivalents)
  }, [equivalents, comparateur.equivalents])

  const [search, setSearch] = useState('')

  const debouncedSearch: string = useDebounce(search)
  const results = useSearchEquivalent(debouncedSearch, true, undefined, true)

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
            setEquivalents ? setEquivalents(tempEquivalents) : comparateur.setEquivalents(tempEquivalents)
            close()
            tempEquivalents.forEach((equivalent) => track('Comparateur', equivalent, tempEquivalents.join(', ')))
          }}>
          {tModal('close')}
        </Button>
      </div>
      {debouncedSearch ? (
        results.length > 0 ? (
          <ul className={styles.content}>
            <Equivalents
              list
              firstRef={equivalentRef}
              equivalents={tempEquivalents}
              equivalentsToDisplay={results}
              setEquivalents={setTempEquivalents}
            />
          </ul>
        ) : (
          <div className={styles.content}>
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
          </div>
        )
      ) : (
        <div className={styles.content}>
          {categories.map((category) => (
            <Category
              category={category}
              key={category.slug}
              equivalents={tempEquivalents}
              setEquivalents={setTempEquivalents}
              setFinalEquivalents={setEquivalents || comparateur.setEquivalents}
              onClose={() => close()}
            />
          ))}
        </div>
      )}
      <div className={styles.footer}>
        <p role='status'>
          <span className={styles.equivalentsNumber} data-testid='selected-equivalents-number'>
            {tempEquivalents.length}
          </span>
          <span className={styles.equivalentsInfo}> / 8 {t('equivalents')}</span>
        </p>
        <div>
          <Button
            title={t('back-title')}
            onClick={() => {
              setEquivalents ? setEquivalents(tempEquivalents) : comparateur.setEquivalents(tempEquivalents)
              close()
              tempEquivalents.forEach((equivalent) => track('Comparateur', equivalent, tempEquivalents.join(', ')))
            }}>
            {t(bottomButtonLabel || 'back')}
          </Button>
        </div>
      </div>
    </>
  )
}

export default EquivalentsOverscreen
