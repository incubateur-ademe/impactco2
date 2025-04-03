import Image from 'next/image'
import { Suspense } from 'react'
import Link from 'components/base/buttons/Link'
import FullArrowRightIcon from 'components/base/icons/full-arrow-right'
import ToolCards from 'components/cards/ToolCards'
import { tools } from 'components/cards/tools'
import FAQs from 'components/faq/FAQs'
import Block from 'components/layout/Block'
import Equivalents from './Equivalents'
import styles from './Home.module.css'
import Quotes from './Quotes'

const Home = () => {
  return (
    <>
      <Block>
        <h1 className={styles.title}>Les bons outils pour communiquer sur l’impact carbone</h1>
        <p className={styles.subTitle}>
          Développés pour <b>les entreprises</b>, <b>les associations</b>, <b>les médias</b> et <b>les collectivités</b>
          , nos outils s’ajoutent à vos sites et applications en quelques clics. 100% gratuit.{' '}
        </p>
        <Link asButton href='/rendez-vous?fromLabel=home' className={styles.button}>
          Prendre rendez-vous
        </Link>
        <Image className={styles.banner} src='/images/banner-home.jpg' width={832} height={348} alt='' />
        <Image className={styles.bannerMobile} src='/images/banner-home-mobile.jpg' width={333} height={348} alt='' />
      </Block>
      <Block>
        <Quotes />
      </Block>
      <Block title='Un enjeu, un outil'>
        <div className={styles.blockHeader}>
          <p>
            Nous avons développé <b>un ensemble d’outils de sensibilisation fiables</b> et <b>faciles à utiliser</b>,
            pour vous éviter d’avoir à le faire vous-même.
          </p>
          <Link href='/outils' className={styles.link}>
            Tous les outils
          </Link>
        </div>
        <ToolCards
          tools={[
            tools.find((tool) => tool.slug === 'livraison'),
            tools.find((tool) => tool.slug === 'transport'),
            tools.find((tool) => tool.slug === 'comparateur'),
          ]}
        />
      </Block>
      <div className={styles.fullBanner}>
        <Link className={styles.card} href='/rendez-vous?fromLabel=home-banner'>
          <div>
            <p>3 millions de citoyens sensibilisés grâce à plus de 200 organisations !</p>
            <p className={styles.bannerLink}>
              PRENDRE RENDEZ-VOUS <FullArrowRightIcon />
            </p>
          </div>
          <Image src='/images/home-icons.png' width={316} height={220} alt='' />
        </Link>
      </div>
      <Block
        title='Les données en accès libre'
        description='Explorer notre bibliothèque de 150+ objets et gestes du quotidien pour enrichir et illustrer vos contenus. 100% données Ademe.'>
        <Equivalents />
      </Block>
      <Suspense>
        <FAQs filter='Accueil' page='Accueil' />
      </Suspense>
    </>
  )
}

export default Home
