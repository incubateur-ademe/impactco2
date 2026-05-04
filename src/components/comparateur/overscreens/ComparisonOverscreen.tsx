'use client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { useSearchEquivalent } from 'src/providers/useSearchEquivalent'
import { computedEquivalents } from 'data/categories/computedEquivalents'
import { deplacements } from 'data/categories/deplacement'
import { getEquivalentWithCarpool } from 'utils/carpool'
import Button from 'components/base/buttons/Button'
import HiddenLabel from 'components/form/HiddenLabel'
import Input from 'components/form/Input'
import ComparisonEquivalents from './ComparisonEquivalents'
import styles from './EquivalentsOverscreen.module.css'

const ComparisonOverscreen = ({ index }: { index: 0 | 1 }) => {
  const { setOverscreen } = useParamContext()
  const [search, setSearch] = useState('')
  const results = useSearchEquivalent(
    search,
    false,
    4,
    false,
    computedEquivalents('transport', deplacements).flatMap(getEquivalentWithCarpool)
  )

  const tSearch = useTranslations('comparateur.overscreen')
  const t = useTranslations('overscreen.transport')
  const tModal = useTranslations('modal')
  const onClose = () => {
    setOverscreen('transport', '')
  }
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
        />
        <Button
          size='sm'
          onClick={() => {
            onClose()
          }}>
          {tModal('close')}
        </Button>
      </div>
      <ul className={styles.content}>
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
          <ComparisonEquivalents onClose={onClose} equivalents={results} index={index} />
        )}
      </ul>
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
