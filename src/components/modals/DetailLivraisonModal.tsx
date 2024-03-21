import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import Modal2 from 'components/base/Modal2'
import NewTabIcon from 'components/base/NewTabIcon'
import Link from 'components/base/buttons/Link'

const Title = styled.h2``

const DetailsTitle = styled.h4`
  cursor: pointer;
  display: inline;
`
const FormattedText = styled.div`
  h3 {
    margin-top: 2rem;
  }
`

export default function DetailLivraisonModal({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const getTitle = () => {
    return <Title>Les hypothèses retenues</Title>
  }
  return (
    <Modal2 open setOpen={setOpen} getTitle={getTitle} width={'80em'}>
      <FormattedText>
        <p>
          L'ensemble des calculs sont issus de{' '}
          <Link href='https://librairie.ademe.fr/mobilite-et-transport/6261-e-commerce-modelisation-des-impacts-et-recommandations-filieres-et-grand-public.html'>
            l’étude Commerce en ligne - 2023
          </Link>{' '}
          à destination des professionels du E-commerce. L'outil ECEL à l'origine des calculs de cette étude a été
          adapté au contexte des particuliers sous forme de simulateur.
        </p>
        <h3>Les différents type de produits</h3>
        <p>
          L'<b>habillement</b> correspond à un produit textile qui va de la paire de chaussures, au manteau en passant
          par le t-shirt. Par défaut, nous considérons une <b>boite à chaussures</b>.
        </p>
        <p>
          Les <b>produits culturels</b> correspondent aux livres, jeux de société, CD/vinyles, jeux vidéos, etc. Par
          défaut, nous considérons un <b>livre</b>.
        </p>
        <p>
          Les <b>équipements volumineux</b> correspondent aux gros électroménagers, l'ameublement, etc. Par défaut, nous
          considérons un <b>lave-vaisselle</b>.
        </p>
        <p>
          Pour <b>les produits de grande consommation</b>, nous avons considéré{' '}
          <b>une commande de produits alimentaires secs</b>.
        </p>

        <h3>Les scénarios de livraison</h3>
        <p>
          Dans cette première version, 3 scénarios sont proposés: la livraison{' '}
          <b> à domicile, en point relais ou en click & collect</b>, tous adaptables à l'option{' '}
          <b>"colis qui vient de loin"</b>.
        </p>
        <p>
          Pour chaque scénario, nous prenons en compte l'<b>ensemble des étapes d'un processus de livraison</b> :
          commande en ligne, emballage, entrepôt de stockage, plateformes de tri, transport inter-platerformes,
          infrastruture de collecte, et enfin, le déplacement consommateur dans le cas d'une livraison en point relais
          ou click & collect (<i>Voir ci-dessous pour le détail des processus de livraison</i>). Pour un article{' '}
          <b>"qui vient de loin"</b>, nous avons fait l'hypothèse que le colis arrive <b>par avion depuis la Chine</b>{' '}
          via une étape de transport supplémentaire (9000km parcourus par avion, mix électrique de l'entrepôt de départ
          adapté). Nous ne prenons pas en compte les trainées de condensation pour l’aérien.
        </p>
        <h3>Des informations supplémentaires sur les paramètres...</h3>
        <p>
          Pour le processus de <b>commande en ligne</b>, le type de produit impacte le temps de recherche web et donc
          l'empreinte de l'utilisation du terminal pour effectuer effectuer l'achat. On conserve donc une valeur unique
          (
          <b>
            5,4 gCO<sub>2</sub>e
          </b>
          ) par commande quel que soit le produit.
        </p>
        <p>
          Un <b>emballage carton</b> a été attribué à chaque type de colis selon sa taille.
        </p>
        <p>
          Pour les étapes de <b>stockage</b> en entrepôt, on considère un entrepôt de{' '}
          <b>
            10 000 m<sup>2</sup>
          </b>
          . Le nombre de jour de stockage dépend du type de produit.
        </p>
        <p>
          En ce qui concerne les <b>camions de livraison</b>, pour le <b>transport longue distance</b>, nous avons
          considéré un <b>poids lourd moyen</b> type 44 tonnes) tandis que pour les <b>derniers kilomètres</b> de
          livraison, nous avons considéré un <b>véhicule utilitaire léger</b>.{' '}
        </p>
        <h3>Fréquences de livraison</h3>
        <p>
          Pour calculer l’impact annuel de la livraison de colis en fonction de votre fréquence de livraison nous
          faisons les calculs suivants :
        </p>
        <ul>
          <li>X colis x 1 si par an</li>
          <li>X colis x 12 si par mois</li>
          <li>X colis x 52 si par semaine</li>
        </ul>
        <h3>Le détails des processus</h3>
        <details>
          <summary>
            <DetailsTitle>Livraison à domicile</DetailsTitle>
          </summary>
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
          <summary>
            <DetailsTitle>Livraison en point relais</DetailsTitle>
          </summary>
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
          <summary>
            <DetailsTitle>Livraison en click & collect</DetailsTitle>
          </summary>
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
        <h3>Pour aller plus loin</h3>
        <p>
          <Link href={'/documentation/livraison-colis'} title='Documentation (ouvre un nouvel onglet)' target='_blank'>
            Consultez notre documentation <NewTabIcon />
          </Link>
        </p>
      </FormattedText>
    </Modal2>
  )
}
