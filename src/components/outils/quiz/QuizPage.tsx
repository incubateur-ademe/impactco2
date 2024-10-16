import React, { Suspense } from 'react'
import Sources from 'components/base/Sources'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import Examples from 'components/examples/Examples'
import FAQs from 'components/faq/FAQs'
import Block from 'components/layout/Block'
import styles from '../CategoryPage.module.css'
import Quiz from './Quiz'
import QuizCards from './QuizCards'

const QuizPage = () => {
  return (
    <>
      <Breadcrumbs
        current='Quiz carbone'
        links={[
          { label: 'Accueil', link: '/' },
          { label: 'Les outils', link: '/outils' },
        ]}
      />
      <Block
        title='Quiz carbone'
        as='h1'
        description='Un format interactif pour sensibiliser et apprendre de façon ludique'>
        <Quiz />
        <Sources
          className={styles.sources}
          sources={[
            {
              label: 'Base Empreinte ADEME',
              href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
            },
          ]}
          tracking='Quiz'
        />
      </Block>
      <Block title='Télécharger les fiches' description='Les fiches utilisées dans le quizz, dans un format imprimable'>
        <QuizCards />
      </Block>
      <Suspense>
        <Examples title='Exemples' description='Ils utilisent le quiz avec brio.' filter='Quiz carbone' />
      </Suspense>
      <Suspense>
        <FAQs filter='Quiz carbone' page='Quiz carbone' />
      </Suspense>
    </>
  )
}

export default QuizPage
