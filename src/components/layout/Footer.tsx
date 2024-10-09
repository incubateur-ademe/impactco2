import Ademe from 'components/base/Logo/Ademe'
import Logo from 'components/base/Logo/ImpactCO2'
import Marianne from 'components/base/Logo/Marianne'
import Link from 'components/base/buttons/Link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer} id='footer'>
      <div className={styles.header} />
      <div className={styles.logos}>
        <Marianne />
        <Ademe />
      </div>
      <div className='main-container'>
        <div className={styles.internalContainer}>
          <div className={styles.footerExplain}>
            <Logo />
            <div className='text-sm'>
              Le site de ressources qui vulgarise et valorise les données environnementales de l'ADEME.
            </div>
            <Link
              prefetch={false}
              className={styles.followNews}
              href='https://fr.linkedin.com/showcase/accelerateurdelatransitionecologique-ademe/'
              title='LinkedIn'
              rel='noreferrer noopener'
              target='_blank'>
              Suivre nos actualités sur LinkedIn
            </Link>
          </div>
          <div className={styles.topLinks}>
            <div>
              <div className={styles.linkTitle}>LIENS UTILES</div>
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
              </ul>
            </div>
            <div>
              <div className={styles.linkTitle}>RESSOURCES</div>
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
              Accessibilité : non conforme
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
          <li className={styles.bottomLink}>
            <Link prefetch={false} href='https://beta.gouv.fr/' target='_blank' rel='noreferrer noopener'>
              beta.gouv.fr
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
