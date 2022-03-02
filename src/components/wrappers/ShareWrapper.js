import React from 'react'

import Share from 'components/layout/Share'

export default function ShareWrapper(props) {
  return (
    <Share
      small={props.small}
      result={props.result}
      messages={{
        mail: {
          simulator: {
            subject: `Découvrez et intégrez le simulateur de l'ADEME Que Faire de mes Déchets !`,
            body: `Bonjour,
            
Vous souhaitez aider votre communauté ou collaborateurs à savoir plus facilement où jeter leurs déchets, et comment les limiter ?
            
Le site Que Faire de mes Déchets permet de savoir quoi faire de vos déchets, de savoir ce qu'ils vont devenir et comment les éviter. 

Découvrez le ici : `,
          },
          result: {
            subject: `Découvre cette fiche résultat sur le site de l'ADEME Que Faire de mes Déchets - ${props.result}`,
            body: `Bonjour,

Voici un résultat de recherche sur le site Que Faire de mes Déchets que je voulais partager avec toi : `,
          },
        },
        facebook: {
          simulator: {
            quote:
              'Vous voulez être sûr de bien respecter les consignes de tri pour vos emballages ? Vous vous demandez où apporter vos appareils électriques ? Grâce au simulateur Datagir, retrouvez toutes les réponses à ces questions ! ♻🌍',
          },
          result: {
            quote: `${props.result} - J’ai trouvé où jeter ce type de déchets grâce à Que Faire de mes Déchets !`,
          },
        },
        twitter: {
          simulator: {
            title:
              'Vous voulez être sûr de bien respecter les consignes de tri pour vos emballages ? Vous vous demandez où apporter vos appareils électriques ? Grâce au simulateur Datagir, retrouvez toutes les réponses à ces questions ! ♻🌍',
          },
          result: {
            title: `${props.result} - J’ai trouvé où jeter ce type de déchets grâce à Que Faire de mes Déchets !`,
          },
        },
        linkedin: {
          simulator: {
            source: 'Que Faire de mes Déchets',
            title:
              'Retrouvez les consignes de tri de tous les déchets et intégrez cet outil à votre site ! 💻♻🌍',
            summary:
              'Vous souhaitez aider votre communauté ou collaborateurs à savoir plus facilement où jeter leurs déchets, et comment les limiter ? Faites-leur découvrir Que faire de mes déchets !  Ce simulateur aussi intégrable librement en iframe sur vos plateformes web et mobiles, de quoi toucher largement les visiteurs de votre site !',
          },
          result: {
            source: `Que faire de mes Déchets`,
            title: `${props.result} - J’ai trouvé où jeter ce type de déchets grâce à Que Faire de mes Déchets !`,
            summary:
              'Des questions sur un autre déchet ? Toutes les réponses sont dans Que Faire de mes Déchets !',
          },
        },
        whatsapp: {
          simulator: {
            title: 'Que Faire de mes Déchets ♻🌍',
          },
          result: {
            title: `${props.result} - J’ai trouvé où jeter ce type de déchets grâce à Que Faire de mes Déchets !`,
          },
        },
      }}
    />
  )
}
