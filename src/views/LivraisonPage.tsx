import { Suspense } from 'react'
import { Category as CategoryType } from 'types/category'
import { categories } from 'data/categories'
import Category from 'components/outils/Category'
import styles from 'components/outils/CategoryPage.module.css'
import SimulatorsCards from 'components/outils/SimulatorsCards'
import LivraisonEtiquettes from 'components/outils/livraison/LivraisonEtiquettes'
import LivraisonSimulator from 'components/outils/livraison/LivraisonSimulator'
import Sources from 'components/base/Sources'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import Examples from 'components/examples/Examples'
import FAQs from 'components/faq/FAQs'
import Block from 'components/layout/Block'

const livraison = categories.find((category) => category.slug === 'livraison') as CategoryType

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
      <Block title={livraison.name} as='h1' description={livraison.description}>
        <SimulatorsCards
          tracking='Livraison'
          title='Le simulateur'
          subTitle='Comparer les scénarios d’achat d’une sélection de 10 objets et ajuster la distance parcourue.'
          extraTitle='Les étiquettes'
          extraSubTitle='Proposer une lecture rapide des ordres de grandeur des différents scénarios d’achat.'
          extraLink='#etiquettes'
        />
      </Block>
      <Block
        id='simulateur'
        title='Simulateur'
        description='Un format complet à intégrer dans vos contenus sur le thème de la livraison'>
        <Category category={livraison} simulator={<LivraisonSimulator />} />
        {livraison.sources && (
          <Sources className={styles.sources} sources={livraison.sources} tracking={livraison.name} />
        )}
      </Block>
      <Block
        id='etiquettes'
        title='Étiquettes'
        description='Un plus petit format, facile à intégrer dans un parcours d’achat'>
        <LivraisonEtiquettes />
      </Block>
      <Suspense>
        <Examples
          title='Exemples'
          description={livraison.examples || 'Ils utilisent nos outils à la perfection.'}
          filter={livraison.name}
          tool={livraison.tool}
        />
        <Suspense />
        <FAQs filter={livraison.name} page={livraison.name} />
      </Suspense>
    </>
  )
}

export default LivraisonPage
