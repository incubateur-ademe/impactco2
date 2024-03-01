import { InferGetStaticPropsType } from 'next'
import React from 'react'
import Notion from 'components/Notion/Notion'
import { getNotionContentProps } from 'components/Notion/utils'
import Web from 'components/layout/Web'

const title = 'Questions fréquentes'
export async function getStaticProps() {
  return getNotionContentProps('090ceb3f28ef473d9c8e9d13b61e1332')
}

const FAQPage = ({ recordMap }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Web title={title} description='Les questions fréquentes à propos de Impact CO₂.'>
      <Notion title={title} recordMap={recordMap} />
    </Web>
  )
}

export default FAQPage
