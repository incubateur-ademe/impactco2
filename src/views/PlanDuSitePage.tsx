import classNames from 'classnames'
import React from 'react'
import { categories } from 'data/categories'
import { getName } from 'utils/Equivalent/equivalent'
import Link from 'components/base/buttons/Link'
import { devTools, smallTools } from 'components/cards/tools'
import pageStyles from './Page.module.css'
import styles from './PlanDuSitePage.module.css'

const tools = [
  ...devTools.map((tool) => ({ slug: tool.slug, name: tool.title, equivalents: null })),
  ...smallTools.map((tool) => ({ slug: tool.slug, name: tool.title, equivalents: null })),
  ...categories.map((category) => ({ slug: category.slug, name: category.name, equivalents: category.equivalents })),
]

const PlanDuSitePage = () => {
  return (
    <div className={classNames(pageStyles.container, 'main-container')}>
      <h1>Plan du site</h1>
      <div className={styles.links}>
        <Link prefetch={false} href='/'>
          Page d'accueil
        </Link>
        <Link prefetch={false} href='/accessibilite'>
          Accessibilité
        </Link>
        <Link prefetch={false} href='/budget'>
          Budget
        </Link>
        <div>Contenus</div>
        <div className={styles.row}>
          <Link prefetch={false} href='/contenu/comment-sensibiliser-vos-visiteurs-empreinte-carbone'>
            Comment sensibiliser vos visiteurs à l’empreinte carbone ?
          </Link>
          <Link prefetch={false} href='/contenu/detecteur-co2'>
            Le Détecteur CO₂
          </Link>
          <Link prefetch={false} href='/contenu/etiquette-carbone'>
            L’étiquette carbone : présentation et tutoriel d’intégration
          </Link>
          <Link prefetch={false} href='/contenu/impact-carbone-hiver-station-ski'>
            4 conseils pour réduire l’impact carbone des séjours au ski
          </Link>
          <Link prefetch={false} href='/contenu/nouveau-site'>
            Le nouveau site “Impact CO2” est en ligne !
          </Link>
          <Link prefetch={false} href='/contenu/quiz-carbone'>
            Quiz carbone : le nouveau jeu de cartes de l’ADEME est en ligne !
          </Link>
          <Link prefetch={false} href='/contenu/semaine-mobilite-simulateur-transport-ademe'>
            Semaine européenne de la mobilité : découverte du calculateur Impact Transport de l’ADEME
          </Link>
        </div>
        <Link prefetch={false} href='/doc'>
          La doc
        </Link>
        <div className={styles.row}>
          <Link prefetch={false} href='/doc/api'>
            API Doc
          </Link>
          <Link prefetch={false} href='/doc/guide-utilisation'>
            Guide d'utilisation
          </Link>
          <Link prefetch={false} href='/doc/livraison'>
            Livraison
          </Link>
          <div className={styles.row}>
            <Link prefetch={false} href='/doc/livraison/livraison-colis'>
              De colis
            </Link>
            <Link prefetch={false} href='/doc/livraison/livraison-colis-par-avion'>
              De colis par avion
            </Link>
          </div>
          <Link prefetch={false} href='/doc/questions-frequentes'>
            Questions fréquentes
          </Link>
          <Link prefetch={false} href='/doc/usage-numerique/acv'>
            Usage numérique
          </Link>
        </div>
        <Link prefetch={false} href='/mentions-legales'>
          Mentions légales
        </Link>
        <Link prefetch={false} href='/outils'>
          Les outils
        </Link>
        <div className={styles.row}>
          {tools.map((tool) => (
            <div key={tool.slug}>
              <Link prefetch={false} href={`/outils/${tool.slug}`}>
                {tool.name}
              </Link>
              {tool.equivalents && (
                <div className={styles.row}>
                  {tool.equivalents.map((equivalent) => (
                    <Link prefetch={false} key={equivalent.slug} href={equivalent.link}>
                      {getName('fr', equivalent)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link prefetch={false} href='/outils/comparateur'>
            Comparateur
          </Link>
        </div>
        <Link prefetch={false} href='/plan-du-site'>
          Plan du site
        </Link>
        <Link prefetch={false} href='/politique-de-confidentialite'>
          Politique de confidentialité
        </Link>
        <Link prefetch={false} href='/rendez-vous'>
          Prendre rendez-vous
        </Link>
        <Link prefetch={false} href='/stats'>
          Statistiques
        </Link>
        <Link prefetch={false} href='/suggestion'>
          Faire une suggestion
        </Link>
      </div>
    </div>
  )
}

export default PlanDuSitePage
