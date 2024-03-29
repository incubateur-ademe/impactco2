import { InferGetStaticPropsType } from 'next'
import React from 'react'
import Notion from 'components/Notion/Notion'
import { getNotionContentProps } from 'components/Notion/utils'
import Web from 'components/layout/Web'

const title = 'Le Détecteur CO₂'
export async function getStaticProps() {
  return getNotionContentProps('51206793c21f49298672ede4bd19b7a4')
}

const FAQPage = ({ recordMap }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Web title={title} description='Le “Détecteur CO₂” : un nouvel outil de l’ADEME pour les médias et entreprises'>
      <Notion title={title} recordMap={recordMap} />
    </Web>
  )
}

export default FAQPage
