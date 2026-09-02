import { useTranslations } from 'next-intl'
import { track } from 'src/utils/matomo'
import NewTabIcon from 'components/base/NewTabIcon'
import Link from 'components/base/buttons/Link'
import styles from './IntegratePreview.module.css'

const IntegratePreview = ({
  tracking,
  path,
  urlParams,
  secondary,
}: {
  tracking: string
  path: string
  urlParams: string
  secondary?: boolean
}) => {
  const t = useTranslations('overscreen')
  return (
    <div className={secondary ? '' : styles.container}>
      <Link
        target='_blank'
        rel='noopener noreferrer'
        href={`/iframes/${path}?${urlParams}`}
        asButton
        size={secondary ? undefined : 'sm'}
        className={secondary ? styles.button : ''}
        onClick={() => {
          track(tracking, 'Preview', "Aperçu de l'intégration")
        }}>
        {t('preview')} <NewTabIcon />
      </Link>
    </div>
  )
}

export default IntegratePreview
