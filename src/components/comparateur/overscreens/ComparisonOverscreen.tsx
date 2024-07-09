'use client'

import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { useSearchEquivalent } from 'src/providers/useSearchEquivalent'
import { deplacements } from 'data/categories/deplacement'
import Button from 'components/base/buttons/Button'
import HiddenLabel from 'components/form/HiddenLabel'
import Input from 'components/form/Input'
import ComparisonEquivalents from './ComparisonEquivalents'
import styles from './EquivalentsOverscreen.module.css'

const ComparisonOverscreen = ({ index }: { index: 0 | 1 }) => {
  const { overscreen, setOverscreen } = useParamContext()
  const [search, setSearch] = useState('')
  const results = useSearchEquivalent(search, true, 4)

  const t = useTranslations('overscreen.transport')
  const tModal = useTranslations('modal')
  const onClose = () => {
    setOverscreen({ ...overscreen, transport: '' })
  }
  return (
    <>
      <div className={styles.header}>
        <HiddenLabel htmlFor='input-search'>{t('search')}</HiddenLabel>
        <Input
          id='search'
          background='white'
          placeholder={t('search')}
          value={search}
          padding='lg'
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          size='sm'
          onClick={() => {
            onClose()
          }}>
          {tModal('close')}
        </Button>
      </div>
      <div className={styles.content}>
        {search ? (
          results.length > 0 ? (
            <ComparisonEquivalents onClose={onClose} equivalents={results} index={index} />
          ) : (
            <div className={styles.noResult}>
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
            </div>
          )
        ) : (
          <ComparisonEquivalents onClose={onClose} equivalents={deplacements} index={index} />
        )}
      </div>
      <div className={styles.footerCenter}>
        <Button
          onClick={() => {
            onClose()
          }}>
          {t('back')}
        </Button>
      </div>
    </>
  )
}

export default ComparisonOverscreen
