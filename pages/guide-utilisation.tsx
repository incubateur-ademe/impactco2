import { InferGetStaticPropsType } from 'next'
import React from 'react'
import Notion from 'components/Notion/Notion'
import { getNotionContentProps } from 'components/Notion/utils'
import Web from 'components/layout/Web'

const title = "Guide d'utilisation"
export async function getStaticProps() {
  return getNotionContentProps('b9d08930a49a4346830b7a12fd7cb733')
}

const GuideUtilisationPage = ({ recordMap }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Web title={title} description='Comment utiliser les ressources Impact CO₂.'>
      <Notion title={title} recordMap={recordMap} />
    </Web>
  )
}

export default GuideUtilisationPage
