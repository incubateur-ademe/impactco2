import { ReactNode } from 'react'
import Outil from 'components/outils/Outil'
import RedirectCalendar from 'src/components/outils/kitRse/RedirectCalendar'
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
    description:
      'Vous êtes en charge des sujets RSE/RSO dans votre organisation ? Chaque année, l’ADEME met à votre disposition des kits de communication liés aux temps forts RSE, gratuits et prêts à l’emploi.',
    openGraph: {
      creators: 'ADEME',
      images: `meta/${rseTool.slug}.webp`,
    },
  }
}

const KitRSEPage = async () => {
  const jsonLd = toolsJsonLd[rseTool.slug]
  return (
    <>
      {jsonLd && <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <RedirectCalendar />
      <Outil tool={rseTool} />
      <Suggestion fromLabel={rseTool.title} simulatorName={`de l'outil ${rseTool.title}`} />
    </>
  )
}

export default KitRSEPage
