import { Metadata } from 'next'
import DocumentationLivraisonSlugPage from 'src/views/DocumentationLivraisonSlugPage'

export const metadata: Metadata = {
  title: 'Documentation de la livraison | Impact CO₂',
  description: "Documentation du simulateur livraison d'Impact CO₂.",
  openGraph: {
    creators: 'ADEME',
    images: `${process.env.NEXT_PUBLIC_URL}/meta/livraison.png`,
  },
}

export default function Documentation({ params: { slug } }: { params: { slug: string[] } }) {
  return <DocumentationLivraisonSlugPage slug={slug.join('/')} />
}
