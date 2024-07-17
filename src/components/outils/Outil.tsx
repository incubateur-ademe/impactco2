import Image from 'next/image'
import React, { ReactNode, Suspense } from 'react'
import TranslationProvider from 'src/providers/TranslationProvider'
import Link from 'components/base/buttons/Link'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import Card from 'components/cards/Card'
import { ToolCardProps } from 'components/cards/ToolCard'
import Examples from 'components/examples/Examples'
import FAQs from 'components/faq/FAQs'
import Block from 'components/layout/Block'
import styles from './Outil.module.css'

const Outil = ({
  tool,
}: {
  tool: ToolCardProps & { content: ReactNode; toolLink?: string; toolLinkLabel?: string; script?: ReactNode }
}) => {
  return (
    <>
      <Breadcrumbs
        current={tool.title}
        links={[
          { label: 'Accueil', link: '/' },
          { label: 'Les outils', link: '/outils' },
        ]}
      />
      <TranslationProvider>
        <Block title={tool.title} as='h1' description={tool.description}>
          <Card className={styles.card}>
            <div className={styles.image}>
              <Image src={tool.image || `/images/banner-${tool.slug}.png`} width={736} height={180} alt='' />
            </div>
            <div className={styles.content}>{tool.content}</div>
            <div className={styles.link}>
              {tool.toolLink && tool.toolLinkLabel && (
                <Link asButton href={tool.toolLink}>
                  {tool.toolLinkLabel}
                </Link>
              )}
              {tool.script}
            </div>
          </Card>
        </Block>
        <Suspense>
          <Examples
            title='Exemples'
            description='Ils utilisent nos outils à la perfection.'
            link='/doc/exemples'
            linkLabel='Tous les exemples'
            filter={tool.title}
          />
        </Suspense>
        <Suspense>
          <FAQs filter={tool.title} page={tool.title} />
        </Suspense>
      </TranslationProvider>
    </>
  )
}

export default Outil
