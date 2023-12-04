import { GetStaticProps, InferGetStaticPropsType } from 'next'
import swaggerJsdoc from 'swagger-jsdoc'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

const swaggerDoc = {
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

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />
}

export const getStaticProps: GetStaticProps = async () => {
  const spec = swaggerJsdoc(swaggerDoc)
  return {
    props: {
      spec,
    },
  }
}

export default ApiDoc
