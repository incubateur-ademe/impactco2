import { useTranslations } from 'next-intl'
import Link from 'src/components/base/buttons/Link'
import CheckIcon from 'src/components/base/icons/check'
import FullArrowRightIcon from 'src/components/base/icons/full-arrow-right'
import styles from './TransportIntegratePaste.module.css'

const TransportIntegratePaste = () => {
  const t = useTranslations('overscreen.transport.paste')
  return (
    <>
      <div className={styles.intro}>
        <p>{t.rich('details-1', { b: (children) => <b>{children}</b> })}</p>
        <br />
        <p>{t.rich('details-2')}</p>
      </div>
      <div className={styles.thanks}>
        <div className={styles.icon}>
          <CheckIcon />
        </div>
        <div className={styles.text}>
          <p className={styles.title}>{t('thanks-title')}</p>
          <p>{t.rich('thanks', { link: (children) => <Link href='/doc/exemples'>{children}</Link> })}</p>
        </div>
        <Link asButton size='sm' href='/rendez-vous?$fromLabel=Transport intégration'>
          {t('write')} <FullArrowRightIcon />
        </Link>
      </div>
    </>
  )
}

export default TransportIntegratePaste
