import { InferGetStaticPropsType } from 'next'
import Link, { LinkProps } from 'next/link'
import { NotionAPI } from 'notion-client'
import React, { ReactNode } from 'react'
import { NotionRenderer } from 'react-notion-x'
import 'react-notion-x/src/styles.css'
import Contenu from 'components/contenu/Contenu'
import Web from 'components/layout/Web'

export async function getStaticProps() {
  const notion = new NotionAPI()
  const recordMap = await notion.getPage('0f02e38226d44c40bf0aeb5fbcd61ee8')

  const revalidate = process.env.NOTION_CONTENT_REVALIDATE && Number.parseInt(process.env.NOTION_CONTENT_REVALIDATE)
  return {
    props: {
      recordMap,
    },
    revalidate: revalidate && !Number.isNaN(revalidate) ? revalidate : 1,
  }
}

const SkiPage = ({ recordMap }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Web
      title='4 conseils pour réduire l’impact carbone des séjours au ski'
      image='/meta/impact-carbone-hiver-station-ski.png'
      description="Sensibiliser le public à des pratiques durables afin de réduire l'impact écologique des séjours.">
      <Contenu title='4 conseils pour réduire l’impact carbone des stations de ski'>
        <NotionRenderer
          recordMap={recordMap}
          fullPage={true}
          disableHeader
          isLinkCollectionToUrlProperty
          components={{
            Link: ({ href, children, ...props }: LinkProps & { children: ReactNode }) => {
              if (href.toString().startsWith('https://sources/')) {
                return (
                  <button
                    className='notion-link'
                    onClick={() => {
                      const block = document.getElementsByClassName(
                        `notion-block-${href.toString().replace('https://sources/', '')}`
                      )
                      if (block && block[0]) {
                        block[0].scrollIntoView({ behavior: 'smooth' })
                      }
                    }}>
                    {children}
                  </button>
                )
              }
              return (
                <Link href={href} {...props}>
                  {children}
                </Link>
              )
            },
          }}
        />
      </Contenu>
    </Web>
  )
}

export default SkiPage
