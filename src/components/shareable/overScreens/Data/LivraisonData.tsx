import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import NewTabIcon from 'components/base/NewTabIcon'
import Link from 'components/base/buttons/Link'
import styles from './Data.module.css'

const FRLivraisonData = () => {
  return (
    <>
      <div className={styles.content}>
        <div>
          <Link href='https://librairie.ademe.fr/mobilite-et-transport/6261-e-commerce-modelisation-des-impacts-et-recommandations-filieres-et-grand-public.html'>
            l’étude Commerce en ligne - 2023
          </Link>{' '}
          à destination des professionels du E-commerce. L'outil ECEL à l'origine des calculs de cette étude a été
          adapté au contexte des particuliers sous forme de simulateur.
        </div>
      </div>
      <div className={styles.title}>Les différents type de produits</div>
      <div className={styles.content}>
        <div>
          L'<b>habillement</b> correspond à un produit textile qui va de la paire de chaussures, au manteau en passant
          par le t-shirt. Par défaut, nous considérons une <b>boite à chaussures</b>.
        </div>
        <div>
          Les <b>produits culturels</b> correspondent aux livres, jeux de société, CD/vinyles, jeux vidéos, etc. Par
          défaut, nous considérons un <b>livre</b>.
        </div>
        <div>
          Les <b>équipements volumineux</b> correspondent aux gros électroménagers, l'ameublement, etc. Par défaut, nous
          considérons un <b>lave-vaisselle</b>.
        </div>
        <div>
          Pour <b>les produits de grande consommation</b>, nous avons considéré{' '}
          <b>une commande de produits alimentaires secs</b>.
        </div>
      </div>
      <div className={styles.title}>Les scénarios de livraison</div>
      <div className={styles.content}>
        <div>
          Dans cette première version, 3 scénarios sont proposés: la livraison{' '}
          <b> à domicile, en point relais ou en click & collect</b>, tous adaptables à l'option{' '}
          <b>"colis qui vient de loin"</b>.
        </div>
        <div>
          Pour chaque scénario, nous prenons en compte l'<b>ensemble des étapes d'un processus de livraison</b> :
          commande en ligne, emballage, entrepôt de stockage, plateformes de tri, transport inter-platerformes,
          infrastruture de collecte, et enfin, le déplacement consommateur dans le cas d'une livraison en point relais
          ou click & collect (<i>Voir ci-dessous pour le détail des processus de livraison</i>). Pour un article{' '}
          <b>"qui vient de loin"</b>, nous avons fait l'hypothèse que le colis arrive <b>par avion depuis la Chine</b>{' '}
          via une étape de transport supplémentaire (9000km parcourus par avion, mix électrique de l'entrepôt de départ
          adapté). Nous ne prenons pas en compte les trainées de condensation pour l’aérien.
        </div>
      </div>
      <div className={styles.title}>Des informations supplémentaires sur les paramètres...</div>
      <div className={styles.content}>
        <div>
          Pour le processus de <b>commande en ligne</b>, le type de produit impacte le temps de recherche web et donc
          l'empreinte de l'utilisation du terminal pour effectuer effectuer l'achat. On conserve donc une valeur unique
          (<b>5,4 gCO₂e</b>) par commande quel que soit le produit.
        </div>
        <div>
          Un <b>emballage carton</b> a été attribué à chaque type de colis selon sa taille.
        </div>
        <div>
          Pour les étapes de <b>stockage</b> en entrepôt, on considère un entrepôt de{' '}
          <b>
            10 000 m<sup>2</sup>
          </b>
          . Le nombre de jour de stockage dépend du type de produit.
        </div>
        <div>
          En ce qui concerne les <b>camions de livraison</b>, pour le <b>transport longue distance</b>, nous avons
          considéré un <b>poids lourd moyen</b> type 44 tonnes) tandis que pour les <b>derniers kilomètres</b> de
          livraison, nous avons considéré un <b>véhicule utilitaire léger</b>.{' '}
        </div>
      </div>
      <div className={styles.title}>Fréquences de livraison</div>
      <div className={styles.content}>
        <div>
          Pour calculer l’impact annuel de la livraison de colis en fonction de votre fréquence de livraison nous
          faisons les calculs suivants :
        </div>
        <ul>
          <li>X colis x 1 si par an</li>
          <li>X colis x 12 si par mois</li>
          <li>X colis x 52 si par semaine</li>
        </ul>
      </div>
      <div className={styles.content}>
        <details>
          <summary>Livraison à domicile</summary>
          <ul>
            <li>Processus de commande en ligne</li>
            <li>Entrepôt initial de stockage et de préparation du colis</li>
            <li>
              Transport entrepôt - plateforme 1 : <b>400 km</b> (
              <i>
                poids lourd moyen, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse
                moyenne de 60 km/h
              </i>
              )
            </li>
            <li>Plateforme 1</li>
            <li>
              Transport plateforme 1 - plateforme 2 : <b>400 km</b> (
              <i>
                poids lourd moyen, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse
                moyenne de 60 km/h
              </i>
              )
            </li>
            <li>Plateforme 2</li>
            <li>
              Transport plateforme 2 - domicile : <b>70 km</b> (
              <i>
                VUL, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse moyenne de 30
                km/h
              </i>
              )
            </li>
          </ul>
        </details>
        <details>
          <summary>Livraison en point relais</summary>
          <ul>
            <li>Processus de commande en ligne</li>
            <li>Entrepôt initial de stockage et de préparation du colis</li>
            <li>
              Transport entrepôt - plateforme 1: <b>400 km</b> (
              <i>
                poids lourd moyen, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse
                moyenne de 60 km/h
              </i>
              )
            </li>
            <li>Plateforme 1</li>
            <li>
              Transport plateforme 1 - plateforme 2: <b>400 km</b> (
              <i>
                poids lourd moyen, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse
                moyenne de 60 km/h
              </i>
              )
            </li>
            <li>Plateforme 2</li>
            <li>
              Transport plateforme 2 - point de retrait: <b>70 km</b> (
              <i>
                VUL, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse moyenne de 30
                km/h
              </i>
              )
            </li>
            <li>Point de retrait</li>
            <li>Déplacement consommateur</li>
          </ul>
        </details>
        <details>
          <summary>Livraison en click & collect</summary>
          <ul>
            <li>Processus de commande en ligne</li>
            <li>Entrepôt initial de stockage et de préparation du colis</li>
            <li>
              Transport entrepôt - plateforme 1: <b>400 km</b> (
              <i>
                poids lourd moyen, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse
                moyenne de 60 km/h
              </i>
              )
            </li>
            <li>Plateforme 1</li>
            <li>
              Transport plateforme 1 - plateforme 2: <b>400 km</b> (
              <i>
                poids lourd moyen, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse
                moyenne de 60 km/h
              </i>
              )
            </li>
            <li>Plateforme 2</li>
            <li>
              Transport plateforme 2 - magasin: <b>70 km</b> (
              <i>
                VUL, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse moyenne de 30
                km/h
              </i>
              )
            </li>
            <li>Magasin</li>
            <li>Déplacement consommateur</li>
          </ul>
        </details>
      </div>
      <div className={styles.content}>
        <div>
          Pour plus de détails, consultez{' '}
          <Link href='/doc/livraison' title='Lien externe : documentation détaillée' target='_blank'>
            la documentation détaillée
            <NewTabIcon />
          </Link>
        </div>
      </div>
    </>
  )
}

