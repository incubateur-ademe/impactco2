import { GetStaticProps, InferGetStaticPropsType } from 'next'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { doc } from './api/v1/doc'

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      spec: doc,
    },
  }
}

export default ApiDoc
