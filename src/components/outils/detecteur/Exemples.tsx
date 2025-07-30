'use client'

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import ClipboardBox from 'components/base/ClipboardBox'
import Link from 'components/base/buttons/Link'
import styles from './Exemples.module.css'

const values = [
  { label: '1kg', ex: '320 g CO2e' },
  { label: '50kg', ex: '16 kg CO2e ' },
  { label: '500kg', ex: '412 kg CO2e ' },
  { label: '10t', ex: '4,32 t CO2e ' },
  { label: '100t', ex: '320 t CO2e ' },
  { label: '1000t', ex: '4800 t CO2e' },
  { label: '10000t', ex: '24 000 t CO2e' },
  { label: '100000t', ex: '648 000 t CO2e' },
  { label: 'mt', ex: '3,4 millions t CO2e' },
  { label: '10mt', ex: '48 millions t CO2e ' },
  { label: '100mt', ex: '612 millions t CO2e' },
]
const numberOfExemples = 6
const regexLinks = {
  fr: 'https://regex101.com/r/yqhsPM/1',
  en: 'https://regex101.com/r/AinInG/1',
  es: '',
}

const Exemples = () => {
  const t = useTranslations('detecteur')
  const params = useSearchParams()
  return (
    <div className={styles.container}>
      <p>{t.rich('description', { important: (chunks) => <b>{chunks}</b> })}</p>
      <ul className={styles.list}>
        {values.map(({ label, ex }) => (
          <li key={label}>
            <p className={styles.label}>{t(`exemples.${label}`)}</p>
            <p>
              <span className={styles.ex}>Ex : </span>
              {ex}
            </p>
          </li>
        ))}
      </ul>
      <p>{t.rich('exemple', { important: (chunks) => <b>{chunks}</b> })}</p>
      <div className={styles.exemples}>
        {Array.from({ length: numberOfExemples }).map((_, i) => (
          <p key={i}>{t(`exemples.exemple-${i}`)}</p>
        ))}
      </div>
      <p className={styles.regex}>
        {t.rich('regex', {
          link: (chunks) => (
            <Link
              href={regexLinks[(params.get('language') as keyof typeof regexLinks) || 'fr']}
              target='_blank'
              rel='noopener noreferrer'>
              {chunks}
            </Link>
          ),
        })}
      </p>
      <p className={styles.title}>{t('integration')}</p>
      <ClipboardBox tracking='Detecteur carbone Iframe'>{`<script id="script-detecteur-impact-co2" src="https://impactco2.fr/scripts/detection.js" data-search="?${params.toString()}"></script>`}</ClipboardBox>
    </div>
  )
}

export default Exemples
