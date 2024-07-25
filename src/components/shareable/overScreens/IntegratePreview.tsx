import { useTranslations } from 'next-intl'
import React from 'react'
import NewTabIcon from 'components/base/NewTabIcon'
import Link from 'components/base/buttons/Link'
import styles from './IntegratePreview.module.css'

const IntegratePreview = ({ path, urlParams }: { path: string; urlParams: string }) => {
  const t = useTranslations('overscreen')
  return (
    <div className={styles.container}>
      <Link target='_blank' rel='noopener noreferrer' href={`/iframes/${path}?${urlParams}`} asButton size='sm'>
        {t('preview')} <NewTabIcon />
      </Link>
    </div>
  )
}

export default IntegratePreview
