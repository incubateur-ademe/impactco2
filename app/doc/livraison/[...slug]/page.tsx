import DocumentationLivraisonSlugPage from 'src/views/DocumentationLivraisonSlugPage'

export default function Documentation({ params: { slug } }: { params: { slug: string[] } }) {
  return <DocumentationLivraisonSlugPage slug={slug.join('/')} />
}
