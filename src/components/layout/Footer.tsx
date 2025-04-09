import Ademe from 'components/base/Logo/Ademe'
import Logo from 'components/base/Logo/ImpactCO2'
import Marianne from 'components/base/Logo/Marianne'
import Link from 'components/base/buttons/Link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer} id='footer' role='contentinfo' tabIndex={-1}>
      <div className={styles.header} />
      <div className={styles.logos}>
        <Marianne />
        <Ademe />
      </div>
      <div className='main-container'>
        <div className={styles.internalContainer}>
          <div className={styles.footerExplain}>
            <Logo />
            <p className='text-sm'>
              Le site de ressources qui vulgarise et valorise les données environnementales de l'ADEME.
            </p>
            <Link
              prefetch={false}
              className={styles.followNews}
              href='https://fr.linkedin.com/showcase/accelerateurdelatransitionecologique-ademe/'
              rel='noreferrer noopener'
              target='_blank'>
              Suivre nos actualités sur LinkedIn
            </Link>
          </div>
          <div className={styles.topLinks}>
            <div>
              <h2 className={styles.linkTitle}>LIENS UTILES</h2>
              <ul className={styles.linkContainer}>
                <li>
                  <Link prefetch={false} href='https://beta.gouv.fr/startups/impact.co2.html'>
                    Qui sommes-nous ?
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href='/stats'>
                    Statistiques
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href='/budget'>
                    Budget
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href='/plan-du-site'>
                    Plan du site
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href='/rendez-vous?fromLabel=footer'>
                    Nous contacter
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href='/eco-conception'>
                    Éco-conception
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href='https://beta.gouv.fr'>
                    beta.gouv.fr
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className={styles.linkTitle}>RESSOURCES</h2>
              <ul className={styles.linkContainer}>
                <li>
                  <Link prefetch={false} href='/doc/guide-utilisation'>
                    Guide d’utilisation
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href='/doc/questions-frequentes'>
                    Questions fréquentes
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href='/doc/exemples'>
                    Galerie des exemples
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href='https://github.com/incubateur-ademe/impactco2'>
                    Code source
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href='/doc/api'>
                    API
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ul className={styles.bottomLinks}>
          <li className={styles.bottomLink}>
            <Link prefetch={false} href='/mentions-legales'>
              Mentions légales
            </Link>
          </li>
          <li className={styles.bottomLink}>
            <Link prefetch={false} href='/politique-de-confidentialite'>
              Confidentialité
            </Link>
          </li>
          <li className={styles.bottomLink}>
            <Link prefetch={false} href='/accessibilite'>
              Accessibilité : partiellement conforme
            </Link>
          </li>
          <li className={styles.bottomLink}>
            <Link
              prefetch={false}
              href='https://agirpourlatransition.ademe.fr'
              target='_blank'
              rel='noreferrer noopener'>
              Agir pour la transition
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
