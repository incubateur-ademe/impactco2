import React, { ReactNode } from 'react'
import styled from 'styled-components'
import BreadCrumb2, { BreadcrumbProps } from './web/BreadCrumb2'
import Footer from './web/Footer'
import HeaderSweet from './web/HeaderSweet'
import Seo from './web/Seo'

const Children = styled.main`
  position: relative;
`

export default function Web({
  title,
  description,
  image,
  breadcrumb,
  children,
}: {
  title?: string
  description?: string
  image?: string
  breadcrumb?: BreadcrumbProps
  children: ReactNode
}) {
  return (
    <>
      <Seo title={title} description={description} image={image} />
      <HeaderSweet />
      {breadcrumb && <BreadCrumb2 breadcrumb={breadcrumb} />}
      <Children id='contenu'>{children}</Children>
      <Footer />
    </>
  )
}
