import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import ToolCard from 'components/cards/ToolCard'
import Block from 'components/layout/Block'
import styles from './Doc.module.css'

const Doc = () => {
  return (
    <>
      <Breadcrumbs current='La doc' links={[{ link: '/', label: 'Accueil' }]} />
      <Block title='La doc' as='h1' description='Un peu de lecture pour vous emparer plus facilement de nos outils.'>
        <ul className={styles.docs}>
          <ToolCard
            slug='guide'
            horizontal
            image='/images/doc-guide.svg'
            title="Guide d'utilisation"
            description='Suivre le guide pour prendre en main les outils d’impact CO₂'
            linkLabel='Accéder'
            link='/doc/guide-utilisation'
          />
          <ToolCard
            slug='faq'
            horizontal
            image='/images/doc-faq.svg'
            title='Questions fréquentes'
            description='Explorer la FAQ pour trouver les réponses à vos questions'
            linkLabel='Consulter'
            link='/doc/questions-frequentes'
          />
          <ToolCard
            slug='gallery'
            horizontal
            image='/images/doc-gallery.svg'
            title='Exemples d’utilisation'
            description='Pour s’inspirer et découvrir comment nos outils sont utilisés'
            linkLabel='Découvrir'
            link='/doc/exemples'
          />
          <ToolCard
            slug='kit'
            horizontal
            image='/images/doc-kit.svg'
            title='Kit de communication'
            description='Tout ce qu’il faut pour communiquer sur Impact CO₂'
            linkLabel='Consulter'
            link='/doc/kit-communication'
          />
          <ToolCard
            slug='doc-csv'
            horizontal
            title='Liste des équivalents'
            description='L’impact carbone de nos 300+ objets et gestes dans un simple tableau'
            linkLabel='Télécharger (.CSV | 33KB)'
            link='/equivalents.csv'
          />
        </ul>
      </Block>
    </>
  )
}

export default Doc
