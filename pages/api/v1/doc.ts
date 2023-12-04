import { NextApiRequest, NextApiResponse } from 'next'
import swaggerJSDoc from 'swagger-jsdoc'

const config = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Impact CO2',
      version: '0.1.0',
    },
    components: {
      securitySchemes: {
        APIKey: {
          type: 'http',
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
