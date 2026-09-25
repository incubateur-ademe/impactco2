import { ReactNode } from 'react'
import Outil from 'components/outils/Outil'
import { toolsJsonLd } from 'utils/jsonLd'
import { sensibilisationTools } from 'components/cards/tools'
import Suggestion from 'components/layout/Suggestion'
import { ToolCardProps } from 'src/components/cards/ToolCard'

const rseTool = sensibilisationTools.find((tool) => tool.slug === 'kit-rse') as ToolCardProps & {
  content: ReactNode
  toolLink?: string
  toolLinkLabel?: string
  script?: ReactNode
  noBanner?: boolean
}

export async function generateMetadata() {
  return {
    title: `${rseTool.title} | Impact CO₂`,
    description: rseTool.description?.toString(),
    openGraph: {
      creators: 'ADEME',
      images: `meta/${rseTool.slug}.png`,
    },
  }
}

const KitRSEPage = async () => {
  const jsonLd = toolsJsonLd[rseTool.slug]
  return (
    <>
      {jsonLd && <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <Outil tool={rseTool} />
      <Suggestion fromLabel={rseTool.title} simulatorName={`de l'outil ${rseTool.title}`} />
    </>
  )
}

export default KitRSEPage
