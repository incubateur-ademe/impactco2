import React, { ReactNode } from 'react'
import Card from 'components/base/Card'
import SuggestionBanner from 'components/contact/SuggestionBanner'
import BreadCrumb2 from 'components/layout/web/BreadCrumb2'
import { Background, Breadcrumb, Content } from './Contenu.styles'

const Contenu = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <>
      <Background />
      <Content>
        <Breadcrumb>
          <BreadCrumb2 breadcrumb={{ type: 'accueil', page: title }} noMargin />
        </Breadcrumb>
        {children}
        <br />
        <br />
        <Card
          href={`/rendez-vous?from=${title}&fromLabel=${title}`}
          title='Obtenir un accompagnement'
          description='Vous avez besoin d’aide pour intégrer les ressources de notre site ou souhaitez obtenir des informations ?'
          link='Prendre rendez-vous'
          image='/images/envelop.png'
          trackingCategory={title}
          trackingAction='Blocs accompagnement'
        />
      </Content>
      <SuggestionBanner from={title} fromLabel={title} simulatorName={title} />
    </>
  )
}

export default Contenu