const ENLivraisonData = () => {
  return (
    <>
      <div className={styles.content}>
        <div>
          <Link href='https://librairie.ademe.fr/mobilite-et-transport/6261-e-commerce-modelisation-des-impacts-et-recommandations-filieres-et-grand-public.html'>
            l’étude Commerce en ligne - 2023
          </Link>{' '}
          à destination des professionels du E-commerce. L'outil ECEL à l'origine des calculs de cette étude a été
          adapté au contexte des particuliers sous forme de simulateur.
        </div>
      </div>
      <div className={styles.title}>Les différents type de produits</div>
      <div className={styles.content}>
        <div>
          L'<b>habillement</b> correspond à un produit textile qui va de la paire de chaussures, au manteau en passant
          par le t-shirt. Par défaut, nous considérons une <b>boite à chaussures</b>.
        </div>
        <div>
          Les <b>produits culturels</b> correspondent aux livres, jeux de société, CD/vinyles, jeux vidéos, etc. Par
          défaut, nous considérons un <b>livre</b>.
        </div>
        <div>
          Les <b>équipements volumineux</b> correspondent aux gros électroménagers, l'ameublement, etc. Par défaut, nous
          considérons un <b>lave-vaisselle</b>.
        </div>
        <div>
          Pour <b>les produits de grande consommation</b>, nous avons considéré{' '}
          <b>une commande de produits alimentaires secs</b>.
        </div>
      </div>
      <div className={styles.title}>Les scénarios de livraison</div>
      <div className={styles.content}>
        <div>
          Dans cette première version, 3 scénarios sont proposés: la livraison{' '}
          <b> à domicile, en point relais ou en click & collect</b>, tous adaptables à l'option{' '}
          <b>"colis qui vient de loin"</b>.
        </div>
        <div>
          Pour chaque scénario, nous prenons en compte l'<b>ensemble des étapes d'un processus de livraison</b> :
          commande en ligne, emballage, entrepôt de stockage, plateformes de tri, transport inter-platerformes,
          infrastruture de collecte, et enfin, le déplacement consommateur dans le cas d'une livraison en point relais
          ou click & collect (<i>Voir ci-dessous pour le détail des processus de livraison</i>). Pour un article{' '}
          <b>"qui vient de loin"</b>, nous avons fait l'hypothèse que le colis arrive <b>par avion depuis la Chine</b>{' '}
          via une étape de transport supplémentaire (9000km parcourus par avion, mix électrique de l'entrepôt de départ
          adapté). Nous ne prenons pas en compte les trainées de condensation pour l’aérien.
        </div>
      </div>
      <div className={styles.title}>Des informations supplémentaires sur les paramètres...</div>
      <div className={styles.content}>
        <div>
          Pour le processus de <b>commande en ligne</b>, le type de produit impacte le temps de recherche web et donc
          l'empreinte de l'utilisation du terminal pour effectuer effectuer l'achat. On conserve donc une valeur unique
          (<b>5,4 gCO₂e</b>) par commande quel que soit le produit.
        </div>
        <div>
          Un <b>emballage carton</b> a été attribué à chaque type de colis selon sa taille.
        </div>
        <div>
          Pour les étapes de <b>stockage</b> en entrepôt, on considère un entrepôt de{' '}
          <b>
            10 000 m<sup>2</sup>
          </b>
          . Le nombre de jour de stockage dépend du type de produit.
        </div>
        <div>
          En ce qui concerne les <b>camions de livraison</b>, pour le <b>transport longue distance</b>, nous avons
          considéré un <b>poids lourd moyen</b> type 44 tonnes) tandis que pour les <b>derniers kilomètres</b> de
          livraison, nous avons considéré un <b>véhicule utilitaire léger</b>.{' '}
        </div>
      </div>
      <div className={styles.title}>Fréquences de livraison</div>
      <div className={styles.content}>
        <div>
          Pour calculer l’impact annuel de la livraison de colis en fonction de votre fréquence de livraison nous
          faisons les calculs suivants :
        </div>
        <ul>
          <li>X colis x 1 si par an</li>
          <li>X colis x 12 si par mois</li>
          <li>X colis x 52 si par semaine</li>
        </ul>
      </div>
      <div className={styles.content}>
        <details>
          <summary>Livraison à domicile</summary>
          <ul>
            <li>Processus de commande en ligne</li>
            <li>Entrepôt initial de stockage et de préparation du colis</li>
            <li>
              Transport entrepôt - plateforme 1 : <b>400 km</b> (
              <i>
                poids lourd moyen, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse
                moyenne de 60 km/h
              </i>
              )
            </li>
            <li>Plateforme 1</li>
            <li>
              Transport plateforme 1 - plateforme 2 : <b>400 km</b> (
              <i>
                poids lourd moyen, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse
                moyenne de 60 km/h
              </i>
              )
            </li>
            <li>Plateforme 2</li>
            <li>
              Transport plateforme 2 - domicile : <b>70 km</b> (
              <i>
                VUL, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse moyenne de 30
                km/h
              </i>
              )
            </li>
          </ul>
        </details>
        <details>
          <summary>Livraison en point relais</summary>
          <ul>
            <li>Processus de commande en ligne</li>
            <li>Entrepôt initial de stockage et de préparation du colis</li>
            <li>
              Transport entrepôt - plateforme 1: <b>400 km</b> (
              <i>
                poids lourd moyen, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse
                moyenne de 60 km/h
              </i>
              )
            </li>
            <li>Plateforme 1</li>
            <li>
              Transport plateforme 1 - plateforme 2: <b>400 km</b> (
              <i>
                poids lourd moyen, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse
                moyenne de 60 km/h
              </i>
              )
            </li>
            <li>Plateforme 2</li>
            <li>
              Transport plateforme 2 - point de retrait: <b>70 km</b> (
              <i>
                VUL, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse moyenne de 30
                km/h
              </i>
              )
            </li>
            <li>Point de retrait</li>
            <li>Déplacement consommateur</li>
          </ul>
        </details>
        <details>
          <summary>Livraison en click & collect</summary>
          <ul>
            <li>Processus de commande en ligne</li>
            <li>Entrepôt initial de stockage et de préparation du colis</li>
            <li>
              Transport entrepôt - plateforme 1: <b>400 km</b> (
              <i>
                poids lourd moyen, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse
                moyenne de 60 km/h
              </i>
              )
            </li>
            <li>Plateforme 1</li>
            <li>
              Transport plateforme 1 - plateforme 2: <b>400 km</b> (
              <i>
                poids lourd moyen, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse
                moyenne de 60 km/h
              </i>
              )
            </li>
            <li>Plateforme 2</li>
            <li>
              Transport plateforme 2 - magasin: <b>70 km</b> (
              <i>
                VUL, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse moyenne de 30
                km/h
              </i>
              )
            </li>
            <li>Magasin</li>
            <li>Déplacement consommateur</li>
          </ul>
        </details>
      </div>
      <div className={styles.content}>
        <div>
          Pour plus de détails, consultez{' '}
          <Link href='/doc/livraison' title='Lien externe : documentation détaillée' target='_blank'>
            la documentation détaillée
            <NewTabIcon />
          </Link>
        </div>
      </div>
    </>
  )
}

const LivraisonData = () => {
  const { language } = useParamContext()
  if (language === 'en') {
    return <ENLivraisonData />
  }

  return <FRLivraisonData />
}
export default LivraisonData
