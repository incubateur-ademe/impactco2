import { NextApiRequest, NextApiResponse } from 'next'
import swaggerJSDoc from 'swagger-jsdoc'

const config = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Impact CO₂',
      description: `⚠️ Cette section est en construction ⚠️

Bienvenue sur la documentation technique de **API Impact CO<sub>2</sub>**. Cette page présente les caractéristiques techniques de l’API. 

Cette documentation interactive à destination des développeurs permet de consommer les données de nos ressources Impact CO<sub>2</sub>.

Nous utilisons des clés API pour suivre son utilisation. Bien que celles ci ne soient pas obligatoire, nous nous réservons le droit de restreindre l'accès aux utilisateurs qui ne l'utilisant pas. N'hésitez pas à nous contacter via [${process.env.NEXT_PUBLIC_CONTACT_EMAIL}](mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}) pour en obtenir une gratuitement.

**Comment utiliser la documentation ?**
* Choisir le point d’API à tester
* Cliquer sur ‘**Try it out**'
* Remplir les champs obligatoires en fonction du chiffre, de l’ID ou du slug recherché
* Sélectionner les paramètres des personnalisation
* Cliquer sur '**Execute**' pour visualiser les données renvoyées
* Cliquer sur '**Clear**' pour recommencer

*Exemple : Je cherche à visualiser les données qui me sont retournées pour la thématique numerique.* 
* *Je clique sur le point d’API /thématiques/ecv/{id}*
* *Je clique sur le bouton Tryout*
* *Je renseigne dans le champs ID ou slug : numerique*
* *Je souhaite avoir le détail de l’ACV, je sélectionne alors 1*
* *Lorsque je clique sur Execute, je visualise  le détail des données sur la thématique numérique*`,
      version: '0.1.0',
    },
    servers: [{ url: `${process.env.NEXT_PUBLIC_URL}/api/v1` }],
    components: {
      securitySchemes: {
        APIKey: {
          type: 'http',
          description: `Nous utilisons des clés API pour monitorer son utilisation. Bien que celles ci ne soient pas obligatoire, nous nous réservons le droit de restreindre l'acces aux utilisateurs ne l'utilisant pas. N'hésitez pas à nous contacter via [${process.env.NEXT_PUBLIC_CONTACT_EMAIL}](mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}) pour en obtenir une gratuitement.`,
          scheme: 'bearer',
          bearerFormat: 'UUID',
        },
      },
    },
    security: [
      {
        APIKey: [],
      },
    ],
  },
  apis: ['./pages/api/v1/**/*.ts'],
} as swaggerJSDoc.Options

export const doc = swaggerJSDoc(config)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json(doc)
}
