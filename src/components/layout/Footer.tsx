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
              <div className={styles.linkContainer}>
                <Link href='/stats'>Statistiques</Link>
                <Link href='/budget'>Budget</Link>
                <Link href='/plan-du-site'>Plan du site</Link>
                <Link href='/rendez-vous?fromLabel=footer'>Nous contacter</Link>
              </div>
            </div>
            <div>
              <div className={styles.linkTitle}>RESSOURCES</div>
              <div className={styles.linkContainer}>
                <Link href='/doc/guide-utilisation'>Guide d’utilisation</Link>
                <Link href='/doc/questions-frequentes'>Questions fréquentes</Link>
                <Link href='/doc/exemples'>Galerie des exemples</Link>
                <Link href='https://github.com/incubateur-ademe/impactco2'>Code source</Link>
                <Link href='/doc/api'>API</Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottomLinks}>
          <Link className={styles.bottomLink} href='/mentions-legales'>
            Mentions légales
          </Link>
          <Link className={styles.bottomLink} href='/politique-de-confidentialite'>
            Confidentialité
          </Link>
          <Link className={styles.bottomLink} href='/accessibilite'>
            Accessibilité : non conforme
          </Link>
          <Link
            className={styles.bottomLink}
            href='https://agirpourlatransition.ademe.fr'
            target='_blank'
            rel='noreferrer noopener'>
            Agir pour la transition
          </Link>
          <Link className={styles.bottomLink} href='https://beta.gouv.fr/' target='_blank' rel='noreferrer noopener'>
            beta.gouv.fr
          </Link>
        </div>
      </div>
    </footer>
  )
}
