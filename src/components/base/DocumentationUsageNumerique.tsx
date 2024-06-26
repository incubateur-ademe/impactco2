import { RulePage } from '@publicodes/react-ui'
import useUsageNumeriqueContext from 'src/providers/UsageNumeriqueProvider'
import IframeableLink from './IframeableLink'
import Markdown from './Markdown'

export default function DocumentationUsageNumerique({ slug }: { slug: string }) {
  const { engine } = useUsageNumeriqueContext()

  return (
    <RulePage
      documentationPath='/doc/usage-numerique'
      rulePath={decodeURI(slug)}
      engine={engine}
      language='fr'
      renderers={{
        Link: ({ to, children }) => <IframeableLink href={to || '/'}>{children}</IframeableLink>,
        Text: ({ children }) => <Markdown>{children}</Markdown>,
      }}
    />
  )
}
