import React, { ReactNode } from 'react'
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
      </Content>
    </>
  )
}

export default Contenu
