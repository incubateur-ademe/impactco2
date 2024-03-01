import { InferGetStaticPropsType } from 'next'
import React from 'react'
import Notion from 'components/Notion/Notion'
import { getNotionContentProps } from 'components/Notion/utils'
import Web from 'components/layout/Web'

const title = '4 conseils pour réduire l’impact carbone des séjours au ski'
export async function getStaticProps() {
  return getNotionContentProps('519fba8721a445e3b9cb10a6fa4d5208')
}

const SkiPage = ({ recordMap }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Web
      title={title}
      image='/meta/impact-carbone-hiver-station-ski.png'
      description="Sensibiliser le public à des pratiques durables afin de réduire l'impact écologique des séjours.">
      <Notion title={title} recordMap={recordMap} />
    </Web>
  )
}

export default SkiPage
