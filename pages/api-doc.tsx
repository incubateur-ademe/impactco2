import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { Section, SectionWideContent } from 'components/base/Section'
import Web from 'components/layout/Web'
import { doc } from './api/v1/doc'

const pathPriority = ['/thematiques']

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Web>
      <Section>
        <SectionWideContent>
          <SwaggerUI spec={spec} />
        </SectionWideContent>
      </Section>
    </Web>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const paths: Record<string, object> = {}

  // @ts-expect-error: No ts for doc
  pathPriority.forEach((path) => (paths[path] = doc.paths[path]))

  return {
    props: {
      // @ts-expect-error: No ts for doc
      spec: { ...doc, paths: { ...paths, ...doc.paths } },
    },
  }
}

export default ApiDoc
