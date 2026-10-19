'use client'

import { useTranslations } from 'next-intl'
import ClipboardBox from 'components/base/ClipboardBox'
import Link from 'src/components/base/buttons/Link'
import styles from './IntegrateFooter.module.css'
import shareStyles from './Share.module.css'

const IntegrateFooter = ({ search, tracking }: { search: string; tracking: string }) => {
  const t = useTranslations('overscreen.transport')

  return (
    <>
      <div className={shareStyles.separator} />
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionIdBis}>?</span>
        {t('integrate-difficulty')}
      </h2>
      <p className={styles.text}>
        {t.rich('integrate-difficulty-text', {
          link: (children) => <Link href='/rendez-vous?$fromLabel=Transport intégration'>{children}</Link>,
        })}
      </p>
      <ClipboardBox tracking={tracking}>{`https://impactco2.fr/outils/transport?${search}`}</ClipboardBox>
    </>
  )
}

export default IntegrateFooter
