'use client'

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import ClipboardBox from 'components/base/ClipboardBox'
import styles from './Exemples.module.css'

const values = [
  { label: '1kg', ex: '320 g CO2e' },
  { label: '1kg', ex: '16 kg CO2e ' },
  { label: '50kg', ex: '412 kg CO2e ' },
  { label: '500kg', ex: '4,32 t CO2e ' },
  { label: '100t', ex: '320 t CO2e ' },
  { label: '1000t', ex: '4800 t CO2e' },
  { label: '10000t', ex: '24 000 t CO2e' },
  { label: '100000t', ex: '648 000 t CO2e' },
  { label: 'mt', ex: '3,4 millions de t CO2e' },
  { label: '10mt', ex: '48 millions de t CO2e ' },
  { label: '100mt', ex: '612 millions de t CO2e' },
]
const numberOfExemples = 6
const Exemples = () => {
  const t = useTranslations('detecteur.exemples')
  const params = useSearchParams()
  return (
    <>
      <p>
        <b>Le Détecteur carbone propose une sélection d’équivalents adaptés à la quantité carbone détectée.</b> Vous
        pouvez cliquer sur les quantités ci-dessous pour voir les équivalents que propose automatiquement le Détecteur,
        avec les paramètres choisis.
      </p>
      <ul className={styles.list}>
        {values.map(({ label, ex }) => (
          <li key={label}>
            <p className={styles.label}>{t(label)}</p>
            <p>
              <span className={styles.ex}>Ex : </span>
              {ex}
            </p>
          </li>
        ))}
      </ul>
      <p>
        <b>L’outil détecte de nombreux types de notations</b>, dont voici quelques exemples :
      </p>
      <div className={styles.exemples}>
        {Array.from({ length: numberOfExemples }).map((_, i) => (
          <p>{t(`exemple-${i}`)}</p>
        ))}
      </div>
      <p className={styles.title}>Intégrer le Détecteur</p>
      <ClipboardBox tracking='Detecteur carbone Iframe'>{`<script id="script-detecteur-impact-co2" src="https://impactco2.fr/scripts/detection.js" data-search="?${params.toString()}"></script>`}</ClipboardBox>
    </>
  )
}

export default Exemples
