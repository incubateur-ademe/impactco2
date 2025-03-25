'use client'

import { useTranslations } from 'next-intl'
import { computedEquivalents } from 'src/providers/equivalents'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import { categories } from 'data/categories'
import EquivalentSimulator from 'components/outils/equivalents/simulators/EquivalentSimulator'
import Icon from './Icon'
import styles from './Infos.module.css'

const numerique = categories.find((category) => category.slug === 'numerique') as Category
const smartphone = computedEquivalents.find((equivalent) => equivalent.slug === 'smartphone') as ComputedEquivalent

const EmailSmartphone = () => {
  const t = useTranslations('quiz.email-smartphone')
  return (
    <>
      <div className={styles.container}>
        <div className={styles.withIcon}>
          <Icon />
          <div>
            <p>{t.rich('line-1', { important: (chunks) => <b>{chunks}</b> })}</p>
            <p>{t.rich('line-2', { important: (chunks) => <b>{chunks}</b> })}</p>
          </div>
        </div>
      </div>
      <br />
      <EquivalentSimulator category={numerique} equivalent={smartphone} className={styles.borders} />
    </>
  )
}

export default EmailSmartphone
