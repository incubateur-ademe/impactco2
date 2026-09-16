import Image from 'next/image'
import Link from 'src/components/base/buttons/Link'
import CheckIcon from 'src/components/base/icons/check'
import styles from './KitRSE.module.css'

const KitRSE = () => {
  return (
    <>
      <Image className={styles.image} src='/images/banner-kit-rse.png' width={720} height={320} alt='' />
      <div className={styles.header}>
        <h2>
          Votre <b>année RSE</b>
          <br />
          avec l'ADEME
        </h2>
        <p>
          EDITION <b>2026</b>
        </p>
        <Link asButton href='/outils/kit-rse/calendrier' className={styles.button}>
          Obtenir le Kit RSE
        </Link>
      </div>
      <p>
        Vous êtes en charge <b>des sujets RSE/RSO</b> dans votre organisation ? Vous souhaitez mobiliser vos
        collaborateurs et collaboratrices sur des événements en lien avec l’environnement ?
      </p>
      <ul className={styles.advantages}>
        <li className={styles.advantage}>
          <Image src='/images/kit-rse-com.svg' width={224} height={140} alt='' />
          <p>
            <CheckIcon />9 kits de com'
          </p>
        </li>
        <li className={styles.advantage}>
          <Image src='/images/kit-rse-copier.svg' width={224} height={140} alt='' />
          <p>
            <CheckIcon />
            Prêt à l’emploi
          </p>
        </li>
        <li className={styles.advantage}>
          <Image src='/images/kit-rse-gift.svg' width={224} height={140} alt='' />
          <p>
            <CheckIcon />
            100% simple et gratuit
          </p>
        </li>
      </ul>
      <p>
        <b>L’ADEME</b> met à votre disposition <b>9 kits de communication</b> pour passer à l’action de façon concrète
        et conviviale. Découvrez un contenu prêt à l’emploi (messages-types, visuels, challenges, simulateurs
        interactifs, chiffres clés, etc.) à adapter selon votre contexte.
      </p>
      <h2>Pourquoi utiliser le Kit RSE ?</h2>
      <p>Le Kit RSE est fait pour vous, si vous souhaitez :</p>
      <ul className={styles.list}>
        <li>
          <b>Participer à la sensibilisation</b> aux enjeux de la transition écologique.
        </li>
        <li>
          <b>Créer une dynamique positive</b> en équipe autour d’objectifs communs.
        </li>
        <li>
          <b>Renforcer l’engagement</b> de votre organisation grâce à des supports adaptés.
        </li>
      </ul>
      <p>
        Le Kit RSE de l’ADEME a déjà été adopté par de nombreux acteurs comme <b>Vyv3</b>, <b>Axa</b>,{' '}
        <b>Croix Rouge</b>, <b>Les Restos du Cœur</b> ou <b>Orange Sud Ouest</b>.
      </p>
      <ul className={styles.exemples}>
        <li className={styles.exemple}>
          <Image src='/images/Orange.png' width={160} height={176} alt='' />
          <p>
            <b>Orange Sud Ouest</b> a également utilisé le Kit RSE pour sensibiliser ses salariés lors de la semaine
            européenne de la mobilité
          </p>
        </li>
        <li className={styles.exemple}>
          <Image src='/images/Axa.png' width={160} height={176} alt='' />
          <p>
            <b>AXA</b> a diffusé le kit lors d'un webinaire auprès de sa communauté d'ambassadeurs RSE
          </p>
        </li>
        <li className={styles.exemple}>
          <Image src='/images/vyv.png' width={160} height={176} alt='' />
          <p>
            <b>Vyv3</b> a utilisé le kit RSE pour mobiliser ses 36 000 salariés autour de la journée mondiale de
            l'environnement
          </p>
        </li>
      </ul>
    </>
  )
}

export default KitRSE
