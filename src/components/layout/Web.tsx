import React, { ReactNode } from 'react'
import styled from 'styled-components'
import BreadCrumb2, { BreadcrumbProps } from './web/BreadCrumb2'
import Footer from './web/Footer'
import HeaderSweet from './web/HeaderSweet'
import Seo from './web/Seo'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`
const FullScreen = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;
`

const Children = styled.div`
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
      <Wrapper>
        <Content>
          <FullScreen>
            <HeaderSweet />
            {breadcrumb && <BreadCrumb2 breadcrumb={breadcrumb} />}
            <Children>{children}</Children>
          </FullScreen>
          <Footer />
        </Content>
      </Wrapper>
    </>
  )
}
