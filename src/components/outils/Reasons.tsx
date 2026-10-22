import Image from 'next/image'
import { ReactNode } from 'react'
import CheckIcon from 'src/components/base/icons/check'
import AddButton from './AddButton'
import styles from './Reasons.module.css'

const features = [
  '100% Gratuit',
  'Simple et rapide à ajouter',
  'Données ADEME',
  'Mises à jour automatiques',
  'Accessible',
  'Éco-conçu',
  'Compatible RGPD',
  'Reporting à la demande',
  'API Disponible',
  'Multilingue',
]

const Reasons = ({
  slug,
  name,
  title,
  reasons,
  quote,
}: {
  slug: string
  name: string
  title: ReactNode
  reasons: { slug: string; title: string; description: ReactNode }[]
  quote?: ReactNode
}) => {
  return (
    <section className={styles.wrapper}>
      <div>
        <h2 className={styles.title}>
          Pourquoi ajouter <b>{title}</b> sur votre site ?
        </h2>
        {reasons.map((reason, index) => (
          <article key={reason.slug} className={styles.reasonCard}>
            <h3 className={styles.reasonTitle}>
              <span className={styles.reasonId}>{index + 1}</span>
              {reason.title}
            </h3>
            <Image className={styles.image} width={472} height={200} src={`/images/${reason.slug}`} alt='' />
            <p>{reason.description}</p>
          </article>
        ))}
        {quote && <blockquote className={styles.quote}>{quote}</blockquote>}
        <div className={styles.addQuoteButtonContainer}>
          <AddButton slug={slug} name={name} />
        </div>
      </div>

      <aside className={styles.rightColumn}>
        <div className={styles.stickyPanel}>
          <h3 className={styles.featuresTitle}>Fonctionnalités</h3>
          <ul className={styles.featuresList}>
            {features.map((feature) => (
              <li key={feature} className={styles.featureItem}>
                <CheckIcon />
                {feature}
              </li>
            ))}
          </ul>
          <div className={styles.addButtonContainer}>
            <AddButton slug={slug} name={name} />
          </div>
        </div>
      </aside>
    </section>
  )
}

export default Reasons
