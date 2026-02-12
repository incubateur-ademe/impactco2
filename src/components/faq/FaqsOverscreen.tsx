'use client'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { fetchFaqsByTool } from 'src/serverFunctions/faqs'
import { FAQCategory, FAQ as FAQType } from 'types/faq'
import Button from 'components/base/buttons/Button'
import HiddenLabel from 'components/form/HiddenLabel'
import Input from 'components/form/Input'
import FAQ from './FAQ'
import { FAQSListProps } from './FAQsList'
import useSearchableFAQs from './SearchableFAQs'
import headerStyles from '../comparateur/overscreens/EquivalentsOverscreen.module.css'
import styles from './FAQsList.module.css'

const faqCategoriesOrder: Record<FAQCategory, number> = {
  [FAQCategory.QuestionsGenerales]: 1,
  [FAQCategory.GeneralQuestions]: 1,
  [FAQCategory.PreguntasGenerales]: 1,
  [FAQCategory.ComprendreLeCalcul]: 2,
  [FAQCategory.AboutTheCalculation]: 2,
  [FAQCategory.EntenderElCálculo]: 2,
  [FAQCategory.CestÉtonnant]: 3,
  [FAQCategory.ItsSurprising]: 3,
  [FAQCategory.EsSorprendente]: 3,
  [FAQCategory.IdéesPourAgir]: 4,
  [FAQCategory.IdeasForAction]: 4,
  [FAQCategory.IdeasParaActuar]: 4,
  [FAQCategory.ÀProposDesOutils]: 5,
  [FAQCategory.AboutTheTools]: 5,
  [FAQCategory.AcercaDeLasHerramientas]: 5,
}

const FaqsOverscreen = ({ filter, page, slug }: { filter: string; slug: string } & Omit<FAQSListProps, 'faqs'>) => {
  const { setOverscreen, language } = useParamContext()
  const t = useTranslations('faq')
  const tModal = useTranslations('modal')
  const [search, setSearch] = useState('')
  const [faqs, setFaqs] = useState<FAQType[]>([])
  const { faqsByCategory } = useSearchableFAQs({ faqs, search, categoryOrder: faqCategoriesOrder, tracking: filter })

  const onClose = () => {
    setOverscreen(slug, '')
  }
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
      <div className={headerStyles.header}>
        <p className={styles.searchExemples}>
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
        <Button
          size='sm'
          onClick={() => {
            onClose()
          }}>
          {tModal('close')}
        </Button>
      </div>
      <div className={headerStyles.scrollable}>
        {faqsByCategory.length > 0 ? (
          <>
            <ul className={styles.categories}>
              {faqsByCategory.map(([category, faqs]) => (
                <li key={category} className={styles.category}>
                  <h2 className={styles.categoryTitle}>{category}</h2>
                  <ul>
                    {faqs.map((faq) => (
                      <FAQ key={faq.title} faq={faq} page={page} loadingText={t('loading')} withAnchor />
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <div className={classNames(styles.footer, styles.footerTop)}>
              <p>{t('notFound')}</p>
              <ul className={styles.footer}>
                <li className={styles.footer}>
                  <Link href={`/suggestion?fromLabel=${page}`}>{t('contact')}</Link>
                </li>
              </ul>
            </div>{' '}
          </>
        ) : (
          <div>
            <p className={styles.noResult}>
              {t('noResult')} <b>"{search}"</b> <em>-</em>{' '}
              <Button asLink onClick={() => setSearch('')}>
                {t('clear')}
              </Button>
            </p>

            <p className={styles.noResultExplanation}>{t('noResultExplanation')}</p>
            <br />
            <p className={styles.noResultAdditionalInfo}>
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
