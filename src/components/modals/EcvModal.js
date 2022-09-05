import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'components/providers/ModalProvider'
import Modal from 'components/base/Modal'

const Title = styled.h2``
const Text = styled.p``
export default function EcvModal() {
  const { ecv: open, setEcv: setOpen } = useContext(ModalContext)
  return (
    <Modal open={open} setOpen={setOpen}>
      <Title>Étapes du cycle de vie</Title>
      <h3>Matières Premières</h3>
      <Text>
        Données relatives à la production des matières premières nécessaires à
        la fabrication de tout objet, exploitation de ressources minérales,
        végétales ou animales. Pour extraire ou fabriquer ces matières
        premières, des engins et des machines, de l’énergie pour les faire
        fonctionner, des produits auxiliaires (engrais, pesticides, substances
        chimiques, etc.) ou encore des espaces naturels liés aux cultures ou à
        l’élevage sont nécessaires.
      </Text>
      <h3>Approvisionnement</h3>
      <Text>
        Données de transport pour l'approvisionnement des matières premières et
        des emballages vers les lieux de mise en forme des matières premières.
      </Text>
      <h3>Mise en forme</h3>
      <Text>
        Données d’émissions sur les sites de mise en forme des matières
        premières nécessaires à la fabrication des différentes pièces composant
        le produit.
      </Text>
      <h3>Assemblage et Distribution</h3>
      <Text>
        Données d’émissions sur les lieux d’assemblage du produit fini. Données
        liées aux emballages des produits transportés entre les sites de
        production, et aux 4 étapes de distribution du produit fini (transport
        jusqu'aux entrepôts, stockage dans les entrepôts, transport jusqu'aux
        lieux de vente et stockage sur les lieux de vente).
      </Text>
      <h3>Usage</h3>
      <Text>
        Données relatives aux consommables requis lors de l'étape d'utilisation
        et l'entretien du produit par l'utilisateur final pour les produits qui
        le justifient : énergie, produits détergents pour les vêtements, etc.
      </Text>
    </Modal>
  )
}
