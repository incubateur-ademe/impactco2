import Image from 'next/image'
import { Suspense } from 'react'
import { Category as CategoryType } from 'types/category'
import { categories } from 'data/categories'
import AddButton from '../components/outils/AddButton'
import Advantages from '../components/outils/Advantages'
import Exemples from '../components/outils/Exemples'
import Reasons from '../components/outils/Reasons'
import Livraisons from 'src/components/outils/livraison/Livraisons'
import Breadcrumbs from 'src/components/breadcrumbs/Breadcrumbs'
import { ToolCardProps } from 'src/components/cards/ToolCard'
import ToolCards from 'src/components/cards/ToolCards'
import { sensibilisationTools, tools } from 'src/components/cards/tools'
import FAQs from 'src/components/faq/FAQs'
import Block from 'src/components/layout/Block'

const livraison = categories.find((category) => category.slug === 'livraison') as CategoryType

const alimentationTool = tools.find((tool) => tool.slug === 'alimentation') as ToolCardProps
const repasTool = tools.find((tool) => tool.slug === 'repas') as ToolCardProps
const quizTool = sensibilisationTools.find((tool) => tool.slug === 'quiz') as ToolCardProps

const reasons = [
  {
    slug: 'livraison-rendre.svg',
    title: 'Rendre visible l’impact carbone des livraisons',
    description: (
      <>
        <b>L’étiquette livraison</b> permet à vos clients de comparer en un clin d’œil l’impact carbone moyen des
        différents modes de livraison, directement dans votre parcours d’achat.
        <br />
        <br />
        Elle s’intègre facilement dans un parcours d’achat d’un site e-commerce, comme le montre leur présence sur les
        sites de La Redoute et EasyCash.
      </>
    ),
  },
  {
    slug: 'livraison-guider.svg',
    title: 'Guider vos clients vers des choix éclairés',
    description: (
      <>
        Intégrer l’étiquette livraison, c’est{' '}
        <b>mettre en lumière les ordres de grandeur de l’impact carbone au moment de la décision</b>, pour une prise de
        conscience immédiate.
        <br />
        <br />
        En encourageant le recours aux les modes de livraison les plus écologiques, vous améliorez le scope 3 de votre
        bilan carbone.
        <br />
        <br />
        <Image src='/images/livraison-guider-end.svg' alt='' width={408} height={685} />
      </>
    ),
  },
  {
    slug: 'livraison-valoriser.svg',
    title: 'Valoriser votre engagement',
    description: (
      <>
        Nos données <b>100% ADEME</b> permettent d’offrir à vos clients une information transparente, actionnable afin
        de renforcer la crédibilité de votre engagement environnemental.
      </>
    ),
  },
]

const LivraisonPage = () => {
  return (
    <>
      <Breadcrumbs
        current={livraison.name}
        links={[
          { label: 'Accueil', link: '/' },
          { label: 'Les outils', link: '/outils' },
        ]}
      />
      <Block title={livraison.name} as='h1' description={livraison.description} center>
        <AddButton slug='livraison' name='Livraison' />
        <Advantages />
      </Block>
      <Block>
        <Livraisons />
      </Block>
      <Block>
        <Exemples
          title='Ils ont ajouté Impact Livraison :'
          items={[
            { src: '/images/easycash.png', alt: 'Logo Easycash' },
            { src: '/images/laredoute.png', alt: 'Logo La Redoute' },
            { src: '/images/ouestfrance.png', alt: 'Logo Ouest France' },
            { src: '/images/franceinfo-grey.png', alt: 'Logo France Info' },
          ]}
          tool='Impact Livraison'
        />
      </Block>
      <Block>
        <Reasons slug='livraison' name='Livraison' title={<b>Impact Livraison</b>} reasons={reasons} />
      </Block>
      <Suspense>
        <FAQs filter={livraison.name} page={livraison.name} />
      </Suspense>
      <Block title='Outils à découvrir' description='Ces outils peuvent également vous intéresser'>
        <ToolCards tools={[alimentationTool, repasTool, quizTool]} />
      </Block>
    </>
  )
}

export default LivraisonPage
