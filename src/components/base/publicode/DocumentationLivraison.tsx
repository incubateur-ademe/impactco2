import { RulePage } from '@publicodes/react-ui'
import useLivraisonContext from 'src/providers/LivraisonProvider'
import IframeableLink from '../IframeableLink'
import Markdown from '../Markdown'
import styles from './Documentation.module.css'

export default function DocumentationLivraison({ slug }: { slug: string }) {
  const { engine } = useLivraisonContext()

  return (
    <div className={styles.publicode}>
      <RulePage
        documentationPath='/doc/livraison'
        rulePath={decodeURI(slug)}
        engine={engine}
        language='fr'
        renderers={{
          Link: ({ to, children }) => <IframeableLink href={to || '/'}>{children}</IframeableLink>,
          Text: ({ children }) => <Markdown>{children}</Markdown>,
        }}
      />
    </div>
  )
}
