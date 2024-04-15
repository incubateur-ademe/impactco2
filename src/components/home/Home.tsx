import React from 'react'
import Link from 'components/base/buttons/Link'
import ToolCard from 'components/cards/ToolCard'
import ToolCards from 'components/cards/ToolCards'
import { tools } from 'components/cards/tools'
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
        <ToolCards tools={tools.slice(0, 3)} />
        <div className={styles.link}>
          <Link href='/outils'>Voir tous les outils</Link>
        </div>
      </Block>
      <Block title='Le bon format' description='Pour votre prochain article ou post, votre site ou appli.'>
        <div className={styles.miniCards}>
          <MiniCard image='/images/home-iframe.svg' title='Un iframe' description='dans votre article' />
          <MiniCard image='/images/home-image.svg' title='Une image' description='dans votre post' />
          <MiniCard image='/images/home-link.svg' title='Un lien' description='sur votre site web' />
          <MiniCard image='/images/home-api.svg' title='Une API' description='pour votre appli' />
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
          slug='ngc'
          image='/images/ngc.png'
          title='Nos gestes climats'
          description='Calculez votre empreinte carbone citoyenne et faites le bilan en équipe'
          linkLabel='Visitez le site'
        />
      </Block>
    </>
  )
}

export default Home
