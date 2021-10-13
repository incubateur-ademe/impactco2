import React from 'react'

import Share from 'components/layout/Share'

export default function ShareWrapper(props) {
  return (
    <Share
      small={props.small}
      messages={{
        mail: {
          simulator: {
            subject: `Découvrez & intégrez le simulateur de l'ADEME Mon Convertisseur CO2 !`,
            body: `Bonjour,

Vous souhaitez sensibiliser votre communauté ou collaborateurs et les aider à mieux comprendre leur impact sur le climat ?

Visualisez facilement en objet tangible du quotidien un poids en CO2e grâce à ce simulateur Mon Convertisseur CO2.

Découvrez le ici : `,
          },
          result: {
            subject: `Découvre mon résultat sur le simulateur de l'ADEME Mon Convertisseur CO2`,
            body: `Bonjour,

Voici un résultat de recherche sur le site Mon Convertisseur CO2 que je voulais partager avec toi : `,
          },
        },
        facebook: {
          simulator: {
            quote:
              '2 tonnes de CO2 ça représente quoi ? 🤔 Donnez du sens aux tonnes & kg de CO2 pour mieux évaluer votre impact sur le climat !',
          },
          result: {
            quote: `Comme moi, donnez du sens aux tonnes & kg de CO2 pour mieux évaluer votre impact sur le climat !`,
          },
        },
        twitter: {
          simulator: {
            title:
              '2 tonnes de CO2 ça représente quoi ? 🤔 Donnez du sens aux tonnes & kg de CO2 pour mieux évaluer votre impact sur le climat !',
          },
          result: {
            title: `Comme moi, donnez du sens aux tonnes & kg de CO2 pour mieux évaluer votre impact sur le climat !`,
          },
        },
        linkedin: {
          simulator: {
            source: 'Mon Convertisseur CO2',
          },
          result: {
            source: `Mon Convertisseur CO2`,
          },
        },
        whatsapp: {
          simulator: {
            title:
              '2 tonnes de CO2 ça représente quoi ? 🤔 Donnez du sens aux tonnes & kg de CO2 pour mieux évaluer votre impact sur le climat !',
          },
          result: {
            title: `Comme moi, donnez du sens aux tonnes & kg de CO2 pour mieux évaluer votre impact sur le climat !`,
          },
        },
      }}
    />
  )
}
