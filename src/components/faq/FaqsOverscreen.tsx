'use client'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { fetchFaqsByTool } from 'src/serverFunctions/faqs'
import { FAQCategory, FAQ as FAQType } from 'types/faq'
import Button from 'components/base/buttons/Button'
import Link from 'components/base/buttons/Link'
import HiddenLabel from 'components/form/HiddenLabel'
import Input from 'components/form/Input'
import FAQ from './FAQ'
import { FAQSListProps } from './FAQsList'
import useSearchableFAQs from './SearchableFAQs'
import headerStyles from '../comparateur/overscreens/EquivalentsOverscreen.module.css'
import faqStyles from './FAQsList.module.css'
import styles from './FaqsOverscreen.module.css'

const faqCategoriesOrder: Record<FAQCategory, number> = {
  [FAQCategory.QuestionsGenerales]: 1,
  [FAQCategory.ComprendreLeCalcul]: 2,
  [FAQCategory.CestÉtonnant]: 3,
  [FAQCategory.IdéesPourAgir]: 4,
  [FAQCategory.ÀProposDesOutils]: 5,
}

const FaqsOverscreen = ({ filter, page }: { filter: string } & Omit<FAQSListProps, 'faqs'>) => {
  const { language } = useParamContext()
  const t = useTranslations('faq')
  const [search, setSearch] = useState('')
  const [faqs, setFaqs] = useState<FAQType[]>([])
  const { faqsByCategory } = useSearchableFAQs({ faqs, search, categoryOrder: faqCategoriesOrder, tracking: filter })

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await fetchFaqsByTool(filter, language)
        if (!cancelled) {
          setFaqs(data)
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Unable to load FAQs', error)
          setFaqs([])
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [filter, language])

  if (faqs.length === 0) {
    return <p>{t('loading')}</p>
  }

  return (
    <>
      <div className={classNames(headerStyles.header, styles.header)}>
        <p className={faqStyles.searchExemples}>
          {t('exemple')}{' '}
          <Button onClick={() => setSearch(t(`${filter}.exemple-1`))} asLink>
            {t(`${filter}.exemple-1`)}
          </Button>
          ,{' '}
          <Button onClick={() => setSearch(t(`${filter}.exemple-2`))} asLink>
            {t(`${filter}.exemple-2`)}
          </Button>
          ,{' '}
          <Button onClick={() => setSearch(t(`${filter}.exemple-3`))} asLink>
            {t(`${filter}.exemple-3`)}
          </Button>{' '}
          {t('or')}{' '}
          <Button onClick={() => setSearch(t(`${filter}.exemple-4`))} asLink>
            {t(`${filter}.exemple-4`)}
          </Button>
        </p>
        <HiddenLabel htmlFor='input-search'>{t('search')}</HiddenLabel>
        <Input
          id='search'
          placeholder={t('search')}
          value={search}
          padding='lg'
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={headerStyles.scrollable}>
        {faqsByCategory.length > 0 ? (
          <>
            <ul className={faqStyles.categories}>
              {faqsByCategory.map(([category, faqs]) => (
                <li key={category} className={faqStyles.category}>
                  <h2 className={faqStyles.categoryTitle}>{t(category)}</h2>
                  <ul>
                    {faqs.map((faq) => (
                      <FAQ key={faq.title} faq={faq} page={page} loadingText={t('loading')} withAnchor />
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <div className={faqStyles.footer}>
              <p>
                {t('notFound')} <Link href={`/suggestion?fromLabel=${page}`}>{t('contact')}</Link>
              </p>
            </div>
          </>
        ) : (
          <div>
            <p className={faqStyles.noResult}>
              {t('noResult')} <b>"{search}"</b> <em>-</em>{' '}
              <Button asLink onClick={() => setSearch('')}>
                {t('clear')}
              </Button>
            </p>

            <p className={faqStyles.noResultExplanation}>{t('noResultExplanation')}</p>
            <br />
            <p className={faqStyles.noResultAdditionalInfo}>
              {t.rich('noResultAdditionalInfo', {
                contact: (chunk) => <Link href={`/suggestion?fromLabel=${page}`}>{chunk}</Link>,
              })}
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default FaqsOverscreen
