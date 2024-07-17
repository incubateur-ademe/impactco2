'use client'

import { useTranslations } from 'next-intl'
import React, { useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { useSearchEquivalent } from 'src/providers/useSearchEquivalent'
import { deplacements } from 'data/categories/deplacement'
import Button from 'components/base/buttons/Button'
import HiddenLabel from 'components/form/HiddenLabel'
import Input from 'components/form/Input'
import ComparisonEquivalents from './ComparisonEquivalents'
import styles from './EquivalentsOverscreen.module.css'

const allEquivalents = deplacements
  .filter((equivalent) => equivalent.category === 4)
  .flatMap((deplacement) =>
    deplacement.withCarpool
      ? [
          ...Array.from({ length: 4 }).map((_, index) => ({
            ...deplacement,
            carpool: index + 1,
            slug: `${deplacement.slug}+${index + 1}`,
          })),
          deplacement,
        ]
      : [deplacement]
  )

const ComparisonOverscreen = ({ index }: { index: 0 | 1 }) => {
  const {
    overscreen,
    setOverscreen,
    transport: { modes },
  } = useParamContext()
  const [search, setSearch] = useState('')
  const results = useSearchEquivalent(search, true, 4)

  const equivalents = useMemo(
    () =>
      allEquivalents.filter((equivalent) => {
        const [slug, carpool] = equivalent.slug.split('+')
        return carpool ? modes.includes(`${slug}+1`) : modes.includes(slug)
      }),
    [modes]
  )
  const tSearch = useTranslations('comparateur.overscreen')
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
              {tSearch('no-result-1')}
              <br />
              {tSearch('no-result-2')}{' '}
              <Button
                asLink
                onClick={() => {
                  setSearch('')
                }}>
                {tSearch('no-result-3')}
              </Button>
              .
            </div>
          )
        ) : (
          <ComparisonEquivalents onClose={onClose} equivalents={equivalents} index={index} />
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
