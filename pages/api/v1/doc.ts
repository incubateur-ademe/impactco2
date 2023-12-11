import { NextApiRequest, NextApiResponse } from 'next'
import swaggerJSDoc from 'swagger-jsdoc'

const config = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Impact CO2',
      description: `⚠️ Cette section est en construction ⚠️
      <br />
      L'api Impact CO2 vous permet d'automatiser le calcul de l'impact carbone. Si vous avez des idées d'améliorations ou des requêtes plus spécifiques, n'hesitez pas à nous contacter via [${process.env.CONTACT_EMAIL}](mailto:${process.env.CONTACT_EMAIL}).
      <br />
      Vous souhaitez tester un point d'api ? Cliquez sur 'Try it out', remplissez les champs et cliquez sur 'Execute' pour visualiser la donnée. Vous souhaitez recommencez ? Cliquez sur 'Clear'.`,
      version: '0.1.0',
    },
    servers: [{ url: `${process.env.NEXT_PUBLIC_URL}/api/v1` }],
    components: {
      securitySchemes: {
        APIKey: {
          type: 'http',
          description: `Nous utilisons des clés API pour monitorer son utilisation. Bien que celles ci ne soient pas obligatoire, nous nous réservons le droit de restreindre l'acces aux utilisateurs ne l'utilisant pas. N'hésitez pas à nous contacter via [${process.env.CONTACT_EMAIL}](mailto:${process.env.CONTACT_EMAIL}) pour en obtenir une gratuitement.`,
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
}

export const doc = swaggerJSDoc(config)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json(doc)
}
