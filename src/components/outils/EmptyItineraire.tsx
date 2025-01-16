import { useTranslations } from 'next-intl'
import { computedEquivalents } from 'src/providers/equivalents'
import { ComputedEquivalent } from 'types/equivalent'
import SimpleEtiquette from 'components/comparateur/SimpleEtiquette'
import styles from './EmptyItineraire.module.css'

const train = computedEquivalents.find((equivalent) => equivalent.slug === 'tgv') as ComputedEquivalent
const velo = computedEquivalents.find((equivalent) => equivalent.slug === 'veloelectrique') as ComputedEquivalent
const voiture = computedEquivalents.find((equivalent) => equivalent.slug === 'voiturethermique') as ComputedEquivalent
const avion = computedEquivalents.find((equivalent) => equivalent.slug === 'avion-courtcourrier') as ComputedEquivalent

const EmptyItineraire = () => {
  const t = useTranslations('transport.itineraire')
  return (
    <div className={styles.container}>
      <p className={styles.text}>{t('empty')}</p>
      <div className={styles.content}>
        <div className={styles.begining} />
        <ul className={styles.etiquettes}>
          <li>
            <SimpleEtiquette equivalent={train} base={100} max={avion.value} />
          </li>
          <li>
            <SimpleEtiquette equivalent={velo} base={100} max={avion.value} />
          </li>
          <li>
            <SimpleEtiquette equivalent={voiture} base={100} max={avion.value} />
          </li>
          <li>
            <SimpleEtiquette equivalent={avion} base={100} max={avion.value} />
          </li>
        </ul>
        <div className={styles.end} />
      </div>
    </div>
  )
}

export default EmptyItineraire
