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
      <div className={styles.etiquettes}>
        <div className={styles.begining} />
        <div className={styles.line}>
          <SimpleEtiquette equivalent={train} base={100} max={avion.value} />
          <SimpleEtiquette equivalent={velo} base={100} max={avion.value} />
        </div>
        <div className={styles.line}>
          <SimpleEtiquette equivalent={voiture} base={100} max={avion.value} />
          <SimpleEtiquette equivalent={avion} base={100} max={avion.value} />
        </div>
        <div className={styles.end} />
      </div>
    </div>
  )
}

export default EmptyItineraire
