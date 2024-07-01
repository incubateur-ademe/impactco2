import React from 'react'
import TranslationProvider from 'src/providers/TranslationProvider'
import { ComputedEquivalent } from 'types/equivalent'
import { categories } from 'data/categories'
import EquivalentCardContent from '../outils/equivalents/EquivalentCardContent'
import IframeableLink from 'components/base/IframeableLink'
import styles from './EquivalentCard.module.css'

const EquivalentCard = ({ equivalent }: { equivalent?: ComputedEquivalent }) => {
  const category = equivalent ? categories.find((x) => x.id === equivalent.category) : undefined

  return equivalent && category ? (
    <IframeableLink
      href={equivalent.link}
      className={styles.equivalent}
      data-testid={`equivalent-search-${equivalent.slug}`}>
      <TranslationProvider>
        <EquivalentCardContent equivalent={equivalent} category={category} />
      </TranslationProvider>
    </IframeableLink>
  ) : (
    <div className={styles.empty} data-testid='equivalent-search-empty' />
  )
}

export default EquivalentCard
