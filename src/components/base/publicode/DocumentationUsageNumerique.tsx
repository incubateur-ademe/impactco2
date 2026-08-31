import { RulePage } from '@publicodes/react-ui'
import { Children, ReactNode } from 'react'
import useUsageNumeriqueContext from 'src/providers/UsageNumeriqueProvider'
import Markdown from '../Markdown'
import Link from '../buttons/Link'
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
          Link: ({ to, children }) => (
            <Link href={to || '/'} prefetch={false}>
              {children}
            </Link>
          ),
          Text: ({ children }) => <Markdown>{children}</Markdown>,
        }}
      />
    </div>
  )
}
