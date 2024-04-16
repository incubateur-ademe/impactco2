import { InferGetStaticPropsType } from 'next'
import Script from 'next/script'
import React, { useEffect } from 'react'
import Notion from 'components/Notion/Notion'
import { getNotionContentProps } from 'components/Notion/utils'
import Web from 'components/layout/Web'

const title = 'Le Détecteur CO₂'
export async function getStaticProps() {
  return getNotionContentProps('51206793c21f49298672ede4bd19b7a4')
}

const FAQPage = ({ recordMap }: InferGetStaticPropsType<typeof getStaticProps>) => {
  useEffect(() => {
    // @ts-expect-error: Loaded by script
    if (window.impactCO2Detection) {
      // @ts-expect-error: Loaded by script
      window.impactCO2Detection()
    }
  }, [])

  return (
    <>
      <Web
        title={title}
        description='Le “Détecteur CO₂” : un nouvel outil de l’ADEME pour les médias et entreprises'
        image='/meta/detecteur-co2.png'>
        <Notion title={title} recordMap={recordMap} />
      </Web>
      <Script
        src='/scripts/detection-async.js'
        onLoad={() => {
          // @ts-expect-error: Loaded by script
          window.impactCO2Detection()
        }}
      />
    </>
  )
}

export default FAQPage
