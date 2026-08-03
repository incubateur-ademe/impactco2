import Image from 'next/image'
import Link from 'src/components/base/buttons/Link'
import CheckIcon from 'src/components/base/icons/check'
import TransportAddButton from './TransportAddButton'
import styles from './Reasons.module.css'

const reasons = [
  {
    slug: 'orienter.png',
    title: 'Orienter sans culpabiliser',
    description: (
      <>
        <b>Impact Transport</b> permet à vos visiteurs de calculer l’impact carbone de leur déplacement, directement sur
        votre site internet ou votre application.
        <br />
        <br />
        Les résultats permettent de prendre conscience des ordres de grandeur pour favoriser le recours aux mobilités
        douces, électriques et aux transports en commun.
      </>
    ),
  },
  {
    slug: 'enrichir.png',
    title: 'Enrichir vos contenus avec un outil interactif',
    description: (
      <>
        Plus qu’une simple infographie, Impact transport permet de saisir une distance ou un trajet pour découvrir
        l’impact carbone de plus de 30 modes de déplacements.
        <br />
        <br />
        Ajouter Impact Transport à votre site est un excellent moyen de favoriser l’engagement de vos utilisateurs avec
        votre contenu.
      </>
    ),
  },
  {
    slug: 'animer.svg',
    title: 'Animer une campagne de sensibilisation',
    description: (
      <>
        Proposer une activité rapide, simple et mémorable avec Impact Transport en proposant de calculer par exemple
        l’impact d’un trajet domicile → travail.
        <br />
        <br />
        Si vous cherchez des idées de campagne sur le sujet de l’impact des transports, n’hésitez pas à consulter le{' '}
        <Link href='https://tally.so/r/XxLGeY'>Kit RSE</Link>.
      </>
    ),
  },
]

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

const Reasons = () => {
  return (
    <section className={styles.wrapper}>
      <div>
        <h2 className={styles.title}>
          Pourquoi ajouter <b>Impact Transport</b> sur votre site ?
        </h2>

        {reasons.map((reason, index) => (
          <article key={reason.slug} className={styles.reasonCard}>
            <h3 className={styles.reasonTitle}>
              <span className={styles.reasonId}>{index + 1}</span>
              {reason.title}
            </h3>
            <Image className={styles.image} width={472} height={200} src={`/images/transport-${reason.slug}`} alt='' />
            <p>{reason.description}</p>
          </article>
        ))}

        <blockquote className={styles.quote}>
          <p>“ Un très bon outil pédagogique pour d'abord faire prendre conscience et ensuite orienter. “</p>
          <footer>
            <strong>Paul Goumetaud</strong> - Chef de projet RSE
            <br />
            <Link href='https://www.terrabotanica.fr/acces'>Impact Transport sur le site de Terra Botanica</Link>
          </footer>
        </blockquote>
      </div>

      <aside className={styles.rightColumn}>
        <div className={styles.stickyPanel}>
          <h3 className={styles.featuresTitle}>Fonctionnalites</h3>
          <ul className={styles.featuresList}>
            {features.map((feature) => (
              <li key={feature} className={styles.featureItem}>
                <CheckIcon />
                {feature}
              </li>
            ))}
          </ul>
          <div className={styles.addButtonContainer}>
            <TransportAddButton />
          </div>
        </div>
      </aside>
    </section>
  )
}

export default Reasons
