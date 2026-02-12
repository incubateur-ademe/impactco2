import { FAQ } from 'types/faq'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import ToolCard from 'components/cards/ToolCard'
import AllFAQs from 'components/faq/AllFAQs'
import Block from 'components/layout/Block'

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
      <Block
        as='h1'
        title='Questions fréquentes'
        description='Explorer la FAQ pour trouver les réponses à vos questions'>
        <AllFAQs faqs={faqs} />
      </Block>
      <Block>
        <ul>
          <ToolCard
            slug='faq'
            horizontal
            image='/images/doc-faq.svg'
            title='Une question plus précise ?'
            description='N’hésitez pas à nous contacter pour obtenir plus d’informations.'
            linkLabel='Nous contacter'
            link='/rendez-vous?fromLabel=faq'
          />
        </ul>
      </Block>
    </>
  )
}

export default FAQPage
