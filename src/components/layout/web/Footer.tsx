import Link from 'next/link'
import { Section, SectionWideContent } from 'components/base/Section'
import Signature from 'components/screenshot/Signature'
import styles from './Footer.module.css'

const getOpenIcon = () => {
  return (
    <svg
      className={styles.openLink}
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2'
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <div className={styles.wrapper} id='footer'>
      <Section $withoutPadding>
        <SectionWideContent>
          <div className={styles.grid}>
            <div className={styles.gridOne}>
              <div className={styles.gridOneA}>
                <div className={styles.logos}>
                  <Signature noMargin noLink color='var(--primary-70)' />
                </div>
              </div>
              <div className={styles.gridOneB}>
                <div className={styles.footerExplain}>
                  <strong>
                    Impact CO<sub>2</sub>
                  </strong>
                  <p>Le site de ressources qui vulgarise et valorise les données environnementales de l'ADEME</p>
                  <div className={styles.followNews}>
                    <Link
                      href='https://fr.linkedin.com/showcase/accelerateurdelatransitionecologique-ademe/'
                      title='LinkedIn'
                      rel='noreferrer noopener'
                      target='_blank'>
                      Suivre nos actualités sur LinkedIn
                    </Link>
                    {getOpenIcon()}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.gridTwo}>
              <div className={styles.gridTwoA}>
                <div>
                  <div>
                    <strong>Liens utiles</strong>
                  </div>
                  <div className={styles.linkContainer}>
                    <Link href='/stats' title='Statistiques'>
                      Statistiques
                    </Link>
                    <Link
                      href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                      target='_blank'
                      rel='noreferrer noopener'
                      title='Nous contacter'>
                      Nous contacter
                    </Link>
                  </div>
                </div>
              </div>
              <div className={styles.gridTwoB}>
                <div>
                  <div>
                    <strong>Ressources</strong>
                  </div>
                  <div className={styles.linkContainer}>
                    <Link
                      href='https://accelerateur-transition-ecologique-ademe.notion.site/Kit-de-diffusion-Impact-CO2-b9d08930a49a4346830b7a12fd7cb733?pvs=4'
                      title='Kit de diffusion'
                      rel='noreferrer noopener'
                      target='_blank'>
                      Kit de diffusion
                    </Link>
                    <Link href='/api-doc' title='API Impact CO2'>
                      API Impact CO2
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.gridlinks}>
            <div className={styles.footerLink}>
              <Link className={styles.first} href='/plan-du-site' title='Plan du site'>
                Plan du site
              </Link>
            </div>
            <div className={styles.footerLink}>
              <Link href='/mentions-legales' title='Mentions légales'>
                Mentions légales
              </Link>
            </div>
            <div className={styles.footerLink}>
              <Link href='/politique-de-confidentialite' title='Politique de confidentialité'>
                Politique de confidentialité
              </Link>
            </div>
            <div className={styles.footerLink}>
              <Link href='/accessibilite' title='Accessibilité (non conforme)'>
                Accessibilité : non conforme
              </Link>
            </div>
            <div className={styles.footerLink}>
              <Link className={styles.last} href='https://beta.gouv.fr/' title='beta.gouv.fr' target='_blank'>
                beta.gouv.fr
                {getOpenIcon()}
              </Link>
            </div>
            <div className={styles.footerLink}>
              <Link
                className={`${styles.last} ${styles.githubLink}`}
                href='https://github.com/incubateur-ademe/impactco2'
                title='Code source'
                target='_blank'>
                Code source
                {getOpenIcon()}
              </Link>
            </div>
          </div>
        </SectionWideContent>
      </Section>
    </div>
  )
}
