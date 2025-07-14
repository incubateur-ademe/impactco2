import Image from 'next/image'
import DetecteurPage from 'src/views/DetecteurPage'
import styles from './DetectorInformation.module.css'

const DetectorInformation = () => {
  return (
    <>
      <DetecteurPage />
      <p>
        Le Détecteur CO₂ est un outil innovant conçu pour <b>faciliter la compréhension des données carbone</b> dans les
        contenus en ligne. L’outil identifie <b>automatiquement</b> les mentions de quantités de CO₂ et les rend
        accessibles grâce à des comparaisons parlantes, choisies parmi plus de 250 objets ou gestes du quotidien.
      </p>
      <p>Pour voir le Détecteur en action, vous pouvez cliquer sur : 100 kg CO2e</p>
      <p>
        <b>En fonction du poids identifié</b>, l’algorithme du Détecteur propose une sélection d’équivalents adaptés,
        permettant d’illustrer des quantités carbone aussi bien en grammes de CO2e qu’en millions de tonnes de CO2e.
      </p>
      <p className={styles.title}>Pourquoi utiliser le Détecteur ?</p>
      <ul className={styles.list}>
        <li>
          Pour <b>communiquer les ordres de grandeur du carbone</b>, de l'impact carbone, souvent abstraits pour les
          lecteurs et lectrices
        </li>
        <li>
          Pour <b>sensibiliser les publics aux enjeux carbone</b>, en rendant visible l'impact réel des activités
          humaines à travers leurs émissions.
        </li>
      </ul>
      <p>
        L’outil s’adresse principalement aux <b>médias, entreprises, collectivités</b> ou <b>associations</b> qui
        communiquent régulièrement des données carbone auprès de leur audience. Il a déjà été adopté par plusieurs
        acteurs comme ID, L’Info Durable, La Nouvelle République, Greenly, HomeExchange ou encore Gobi.
      </p>
      <div>
        <Image src='/images/detecteur-co2.png' alt='' width={680} height={208} />
        <div className={styles.legend}>
          <p>Greenly a utilisé le Détecteur pour illustrer les quantités carbone mentionnées dans ses articles</p>
        </div>
      </div>
    </>
  )
}

export default DetectorInformation
