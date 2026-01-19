import classNames from 'classnames'
import Link from 'components/base/buttons/Link'
import ByYear from 'components/budget/ByYear'
import styles from './BudgetPage.module.css'
import pageStyles from './Page.module.css'

const BudgetPage = () => {
  return (
    <div className={classNames(pageStyles.container, 'main-container')}>
      <h1>Budget</h1>
      <p>
        Impact CO₂ est un service public numérique, c’est pourquoi nous sommes transparents sur les ressources allouées
        et la manière dont elles sont employées.
      </p>
      <h2>Principes</h2>
      <p>
        Nous suivons le <Link href='https://beta.gouv.fr/manifeste'>manifeste beta.gouv</Link> dont nous rappelons les
        principes ici :
      </p>
      <div className={styles.box}>
        <ul>
          <li>
            <b>Les besoins des utilisateurs passent avant ceux de l’administration</b>, afin de concentrer les moyens
            publics là où ils créent le plus d’impact.
          </li>
          <li>
            <b>L’équipe fonctionne sur la confiance et l’autonomie</b>, pour décider rapidement et efficacement de
            l’usage du budget.
          </li>
          <li>
            <b>Nous avançons par itérations et amélioration continue</b>, en mesurant systématiquement l’impact réel de
            nos actions.
          </li>
        </ul>
      </div>
      <h2>Fonctionnement</h2>
      <p>
        Impact CO₂ est une “start-up d'Etat” : l'équipe est donc portée par une intrapreneure qui est responsable du
        service numérique développé au sein de son administration (l'ADEME en l'occurrence).
      </p>
      <br />
      <p>
        Son rôle est multiple : définition de la stratégie et de la feuille de route, pilotage des équipes, gestion des
        produits, déploiement du service, référent auprès de son administration (budget, compte rendus d'avancement).
      </p>
      <br />
      <p>
        Le budget exposé ici ne prend pas en compte l'intrapreneure qui est salariée de la DINUM (Direction
        Interministérielle du numérique) et détachée à l’ADEME, mais concerne les membres de l'équipe.
      </p>
      <h2 id='budget-title'>Budget consommé</h2>
      <ByYear labelId='budget-title' />
      <br />
      <h3>Description des catégories de coût</h3>
      <p>
        Les coûts de développement, produit, déploiement et design sont exclusivement du “temps homme” de l’équipe. 7
        personnes travaillent pour Impact CO2 en freelance et à temps partiel (entre 50 et 80% de leur temps), ce qui
        représente 3,4 ETP sur l’année.
        <br />
        Notre modèle open-source nous permet d’accéder gratuitement à la majorité des outils que nous utilisons
        (hébergement de code, serveurs de tests, etc.). Le site est hébergé sur{' '}
        <Link href='https://scalingo.com/'>Scalingo</Link>.
      </p>
      <br />
      <div className={styles.box}>
        <p>
          <b>À propos de la TVA</b>
        </p>
        <br />
        <p>
          Contrairement aux entreprises du secteur privé, les administrations ne peuvent pas récupérer la TVA supportée
          sur leurs achats dans le cadre de leur activité.
        </p>
        <p>Le montant TTC inclut la TVA au taux de 20%.</p>
        <p>La TVA est collectée et reversée à l'État et diminue donc le montant du budget utilisable sur le projet.</p>
      </div>
    </div>
  )
}

export default BudgetPage
