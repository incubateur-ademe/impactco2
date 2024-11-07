import { useTranslations } from 'next-intl'
import React from 'react'
import ToolCard from 'components/cards/ToolCard'
import styles from './ShareKit.module.css'

const ShareKit = () => {
  const t = useTranslations('overscreen')

  return (
    <>
      <div className={styles.separatorBothBorders} />
      <div className={styles.kit}>
        <p className={styles.kitTitle}>{t('communicate')}</p>
        <ToolCard
          slug='kit'
          horizontal
          image='/images/doc-kit.svg'
          title={t('kitTitle')}
          description={t('kitDescription')}
          linkLabel={t('kitLink')}
          link='/doc/kit-communication'
        />
      </div>
    </>
  )
}

export default ShareKit
