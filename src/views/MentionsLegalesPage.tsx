import classNames from 'classnames'
import React from 'react'
import Link from 'components/base/buttons/Link'
import styles from './Page.module.css'

const MentionsLegalesPage = () => {
  return (
    <div className={classNames(styles.container, 'main-container')}>
      <h1>Mentions légales</h1>
      <h2>Informations légales</h2>
      <p>
        Impact CO₂&nbsp;
        <Link href='/'>({process.env.NEXT_PUBLIC_URL})</Link> est un service créé par&nbsp;
        <Link href='https://www.ademe.fr/'>l’ADEME</Link>
        &nbsp;en partenariat avec&nbsp;
        <Link href='https://beta.gouv.fr/'>beta.gouv.fr</Link>.
      </p>
      <p>
        Le site constitué par l’ensemble des pages rattachées au nom Impact CO₂ est la propriété de l’Agence de
        l’Environnement et de la Maîtrise de l’Energie (ADEME), Établissement Public à caractère Industriel et
        Commercial (EPIC) régi par les articles L131-3 à L131-7 et R131-1 à R131-26 du Code de l’environnement, inscrit
        au registre du commerce d’Angers sous le n° 385 290 309 et ayant son siège social au : 20, avenue du Grésillé -
        BP 90406 - 49004 Angers Cedex 01
        <br />
        Tél. 02 41 20 41 20
      </p>
      <h2>Direction de publication</h2>
      <p>
        Le directeur de publication est M. Sylvain WASERMAN, agissant en qualité de Président-directeur général de
        l’ADEME.
      </p>
      <p>
        La personne responsable de l’accès aux documents administratifs et des questions relatives à la réutilisation
        des informations est Monsieur Luc MORINIÈRE en qualité de Chef du service des affaires juridiques.
      </p>
      <h2>Hébergement du site</h2>
      <p>Scalingo</p>
      <p>13 rue Jacques Peirotes 67000 Strasbourg, France</p>
      <h2>Attribution</h2>
      <p>Certaines illustrations sont réalisées par Storyset de www.flaticon.com</p>
      <h2>Modification des mentions légales</h2>
      <p>
        L’ADEME se réserve le droit de modifier les présentes mentions légales à tout moment. L’utilisateur est lié par
        les conditions en vigueur lors de sa visite.
      </p>
    </div>
  )
}

export default MentionsLegalesPage