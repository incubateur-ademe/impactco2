import Image from 'next/image'
import DetecteurPage from 'src/views/DetecteurPage'
import Link from 'components/base/buttons/Link'
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
      <p>
        L’outil s’adresse principalement aux <b>médias, entreprises, collectivités</b> ou <b>associations</b> qui
        communiquent régulièrement des données carbone auprès de leur audience. Il a déjà été adopté par plusieurs
        acteurs comme{' '}
        <Link
          href='https://www.franceinfo.fr/environnement/transparence-comment-se-representer-les-emissions-de-co2-franceinfo-integre-le-comparateur-carbone-de-l-ademe-dans-ses-articles_7736326.html'
          target='_blank'
          rel='noreferrer noopener'>
          Franceinfo
        </Link>
        ,{' '}
        <Link
          href='https://www.linfodurable.fr/climat/detecteur-carbone-id-linfo-durable-premier-media-se-doter-du-nouvel-outil-de-lademe-44711'
          target='_blank'
          rel='noreferrer noopener'>
          ID, L’Info Durable
        </Link>
        ,{' '}
        <Link
          href='https://www.lanouvellerepublique.fr/a-la-une/les-emissions-de-gaz-a-effet-de-serre-baissent-en-france'
          target='_blank'
          rel='noreferrer noopener'>
          La Nouvelle République
        </Link>
        ,{' '}
        <Link
          href='https://greenly.earth/blog/secteurs/empreinte-carbone-vol-en-avion'
          target='_blank'
          rel='noreferrer noopener'>
          Greenly
        </Link>
        ou encore{' '}
        <Link href='https://www.homeexchange.fr/blog/bilan-carbone-2022/' target='_blank' rel='noreferrer noopener'>
          HomeExchange
        </Link>{' '}
        .
      </p>
      <div className={styles.imageContainer}>
        <Image src='/images/detecteur-co2.webp' alt='' width={680} height={208} />
        <div className={styles.legend}>
          <p>
            Franceinfo utilise le Détecteur pour illustrer les quantités carbone dans ses articles de la rubrique
            Environnement.
          </p>
        </div>
      </div>
    </>
  )
}

export default DetectorInformation
