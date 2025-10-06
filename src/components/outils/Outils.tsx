import CheckRoundIcon from 'components/base/icons/check-round'
import SimpleStarShapeIcon from 'components/base/icons/simple-star-shape'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import News from 'components/cards/News'
import { ToolCardProps } from 'components/cards/ToolCard'
import ToolCards from 'components/cards/ToolCards'
import { devTools, quiz, smallTools, tools } from 'components/cards/tools'
import FAQs from 'components/faq/FAQs'
import Equivalents from 'components/home/Equivalents'
import Block from 'components/layout/Block'
import styles from './Outils.module.css'

const Outils = () => {
  return (
    <>
      <Breadcrumbs current='Les outils' links={[{ label: 'Accueil', link: '/' }]} />
      <Block title='Les outils' as='h1' description='Trouver l’outil adapté à votre prochaine publication.' />
      <News
        tools={[
          {
            ...(tools.find((tool) => tool.slug === 'rse') as ToolCardProps),
            title: 'Découvrez le Kit RSE !',
            description: (
              <>
                <div className={styles.descriptionLine}>
                  <div className={styles.icons}>
                    <div className={styles.shape}>
                      <SimpleStarShapeIcon />
                    </div>
                    <div className={styles.check}>
                      <CheckRoundIcon />
                    </div>
                  </div>
                  <p>4 événements en lien avec la transition écologique</p>
                </div>
                <div className={styles.descriptionLine}>
                  <div className={styles.icons}>
                    <div className={styles.shape}>
                      <SimpleStarShapeIcon />
                    </div>
                    <div className={styles.check}>
                      <CheckRoundIcon />
                    </div>
                  </div>
                  <p>Des contenus prêts à l’emploi (mails, visuels, défis…)</p>
                </div>
              </>
            ),
          },
        ]}
      />
      <Block
        title='Outils thématiques'
        description='Notre collection de simulateurs, contenus et infographies thématiques.'>
        <ToolCards tools={tools} />
      </Block>
      <Block
        title='Petits formats'
        description='Nos widgets, modules et autres formats miniatures à intégrer à vos contenus.'>
        <ToolCards
          tools={[
            quiz,
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
      <Block title='Pour les développeurs' description='Des outils spécifiques pour des usages avancés.'>
        <ToolCards tools={devTools} />
      </Block>
      <Equivalents />
      <FAQs filter='Catalogue outils' page='Outils' />
    </>
  )
}

export default Outils
