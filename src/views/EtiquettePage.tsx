import { Suspense } from 'react'
import AddButton from '../components/outils/AddButton'
import Advantages from '../components/outils/Advantages'
import Exemples from '../components/outils/Exemples'
import Reasons from '../components/outils/Reasons'
import Etiquettes from 'src/components/outils/etiquettes/Etiquettes'
import Breadcrumbs from 'src/components/breadcrumbs/Breadcrumbs'
import { ToolCardProps } from 'src/components/cards/ToolCard'
import ToolCards from 'src/components/cards/ToolCards'
import { devTools, sensibilisationTools, tools } from 'src/components/cards/tools'
import FAQs from 'src/components/faq/FAQs'
import Block from 'src/components/layout/Block'

const apiTool = devTools.find((tool) => tool.slug === 'api') as ToolCardProps
const alimentationTool = tools.find((tool) => tool.slug === 'alimentation') as ToolCardProps
const repasTool = tools.find((tool) => tool.slug === 'repas') as ToolCardProps
const quizTool = sensibilisationTools.find((tool) => tool.slug === 'quiz') as ToolCardProps

const reasons = [
  {
    slug: 'etiquettes-orienter.png',
    title: 'Faites parler vos données carbone',
    description: (
      <>
        Votre service fait faire des économies de CO2 à vos clients ?
        <br />
        Sur votre application ou sur votre site, l’étiquette rend concrets ces chiffres souvent abstraits.
        <br />
        <br />
        En transformant des quantités de CO₂e en équivalents du quotidien, elle donne à votre public des repères
        immédiats et accessibles.
      </>
    ),
  },
  {
    slug: 'etiquettes-renforcer.png',
    title: 'Renforcez l’engagement de votre audience',
    description: (
      <>
        Intégrer l’étiquette carbone à vos contenus, c’est offrir à vos utilisateurs une{' '}
        <b>clé de compréhension simple et visuelle</b> pour décrypter l’impact carbone.
        <br />
        <br />
        En répondant directement à leur besoin de concret, vous captez leur attention et favorisez une prise de
        conscience active.
      </>
    ),
  },
  {
    slug: 'etiquettes-gagner.png',
    title: 'Gagnez en transparence et en crédibilité',
    description: (
      <>
        Avec l’étiquette carbone, vulgarisation rime avec rigueur : choisissez parmi <b>plus de 300 équivalents</b>{' '}
        illustrés, fiables et pédagogiques.
        <br />
        <br />
        Nos équivalents sont issus de <b>données 100% ADEME</b>.
      </>
    ),
  },
]

const EtiquettePage = () => {
  return (
    <>
      <Breadcrumbs
        current='Étiquettes'
        links={[
          { label: 'Accueil', link: '/' },
          { label: 'Les outils', link: '/outils' },
        ]}
      />
      <Block
        title='Étiquettes'
        as='h1'
        description='Créer votre étiquette pour illustrer les quantités de kg de CO₂e directement sur votre site ou votre application'
        center>
        <AddButton slug='etiquette' name='Étiquette' />
        <Advantages />
      </Block>
      <Block>
        <Etiquettes />
      </Block>
      <Block>
        <Exemples
          title="Ils ont ajouté l'Étiquette :"
          items={[
            { src: '/images/geovelo.png', alt: 'Logo de Geovelo' },
            { src: '/images/nolt.png', alt: 'Logo de Nolt' },
            { src: '/images/gobi.png', alt: 'Logo de Gobi' },
            { src: '/images/javry.png', alt: 'Logo de Javry' },
          ]}
          tool='Étiquette'
        />
      </Block>
      <Block>
        <Reasons
          slug='etiquette'
          name='Étiquette'
          title={
            <>
              l'<b>Étiquette</b>
            </>
          }
          reasons={reasons}
        />
      </Block>
      <Suspense>
        <FAQs filter='Comparateur' page='Comparateur' />
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
        <ToolCards tools={[alimentationTool, repasTool, quizTool]} />
      </Block>
    </>
  )
}

export default EtiquettePage
