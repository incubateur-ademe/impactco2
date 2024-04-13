import Image from 'next/image'
import React, { ReactNode } from 'react'
import Link from 'components/base/buttons/Link'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import Card from 'components/cards/Card'
import { ToolCardProps } from 'components/cards/ToolCard'
import Block from 'components/layout/web/Block'
import styles from './Outil.module.css'

const Outil = ({ tool }: { tool: ToolCardProps & { content: ReactNode; toolLink: string; toolLinkLabel: string } }) => {
  return (
    <>
      <Breadcrumbs
        current={tool.title}
        links={[
          { label: 'Accueil', link: '/' },
          { label: 'Les outils', link: '/outils' },
        ]}
      />
      <Block title={tool.title} as='h1' description={tool.description}>
        <Card>
          <div className={styles.image}>
            <Image src={tool.image || `/images/tool-${tool.slug}.svg`} width={88} height={88} alt='' />
          </div>
          <div className={styles.content}>{tool.content}</div>
          <div className={styles.link}>
            <Link asButton href={tool.toolLink}>
              {tool.toolLinkLabel}
            </Link>
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
    </>
  )
}

export default Outil
