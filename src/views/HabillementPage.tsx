import { Suspense } from 'react'
import { Category as CategoryType } from 'types/category'
import { categories } from 'data/categories'
import Category from 'components/outils/Category'
import styles from 'components/outils/CategoryPage.module.css'
import SimulatorsCards from 'components/outils/SimulatorsCards'
import OsezChanger from 'components/outils/osezChanger/OsezChanger'
import Sources from 'components/base/Sources'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import Examples from 'components/examples/Examples'
import FAQs from 'components/faq/FAQs'
import Block from 'components/layout/Block'

const habillement = categories.find((category) => category.slug === 'habillement') as CategoryType

const HabillementPage = () => {
  return (
    <>
      <Breadcrumbs
        current={habillement.name}
        links={[
          { label: 'Accueil', link: '/' },
          { label: 'Les outils', link: '/outils' },
        ]}
      />
      <Block title={habillement.name} as='h1' description={habillement.description}>
        <SimulatorsCards
          tracking='Habillement'
          title='Le graphique'
          subTitle="Communiquer sur l'impact de l'habillement avec les facteurs d'émission de 19 types de vêtements."
          extraTitle='Le défi chaussures'
          extraSubTitle="Sensibiliser à l'impact carbone de l'achat de chaussures neuves avec cet outil ludique."
          extraLink='#osez-changer'
        />
      </Block>
      <Block id='simulateur' title='Graphique' description="Sensibiliser à l'impact de la mode">
        <Category category={habillement} />
        {habillement.sources && (
          <Sources className={styles.sources} sources={habillement.sources} tracking={habillement.name} />
        )}
      </Block>
      <Block
        id='osez-changer'
        title='Défi chaussures'
        description='Sensibiliser à l’impact de l’achat de chaussures neuves'>
        <OsezChanger />
      </Block>
      <Suspense>
        <Examples
          title='Exemples'
          description={habillement.examples || 'Ils utilisent nos outils à la perfection.'}
          filter={habillement.name}
          tool={habillement.tool}
        />
        <Suspense />
        <FAQs filter={habillement.name} page={habillement.name} />
      </Suspense>
    </>
  )
}

export default HabillementPage
