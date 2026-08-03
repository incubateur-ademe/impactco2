import { useTranslations } from 'next-intl'
import NewTabIcon from 'components/base/NewTabIcon'
import Link from 'components/base/buttons/Link'
import styles from './IntegratePreview.module.css'

const IntegratePreview = ({ path, urlParams, secondary }: { path: string; urlParams: string; secondary?: boolean }) => {
  const t = useTranslations('overscreen')
  return (
    <div className={secondary ? '' : styles.container}>
      <Link
        target='_blank'
        rel='noopener noreferrer'
        href={`/iframes/${path}?${urlParams}`}
        asButton
        size={secondary ? undefined : 'sm'}
        className={secondary ? styles.button : ''}>
        {t('preview')} <NewTabIcon />
      </Link>
    </div>
  )
}

export default IntegratePreview
