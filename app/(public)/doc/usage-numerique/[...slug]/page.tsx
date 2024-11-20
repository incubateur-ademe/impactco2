import { Metadata } from 'next'
import DocumentationUsageNumeriqueSlugPage from 'src/views/DocumentationUsageNumeriqueSlugPage'

export const metadata: Metadata = {
  title: 'Documentation des Usages du numérique | Impact CO₂',
  description: "Documentation du simulateur usage numérique d'Impact CO₂.",
  openGraph: {
    creators: 'ADEME',
    images: `${process.env.NEXT_PUBLIC_URL}/meta/usagenumerique.png`,
  },
}

export default async function Documentation(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params

  const { slug } = params

  return <DocumentationUsageNumeriqueSlugPage slug={slug.join('/')} />
}
