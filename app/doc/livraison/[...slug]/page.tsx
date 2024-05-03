import DocumentationLivraisonSlugPage from 'components/pages/DocumentationLivraisonSlugPage'

export default function Documentation({ params: { slug } }: { params: { slug: string[] } }) {
  return <DocumentationLivraisonSlugPage slug={slug.join('/')} />
}
