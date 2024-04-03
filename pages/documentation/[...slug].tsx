import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import BreadCrumb3 from 'components/layout/web/BreadCrumb3'
import Footer from 'components/layout/web/Footer'
import HeaderSweet from 'components/layout/web/Header'
import Seo from 'components/layout/web/Seo'
import { RulesProviderLivraison } from 'components/livraison/RulesProviderLivraison'

export default function Documentation() {
  const router = useRouter()
  const rootDoc = 'livraison'

  const DocumentationLivraison = dynamic(() => import('components/base/DocumentationLivraison'), {
    ssr: false,
  })

  return (
    <>
      <RulesProviderLivraison>
        <Seo
          title={"Documentation de l'impact de la livraison"}
          description={"Documentation de l'impact de la livraison d’un colis sur le climat"}
          image={'meta/livraison.png'}
        />
        <HeaderSweet />
        <BreadCrumb3 />
        <DocumentationLivraison slug={(router?.query?.slug as string[])?.join('/') || rootDoc} />
        <Footer />
      </RulesProviderLivraison>
    </>
  )
}
