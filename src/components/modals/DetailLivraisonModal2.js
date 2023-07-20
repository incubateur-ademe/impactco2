import MagicLink from "components/base/MagicLink";
import Modal2 from "components/base/Modal2";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";
import styled from "styled-components";

const Title = styled.h2``;

export default function DetailLivraisonModal2() {
  const getTitle = () => {
    return <Title>Les hypothèses retenues</Title>;
  };
  const { hypothesisLivraison: open, setHypothesisLivraison: setOpen } = useContext(ModalContext);
  return (
    <Modal2 open={open} setOpen={setOpen} getTitle={getTitle} width={"80em"}>
      <p>
        L'ensemble des calculs sont issus de{" "}
        <MagicLink to="https://librairie.ademe.fr/mobilite-et-transport/6261-e-commerce-modelisation-des-impacts-et-recommandations-filieres-et-grand-public.html">
          l’étude Commerce en ligne - 2023
        </MagicLink>{" "}
        à destination des professionels du E-commerce. L'outil ECEL (LIEN ?) à l'origine des calculs de cette étude a
        été adapté au contexte des particuliers.
      </p>
      <h3>Les différents type de produits</h3>
      <p>
        L'<b>habillement</b> correspond à un produit textile qui va de la paire de chaussures, au manteau en passant par
        le t-shirt. Par défaut, nous considérons une <b>boite à chaussures</b>. Les <b>produits culturels</b>{" "}
        correspondent aux livres, jeux de société, CD/vinyles, jeux vidéos… Par défaut, nous considérons un <b>livre</b>
        . Les <b>équipements volumineux</b> correspondent aux gros électroménagers, l'ameublement… Par défaut, nous
        considérons un <b>lave-vaisselle</b>.Pour <b>les produits de grande consommation</b>, nous avons considéré un
        carton de <b>produits secs de supermarchés</b>.
      </p>
      <h3>Les scénarios de livraison</h3>
      <p>
        Pour chaque scénario, nous prenons en compte l'<b>ensemble des étapes d'un processus de livraison</b> : commande
        en ligne, emballage, entrepôt de stockage, plateformes de tri, transport inter-platerformes mais également
        l'infrastruture de collecte et le déplacement consommateur dans le cas d'une livraison en point relais, click
        and collect ou achat en magasin traditionnel. (Pour l'achat en magasin traditionnel, sont exclues les étapes de
        commande en ligne et d'emballage). Nous avons fait l'hypothèse que la livraison se fait depuis un entrepôt
        français Pour un article "qui vient de loin", nous avons fait l'hypothèse que le colis arrive par avion depuis
        la Chine.
      </p>
      <h3>Et d'autres paramètres...</h3>
      <p>
        Un <b>emballage carton</b> a été attribué à chaque type de colis selon sa taille.
      </p>
      <p>
        En ce qui concerne les <b>camions de livraison, pour le transport longue distance</b>, nous avons considéré un
        poids lourd moyen (type 44 tonnes) tandis que pour les derniers kilomètres de livraison, nous avons considéré un
        véhicule utilisaire léger.{" "}
      </p>
    </Modal2>
  );
}
