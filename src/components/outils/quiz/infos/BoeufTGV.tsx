'use client'

import { useTranslations } from 'next-intl'
import InfographySimulator from 'components/outils/equivalents/infographies/InfographySimulator'
import Icon from './Icon'
import styles from './Infos.module.css'

const BoeufTGV = () => {
  const t = useTranslations('quiz.boeuf-tgv')
  return (
    <>
      <div className={styles.container}>
        <div className={styles.withIcon}>
          <Icon />
          <div>
            <p>{t.rich('line-1', { important: (chunks) => <b>{chunks}</b> })}</p>
            <p>{t('line-2')}</p>
          </div>
        </div>
      </div>
      <InfographySimulator
        equivalents={['repasavecduboeuf', 'repasavecdupoulet', 'repasvegetarien']}
        className={styles.borders}
      />
    </>
  )
}

export default BoeufTGV
