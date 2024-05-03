import Link from 'next/link'
import { RulePage } from 'publicodes-react'
import useRulesContextLivraison from 'components/providers/RulesProviderLivraison'
import Markdown from './Markdown'

export default function DocumentationLivraison({ slug }: { slug: string }) {
  const { engine } = useRulesContextLivraison()

  return (
    <RulePage
      documentationPath='/doc/livraison'
      rulePath={slug}
      engine={engine}
      language='fr'
      renderers={{
        Link: ({ to, children }) => <Link href={to || '/'}>{children}</Link>,
        Text: ({ children }) => <Markdown>{children}</Markdown>,
      }}
    />
  )
}
