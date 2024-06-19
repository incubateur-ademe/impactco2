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

export default function Documentation({ params: { slug } }: { params: { slug: string[] } }) {
  return <DocumentationUsageNumeriqueSlugPage slug={slug.join('/')} />
}
