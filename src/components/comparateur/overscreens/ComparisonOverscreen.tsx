'use client'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { useSearchEquivalent } from 'src/providers/useSearchEquivalent'
import { ComputedEquivalent } from 'types/equivalent'
import { computedEquivalents } from 'data/categories/computedEquivalents'
import { deplacements } from 'data/categories/deplacement'
import { getEquivalentWithCarpool } from 'utils/carpool'
import Button from 'components/base/buttons/Button'
import HiddenLabel from 'components/form/HiddenLabel'
import Input from 'components/form/Input'
import ComparisonEquivalents from './ComparisonEquivalents'
import SubCategoryEquivalent from './SubCategoryEquivalent'
import { subCategories } from './equivalentCategories'
import styles from './EquivalentsOverscreen.module.css'

const allEquivalents = computedEquivalents('transport', deplacements).flatMap(getEquivalentWithCarpool)

const ComparisonOverscreen = ({ index }: { index: 0 | 1 }) => {
  const { setOverscreen } = useParamContext()
  const [search, setSearch] = useState('')
  const results = useSearchEquivalent(search, false, 4, false, allEquivalents)

  const tSearch = useTranslations('comparateur.overscreen')
  const t = useTranslations('overscreen.transport')
  const tModal = useTranslations('modal')
  const onClose = () => {
    setOverscreen('transport', '')
  }

  const { categoriesEquivalents, categorizedSlugs } = useMemo(() => {
    const result = {} as Record<string, Record<string, ComputedEquivalent[]>>
    Object.entries(subCategories).forEach(([category, categoryEquivalents]) => {
      const categories = {} as Record<string, ComputedEquivalent[]>
      Object.entries(categoryEquivalents).forEach(([subCategory, subCategoryEquivalents]) => {
        const filteredEquivalents = subCategoryEquivalents
          .map((subCategoryEquivalent) => results.find((equivalent) => equivalent.slug === subCategoryEquivalent))
          .filter((equivalent) => equivalent !== undefined)
        if (filteredEquivalents.length > 0) {
          categories[subCategory] = filteredEquivalents
        }
      })
      if (Object.keys(categories).length > 0) {
        result[category] = categories
      }
    })
    return {
      categoriesEquivalents: result,
      categorizedSlugs: Object.values(result).flatMap((subCategories) =>
        Object.values(subCategories).flatMap((subCategoryEquivalents) =>
          subCategoryEquivalents.map((equivalent) => equivalent.slug)
        )
      ),
    }
  }, [results])

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
          <>
            {Object.entries(categoriesEquivalents)
              .filter(([category]) => category.startsWith('voiture'))
              .map(([category, subCategories]) => (
                <SubCategoryEquivalent
                  category={allEquivalents.find((equivalent) => equivalent.slug === category) as ComputedEquivalent}
                  categoriesEquivalents={subCategories}
                  onClose={onClose}
                  index={index}
                  key={category}
                />
              ))}
            <ComparisonEquivalents
              onClose={onClose}
              equivalents={results.filter((equivalent) => !categorizedSlugs.includes(equivalent.slug))}
              index={index}
            />
          </>
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
