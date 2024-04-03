import React from 'react'
import Link from 'components/base/buttons/Link'
import ToolCard from 'components/cards/ToolCard'
import ToolCards from 'components/cards/ToolCards'
import Block from 'components/layout/web/Block'
import Email from './Email'
import Equivalents from './Equivalents'
import styles from './Home.module.css'
import MiniCard from './MiniCard'

const Home = () => {
  return (
    <>
      <Block>
        <h1 className={styles.title}>Les bons outils pour communiquer sur l’impact carbone</h1>
        <ToolCards>
          <ToolCard
            image='/images/tools-comparateur.png'
            title='Comparateur'
            description='Le bon outil pour obtenir les bons ordres de grandeur'
            link='/comparateur'
            linkLabel='Visualiser'
          />
          <ToolCard
            image='/images/tools-transports.png'
            title='Transports'
            description='Calculer l’impact carbone des moyens de transport'
            link='/transport'
            linkLabel='Essayer'
          />
          <ToolCard
            image='/images/tools-chauffage.png'
            title='Chauffage'
            description='Situer l’empreinte carbone des modes de chauffage'
            link='/chauffage'
            linkLabel='Calculer'
          />
        </ToolCards>
        <div className={styles.link}>
          <Link href='/outils'>Voir tout les outils</Link>
        </div>
      </Block>
      <Block title='Le bon format' description='Pour votre prochain article ou post, votre site ou appli.'>
        <div className={styles.miniCards}>
          <MiniCard image='/images/home-iframe.png' title='Un iframe' description='dans votre article' />
          <MiniCard image='/images/home-image.png' title='Une image' description='dans votre post' />
          <MiniCard image='/images/home-link.png' title='Un lien' description='sur votre site web' />
          <MiniCard image='/images/home-api.png' title='Une API' description='pour votre appli' />
        </div>
      </Block>
      <Block
        title='L’accompagnement sur mesure'
        description='L’équipe vous aide à intégrer les outils adaptés à vos besoins, gratuitement.'>
        <Email />
      </Block>
      <Block
        title='Les fiches'
        description='Parcourir les fiches dédiées à l’impact carbone de plus de 150 objets et gestes courants.'>
        <Equivalents />
      </Block>
      <Block
        title='Exemples'
        description='Ils utilisent nos outils à la perfection.'
        link='/exemples'
        linkLabel='Tous les exemples'>
        TODO
      </Block>
      <Block>TODO FAQ</Block>
      <Block
        title='À découvrir'
        description="Vous souhaitez mobiliser votre communauté autour de l'empreinte carbone ?">
        <ToolCard
          horizontal
          image='/images/ngc.png'
          title='Nos gestes climats'
          description='Calculez votre empreinte carbone citoyenne et faites le bilan en équipe'
          link='https://nosgestesclimat.fr'
          linkLabel='Visitez le site'
        />
      </Block>
    </>
  )
}

export default Home
