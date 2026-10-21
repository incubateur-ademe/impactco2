'use client'

import { useTranslations } from 'next-intl'
import ClipboardBox from 'components/base/ClipboardBox'
import Link from 'src/components/base/buttons/Link'
import IntegratePaste from './IntegratePaste'
import styles from './IntegrateFooter.module.css'
import shareStyles from './Share.module.css'

const IntegrateFooter = ({ url, tracking, from }: { url: string; tracking: string; from: string }) => {
  const t = useTranslations('overscreen.integrate-modal')

  return (
    <>
      <IntegratePaste from={from} />
      <div className={shareStyles.separator} />
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionIdBis}>?</span>
        {t('difficulty')}
      </h2>
      <p className={styles.text}>
        {t.rich('difficulty-text', {
          link: (children) => <Link href={`/rendez-vous?$fromLabel=${from}`}>{children}</Link>,
        })}
      </p>
      <ClipboardBox tracking={tracking}>{`https://impactco2.fr/outils/${url}`}</ClipboardBox>
    </>
  )
}

export default IntegrateFooter
