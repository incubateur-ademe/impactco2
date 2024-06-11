import classNames from 'classnames'
import React from 'react'
import Link from 'components/base/buttons/Link'
import ByYear from 'components/budget/ByYear'
import styles from './BudgetPage.module.css'
import pageStyles from './Page.module.css'

const BudgetPage = () => {
  return (
    <div className={classNames(pageStyles.container, 'main-container')}>
      <h1>Budget</h1>
      Impact CO₂ est un service public numérique, c’est pourquoi nous sommes transparents sur les ressources allouées et
      la manière dont elles sont employées.
      <h2>Principes</h2>
      Nous suivons le <Link href='https://beta.gouv.fr/manifeste'>manifeste beta.gouv</Link> dont nous rappelons les
      principes ici :
      <div className={styles.box}>
        <ul>
          <li>Les besoins des utilisateurs sont prioritaires sur les besoins de l’administration</li>
          <li>Le mode de gestion de l’équipe repose sur la confiance</li>
          <li>L’équipe adopte une approche itérative et d’amélioration en continu</li>
        </ul>
      </div>
      <h2>Fonctionnement</h2>
      Impact CO₂ est une start-up d’état : l’équipe est donc portée par un intrapreneur qui est responsable du service
      numérique développé au sein de son administration (l’ADEME en l’occurence).
      <br />
      Son rôle est multiple : déploiement, gestion des produits, référent auprès de son administration (budget, compte
      rendus d’avancement).
      <br />
      Le budget exposé ici ne prend pas en compte l’intrapeneur puisque qu’il est salarié de l’ADEME mais concerne les
      membres de l’équipe.
      <h2>Budget consommé</h2>
      <ByYear />
      <br />
      <h3>Description des catégories de coût</h3>
      <ul>
        <li>
          <b>Développement, déploiement, produit, design 👨‍💻</b>
          <br />
          Les coûts de développement, produit, déploiement et design représentent la grande majorité de notre budget.
          Nous sommes une petite équipe de 6 freelances, pluridisciplinaires aussi bien sur les aspects techniques,
          stratégiques et métiers.
        </li>
        <li>
          <b>Logiciels et hébergement 💻</b>
          <br />
          Notre modèle open-source nous permet d’accéder gratuitement à la majorité des outils que nous utilisons
          (hébergement de code, serveurs de tests, etc.). Le site est hébergé sur{' '}
          <Link href='https://scalingo.com/'>Scalingo</Link>.
        </li>
      </ul>
      <br />
      <div className={styles.box}>
        <p>
          <b>À propos de la TVA</b>
        </p>
        <br />
        Contrairement aux entreprises du secteur privé, les administrations ne peuvent pas récupérer la TVA supportée
        sur leurs achats dans le cadre de leur activité.
        <br />
        <br />
        Le montant TTC inclut la TVA au taux de 20%.
        <br />
        <br />
        La TVA est collectée et reversée à l'État et diminue donc le montant du budget utilisable sur le projet.
      </div>
    </div>
  )
}

export default BudgetPage
