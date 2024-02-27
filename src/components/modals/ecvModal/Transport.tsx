import React from 'react'
import Link from 'components/base/buttons/Link'

export default function Transport() {
  return (
    <>
      <h3>Construction (pour les modes de transport)</h3>
      <p>
        Regroupe les impacts liés aux matières premières nécessaires à la fabrication de tout mode de transport, leur
        extraction, mise en forme et assemblage pour construire les modes de transport. Ces différentes étapes
        nécessitent notamment des engins et des machines et de l’énergie pour les faire fonctionner.
      </p>
      <h3>Carburant</h3>
      <p>
        Emissions directes liées à la combustion pour les moteurs thermiques, ainsi que tout au long du cycle de
        production et distribution de carburant. Pour l'électricité, émissions liées à la production et la distribution
        de l'électricité jusqu'au véhicule.
      </p>
      <h3>Trainées de condensation</h3>
      <p>
        Du fait que les avions volent à haute altitude, la combustion du kérosène crée des traînées et perturbe les
        cycles d’autres gaz à effet de serre que le CO<sub>2</sub> (vapeur d'eau, eau condensée sous diverses formes,
        NOx et méthane qui, ensemble, produisent de l'ozone, etc.). Cet impact est appelé forçage radiatif additionnel.
        Dans l'
        <Link href='https://www.ecologie.gouv.fr/information-ges-des-prestations-transport'>
          Information GES des prestations de transport réglementaire
        </Link>
        , cet impact n'est pas inclus mais il est recommandé dans la réglementation pour la réalisation des Bilans GES
        des organisations.
      </p>
    </>
  )
}
