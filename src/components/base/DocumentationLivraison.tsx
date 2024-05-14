import Link from 'next/link'
import { RulePage } from 'publicodes-react'
import useLivraisonContext from 'src/providers/LivraisonProvider'
import Markdown from './Markdown'

export default function DocumentationLivraison({ slug }: { slug: string }) {
  const { engine } = useLivraisonContext()

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
