import classNames from 'classnames'
import React from 'react'
import { categories } from 'data/categories'
import formatName from 'utils/formatName'
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
        <Link href='/'>Page d'accueil</Link>
        <Link href='/accessibilite'>Accessibilité</Link>
        <Link href='/budget'>Budget</Link>
        <div>Contenus</div>
        <div className={styles.row}>
          <Link href='/contenu/detecteur-co2'>Le Détecteur CO₂</Link>
          <Link href='/contenu/etiquette-carbone'>L’étiquette carbone : présentation et tutoriel d’intégration</Link>
          <Link href='/contenu/impact-carbone-hiver-station-ski'>
            4 conseils pour réduire l’impact carbone des séjours au ski
          </Link>
          <Link href='/contenu/nouveau-site'>Le nouveau site “Impact CO2” est en ligne !</Link>
        </div>
        <Link href='/doc'>La doc</Link>
        <div className={styles.row}>
          <Link href='/doc/api'>API Doc</Link>
          <Link href='/doc/guide-utilisation'>Guide d'utilisation</Link>
          <Link href='/doc/livraison'>Livraison</Link>
          <div className={styles.row}>
            <Link href='/doc/livraison/livraison-colis'>De colis</Link>
            <Link href='/doc/livraison/livraison-colis-par-avion'>De colis par avion</Link>
          </div>
          <Link href='/doc/questions-frequentes'>Questions fréquentes</Link>
        </div>
        <Link href='/mentions-legales'>Mentions légales</Link>
        <Link href='/outils'>Les outils</Link>
        <div className={styles.row}>
          {tools.map((tool) => (
            <>
              <Link key={tool.slug} href={`/outils/${tool.slug}`}>
                {tool.name}
              </Link>
              {tool.equivalents && (
                <div className={styles.row}>
                  {tool.equivalents.map((equivalent) => (
                    <Link key={equivalent.slug} href={equivalent.link}>
                      {formatName(equivalent.name, 1, true)}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ))}
          <Link href='/outils/comparateur'>Comparateur</Link>
        </div>
        <Link href='/plan-du-site'>Plan du site</Link>
        <Link href='/politique-de-confidentialite'>Politique de confidentialité</Link>
        <Link href='/rendez-vous'>Prendre rendez-vous</Link>
        <Link href='/stats'>Statistiques</Link>
        <Link href='/suggestion'>Faire une suggestion</Link>
      </div>
    </div>
  )
}

export default PlanDuSitePage
