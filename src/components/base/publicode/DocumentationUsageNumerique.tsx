import { RulePage } from '@publicodes/react-ui'
import { Children, ReactNode } from 'react'
import useUsageNumeriqueContext from 'src/providers/UsageNumeriqueProvider'
import IframeableLink from '../IframeableLink'
import Markdown from '../Markdown'
import styles from './Documentation.module.css'

export default function DocumentationUsageNumerique({ slug }: { slug: string }) {
  const { engine } = useUsageNumeriqueContext()

  return (
    <div className={styles.publicode}>
      <RulePage
        documentationPath='/doc/usage-numerique'
        rulePath={decodeURI(slug)}
        engine={engine}
        language='fr'
        renderers={{
          Head: ({ children }) => {
            Children.forEach(children, (child: ReactNode) => {
              //@ts-expect-error: meta element
              if (child && child.type === 'title') {
                //@ts-expect-error: meta element
                document.title = `Documentation des Usages du numérique - ${child.props.children.toString()} | Impact CO₂`
              }
            })
            return null
          },
          Link: ({ to, children }) => <IframeableLink href={to || '/'}>{children}</IframeableLink>,
          Text: ({ children }) => <Markdown>{children}</Markdown>,
        }}
      />
    </div>
  )
}
