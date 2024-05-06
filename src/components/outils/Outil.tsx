import Image from 'next/image'
import React, { ReactNode } from 'react'
import TranslationProvider from 'src/providers/TranslationProvider'
import ClipboardBox from 'components/base/ClipboardBox'
import Link from 'components/base/buttons/Link'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import Card from 'components/cards/Card'
import { ToolCardProps } from 'components/cards/ToolCard'
import Block from 'components/layout/Block'
import styles from './Outil.module.css'

const Outil = ({
  tool,
}: {
  tool: ToolCardProps & { content: ReactNode; toolLink?: string; toolLinkLabel?: string; clipboardURL?: string }
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
              {tool.clipboardURL && (
                <>
                  <div className={styles.clipboardTitle}>Comment l'utiliser ?</div>
                  <ClipboardBox tracking='Detecteur carbone'>{tool.clipboardURL}</ClipboardBox>
                </>
              )}
            </div>
          </Card>
        </Block>
        <Block
          title='Exemples'
          description='Ils utilisent nos outils à la perfection.'
          link='/exemples'
          linkLabel='Tous les exemples'>
          TODO
        </Block>
      </TranslationProvider>
    </>
  )
}

export default Outil
