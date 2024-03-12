import Link from 'next/link'
import { Section } from 'components/base/Section'
import { Icon } from 'components/osezchanger/icons'
import Signature from 'components/screenshot/Signature'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer>
      <Section $withoutPadding id='footer'>
        <div className={styles.internalContainer}>
          <Signature noMargin noLink />
          <div className={styles.footerExplain}>
            <strong>
              Impact CO<sub>2</sub>
            </strong>
            <p className={styles.neutral50}>
              Le site de ressources qui vulgarise et valorise les données environnementales de l'ADEME.
            </p>
            <Link
              className={styles.followNews}
              href='https://fr.linkedin.com/showcase/accelerateurdelatransitionecologique-ademe/'
              title='LinkedIn'
              rel='noreferrer noopener'
              target='_blank'>
              Suivre nos actualités sur LinkedIn
              <Icon iconId={'open'} />
            </Link>
          </div>
          <div className={styles.topLinks}>
            <div>
              <strong>Liens utiles</strong>
              <div className={styles.linkContainer}>
                <Link href='/stats'>Statistiques</Link>
                <Link href='/rendez-vous?fromLabel=frooter'>Nous contacter</Link>
              </div>
            </div>
            <div>
              <strong>Ressources</strong>
              <div className={styles.linkContainer}>
                <Link href='/guide-utilisation'>Guide d’utilisation</Link>
                <Link href='/questions-frequentes'>Questions fréquentes</Link>
                <Link href='/api-doc'>API Impact CO2</Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottomLinks}>
          <Link className={styles.bottomLink} href='/plan-du-site'>
            Plan du site
          </Link>
          <Link className={styles.bottomLink} href='/mentions-legales'>
            Mentions légales
          </Link>
          <Link className={styles.bottomLink} href='/politique-de-confidentialite'>
            Politique de confidentialité
          </Link>
          <Link className={styles.bottomLink} href='/accessibilite'>
            Accessibilité : non conforme
          </Link>
          <Link
            className={styles.bottomLink}
            href='https://github.com/incubateur-ademe/impactco2'
            target='_blank'
            rel='noreferrer noopener'>
            Code source
            <Icon iconId={'open'} />
          </Link>
          <Link
            className={styles.bottomLink}
            href='https://agirpourlatransition.ademe.fr'
            target='_blank'
            rel='noreferrer noopener'>
            Agir pour la transition
            <Icon iconId={'open'} />
          </Link>
          <Link className={styles.bottomLink} href='https://beta.gouv.fr/' target='_blank' rel='noreferrer noopener'>
            beta.gouv.fr
            <Icon iconId={'open'} />
          </Link>
        </div>
      </Section>
    </footer>
  )
}
