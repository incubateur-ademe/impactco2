import { Suspense } from 'react'
import { Category as CategoryType } from 'types/category'
import { categories } from 'data/categories'
import { computedEquivalents } from 'data/categories/computedEquivalents'
import { repas } from 'data/categories/repas'
import AlimentationSimulator from 'components/outils/AlimentationSimulator'
import Category from 'components/outils/Category'
import styles from 'components/outils/CategoryPage.module.css'
import SimulatorsCards from 'components/outils/SimulatorsCards'
import Sources from 'components/base/Sources'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import Examples from 'components/examples/Examples'
import FAQs from 'components/faq/FAQs'
import Block from 'components/layout/Block'

const alimentation = categories.find((category) => category.slug === 'alimentation') as CategoryType

const AlimentationPage = () => {
  return (
    <>
      <Breadcrumbs
        current='Alimentation'
        links={[
          { label: 'Accueil', link: '/' },
          { label: 'Les outils', link: '/outils' },
        ]}
      />
      <Block title='Alimentation' as='h1' description="Comparer l'impact carbone des aliments et repas">
        <SimulatorsCards
          tracking='Alimentation'
          title='Le simulateur alimentation'
          subTitle="Sensibiliser à l'impact carbone des différents aliments, regroupés par catégories et popularité."
          extraTitle='Le graphique repas'
          extraSubTitle="Communiquer sur l'impact sur le climat des différentes familles de repas."
          extraLink='#repas'
        />
      </Block>
      <Block
        id='simulateur'
        title='Simulateur alimentation'
        description="Comparer l'impact cabone de plus de 50 aliments">
        <Category category={alimentation} simulator={<AlimentationSimulator />} />
        {alimentation.sources && (
          <Sources className={styles.sources} sources={alimentation.sources} tracking={alimentation.name} />
        )}
      </Block>
      <Block id='repas' title='Graphique repas' description="Découvrir l'impact carbone des différents types de repas">
        <Category
          category={{
            ...alimentation,
            slug: 'repas',
            name: 'Repas',
            equivalents: computedEquivalents('alimentation', repas),
          }}
        />
      </Block>
      <Suspense>
        <Examples
          title='Exemples'
          description={alimentation.examples || 'Ils utilisent nos outils à la perfection.'}
          filter={alimentation.name}
          tool={alimentation.tool}
        />
        <Suspense />
        <FAQs filter={alimentation.name} page={alimentation.name} />
      </Suspense>
    </>
  )
}

export default AlimentationPage
