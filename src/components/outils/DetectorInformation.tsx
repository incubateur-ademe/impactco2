import Image from 'next/image'
import Link from 'next/link'
import DetecteurPage from 'src/views/DetecteurPage'
import styles from './DetectorInformation.module.css'

const DetectorInformation = () => {
  return (
    <>
      <DetecteurPage />
      <p>
        Le Détecteur CO₂ est un outil qui identifie <b>automatiquement</b> les quantités de CO₂ dans les contenus en
        ligne et les rend plus parlantes grâce à des comparaisons concrètes choisies parmi plus de 250 objets ou gestes
        du quotidien.
      </p>
      <p className={styles.imageContainer}>Pour voir le Détecteur en action, vous pouvez cliquer sur : 100 kg CO2e</p>
      <p>
        <b>En fonction du poids identifié</b>, l’algorithme du Détecteur propose une sélection d’équivalents adaptés,
        permettant d’illustrer des quantités carbone aussi bien en grammes de CO2e qu’en millions de tonnes de CO2e.
      </p>
      <p className={styles.title}>Pourquoi utiliser le Détecteur ?</p>
      <ul className={styles.list}>
        <li>
          Pour faciliter <b>la compréhension des données carbone</b> sur une page web grâce aux bons ordres de grandeur.
        </li>
        <li>
          Pour <b>sensibiliser les publics aux enjeux carbone</b>, en rendant visible l'impact réel des activités
          humaines à travers leurs émissions.
        </li>
      </ul>
      <p>
        L’outil s’adresse principalement aux <b>médias, entreprises, collectivités</b> ou <b>associations</b> qui
        communiquent régulièrement des données carbone auprès de leur audience. Il a déjà été adopté par plusieurs
        acteurs comme{' '}
        <Link
          href='https://www.linfodurable.fr/climat/detecteur-carbone-id-linfo-durable-premier-media-se-doter-du-nouvel-outil-de-lademe-44711'
          target='_blank'
          rel='noreferer noopener'>
          ID, L’Info Durable
        </Link>
        ,{' '}
        <Link
          href='https://www.lanouvellerepublique.fr/a-la-une/les-emissions-de-gaz-a-effet-de-serre-baissent-en-france'
          target='_blank'
          rel='noreferer noopener'>
          La Nouvelle République
        </Link>
        ,{' '}
        <Link
          href='https://greenly.earth/blog/secteurs/empreinte-carbone-vol-en-avion'
          target='_blank'
          rel='noreferer noopener'>
          Greenly
        </Link>
        ,{' '}
        <Link href='https://www.homeexchange.fr/blog/bilan-carbone-2022/' target='_blank' rel='noreferer noopener'>
          HomeExchange
        </Link>{' '}
        ou encore{' '}
        <Link
          href='https://www.gobilab.com/blogs/blog/pourquoi-et-comment-orienter-son-entreprise-vers-le-reutilisable'
          target='_blank'
          rel='noreferer noopener'>
          Gobi
        </Link>
        .
      </p>
      <div>
        <Image src='/images/detecteur-co2.webp' alt='' width={680} height={208} />
        <div className={styles.legend}>
          <p>Greenly a utilisé le Détecteur pour illustrer les quantités carbone dans ses articles de blog.</p>
        </div>
      </div>
    </>
  )
}

export default DetectorInformation
