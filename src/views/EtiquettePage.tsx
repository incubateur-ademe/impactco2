import { Suspense } from 'react'
import AddButton from '../components/outils/AddButton'
import Advantages from '../components/outils/Advantages'
import Exemples from '../components/outils/Exemples'
import Reasons from '../components/outils/Reasons'
import Etiquettes from 'src/components/outils/etiquettes/Etiquettes'
import Link from 'src/components/base/buttons/Link'
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
    slug: 'transport-orienter.png',
    title: 'Faites parler vos données carbone',
    description: (
      <>
        <b>Impact Transport</b> permet à vos visiteurs de calculer l’impact carbone de leur déplacement, directement sur
        votre site internet ou votre application.
        <br />
        <br />
        Les résultats permettent de prendre conscience des ordres de grandeur pour favoriser le recours aux mobilités
        douces, électriques et aux transports en commun.
      </>
    ),
  },
  {
    slug: 'transport-enrichir.png',
    title: 'Enrichir vos contenus avec un outil interactif',
    description: (
      <>
        Plus qu’une simple infographie, Impact transport permet de saisir une distance ou un trajet pour découvrir
        l’impact carbone de plus de 30 modes de déplacements.
        <br />
        <br />
        Ajouter Impact Transport à votre site est un excellent moyen de favoriser l’engagement de vos utilisateurs avec
        votre contenu.
      </>
    ),
  },
  {
    slug: 'transport-animer.svg',
    title: 'Animer une campagne de sensibilisation',
    description: (
      <>
        Proposer une activité rapide, simple et mémorable avec Impact Transport en proposant de calculer par exemple
        l’impact d’un trajet domicile → travail.
        <br />
        <br />
        Si vous cherchez des idées de campagne sur le sujet de l’impact des transports, n’hésitez pas à consulter le{' '}
        <Link href='/outils/kit-rse'>Kit RSE</Link>.
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
            { src: '/images/stadefrance.png', alt: 'Logo du Stade de France' },
            { src: '/images/carnac.png', alt: 'Logo de Carnac' },
            { src: '/images/homeexchange.png', alt: 'Logo de HomeExchange' },
            { src: '/images/franceinfo-grey.png', alt: 'Logo de France Info' },
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
