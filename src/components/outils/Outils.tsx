import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import News from 'components/cards/News'
import ToolCards from 'components/cards/ToolCards'
import { devTools, sensibilisationTools, smallTools, tools } from 'components/cards/tools'
import FAQs from 'components/faq/FAQs'
import Equivalents from 'components/home/Equivalents'
import Block from 'components/layout/Block'

const Outils = () => {
  return (
    <>
      <Breadcrumbs current='Les outils' links={[{ label: 'Accueil', link: '/' }]} />
      <Block title='Les outils' as='h1' description='Trouver l’outil adapté à votre prochaine publication.' />
      <News tools={[]} />
      <Block title='Pour animer votre communauté' description='Les outils pour créer des campagnes de sensibilisation'>
        <ToolCards
          tools={[
            ...sensibilisationTools,
            {
              slug: 'ngc',
              title: 'Nos Gestes Climat',
              description: 'Lancer une campagne de sensibilisation Nos Gestes Climat au sein de votre organisation',
              linkLabel: 'Découvrir',
              link: 'https://nosgestesclimat.fr/?utm_source=relais_ico2&utm_medium=link&utm_campaign=integration',
            },
          ]}
        />
      </Block>
      <Block
        title='Outils thématiques'
        description='Notre collection de simulateurs, contenus et infographies thématiques'>
        <ToolCards tools={tools} />
      </Block>
      <Block
        title='Petits formats'
        description='Nos widgets, modules et autres formats miniatures à intégrer à vos contenus'>
        <ToolCards
          tools={[
            ...smallTools,
            {
              slug: 'osez-changer',
              title: 'Défi chaussures',
              description: 'Compter vos chaussures et évaluer l’impact carbone de vos derniers achats',
              linkLabel: 'Découvrir',
              link: '/outils/habillement#osez-changer',
            },
          ]}
        />
      </Block>
      <Block title='Pour les développeurs' description='Des outils spécifiques pour des usages avancés'>
        <ToolCards tools={devTools} />
      </Block>
      <Equivalents />
      <FAQs filter='Catalogue outils' page='Outils' />
    </>
  )
}

export default Outils
