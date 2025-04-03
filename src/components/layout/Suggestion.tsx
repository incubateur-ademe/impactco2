import Image from 'next/image'
import Link from 'components/base/buttons/Link'
import FullArrowRightIcon from 'components/base/icons/full-arrow-right'
import styles from './Suggestion.module.css'

const Suggestion = ({ fromLabel, simulatorName }: { fromLabel: string; simulatorName: string }) => {
  return (
    <>
      <div className={styles.banner}>
        <div className={styles.content}>
          <h2>Sensibilisez votre communauté à l'impact carbone</h2>
          <p className={styles.description}>
            Tirez le meilleur parti des outils d’Impact CO2 dès maintenant grâce aux conseils de notre équipe !
          </p>
          <Link asButton href={`/rendez-vous?fromLabel=${fromLabel}`}>
            Prendre rendez-vous
            <FullArrowRightIcon />
          </Link>
        </div>
        <Image src='/images/banner-home-footer.jpg' width={422} height={354} alt='' className={styles.image} />
      </div>
      <div className={styles.container}>
        <div className='main-container'>
          <div className={styles.card}>
            <div>
              <h2 className='title-h6'>Un avis, une suggestion ?</h2>
              <p>Vos retours sont précieux pour améliorer le site Impact CO₂.</p>
            </div>
            <Link asButton href={`/suggestion?fromLabel=${fromLabel}&simulatorName=${simulatorName}`}>
              Faire une suggestion
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Suggestion
