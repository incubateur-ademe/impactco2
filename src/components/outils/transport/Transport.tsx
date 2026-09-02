import { Suspense } from 'react'
import { Category as CategoryType } from 'types/category'
import CheckRoundIcon from 'src/components/base/icons/check-round'
import Breadcrumbs from 'src/components/breadcrumbs/Breadcrumbs'
import { ToolCardProps } from 'src/components/cards/ToolCard'
import ToolCards from 'src/components/cards/ToolCards'
import { devTools, sensibilisationTools, tools } from 'src/components/cards/tools'
import FAQs from 'src/components/faq/FAQs'
import Block from 'src/components/layout/Block'
import Category from '../Category'
import Exemples from './Exemples'
import Reasons from './Reasons'
import TransportAddButton from './TransportAddButton'
import TransportSimulator from './TransportSimulator'
import styles from './Transport.module.css'

const apiTool = devTools.find((tool) => tool.slug === 'api') as ToolCardProps
const teletravailTool = tools.find((tool) => tool.slug === 'teletravail') as ToolCardProps
const rseTool = sensibilisationTools.find((tool) => tool.slug === 'rse') as ToolCardProps
const quizTool = sensibilisationTools.find((tool) => tool.slug === 'quiz') as ToolCardProps

const Transport = ({ category }: { category: CategoryType }) => {
  return (
    <>
      <Breadcrumbs
        current={category.name}
        links={[
          { label: 'Accueil', link: '/' },
          { label: 'Les outils', link: '/outils' },
        ]}
      />
      <Block title={category.name} as='h1' description={category.description} center>
        <TransportAddButton />
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <CheckRoundIcon />
            <p className={styles.listItemTitle}>Orienter sans culpabiliser</p>
            <p>Aider vos utilisateurs à faire des choix éclairés</p>
          </li>
          <li className={styles.listItem}>
            <CheckRoundIcon />
            <p className={styles.listItemTitle}>Données ADEME</p>
            <p>Renforcer votre crédibilité avec des données publiques</p>
          </li>
          <li className={styles.listItem}>
            <CheckRoundIcon />
            <p className={styles.listItemTitle}>Gratuit et simple à ajouter</p>
            <p>Valoriser votre engagement en toute facilité</p>
          </li>
        </ul>
      </Block>
      <Block>
        <Category category={category} simulator={<TransportSimulator onWebsite />} noBottomBorders />
      </Block>
      <Block>
        <Exemples />
      </Block>
      <Block>
        <Reasons />
      </Block>
      <Suspense>
        <FAQs filter={category.name} page={category.name} />
      </Suspense>
      <Block title='Les données' description='Ré-utiliser les données présentes dans cet outil'>
        <ToolCards
          tools={[
            { ...apiTool, horizontal: true },
            {
              horizontal: true,
              title: 'Télécharger la liste des équivalents',
              description: 'L’impact carbone de nos 300+ objets et gestes dans un simple tableau.',
              slug: 'csv',
              link: '/equivalents.csv',
              linkLabel: 'Télécharger (.CSV | 53KB)',
            },
          ]}
        />
      </Block>
      <Block title='Outils à découvrir' description='Ces outils peuvent également vous intéresser'>
        <ToolCards tools={[teletravailTool, rseTool, quizTool]} />
      </Block>
    </>
  )
}

export default Transport
