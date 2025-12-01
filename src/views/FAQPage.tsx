import { FAQ } from 'types/faq'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import AllFAQs from 'components/faq/AllFAQs'

const FAQPage = ({ faqs }: { faqs: FAQ[] }) => {
  return (
    <>
      <Breadcrumbs
        links={[
          { label: 'Accueil', link: '/' },
          { link: '/doc', label: 'La doc' },
        ]}
        current='Questions fréquentes'
      />
      <AllFAQs faqs={faqs} />
    </>
  )
}

export default FAQPage
