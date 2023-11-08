import React, { ReactNode } from 'react'
import styled from 'styled-components'
import useInteraction from 'hooks/useInteraction'
import BreadCrumb2, { BreadcrumbProps } from './web/BreadCrumb2'
import FooterBlue from './web/FooterBlue'
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
  padding: 0 0 5rem;
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
  useInteraction()

  return (
    <>
      <Seo title={title} description={description} image={image} />
      <Wrapper>
        <Content>
          <FullScreen>
            <HeaderSweet />
            {breadcrumb && <BreadCrumb2 breadcrumb={breadcrumb} />}
            {children}
          </FullScreen>
          <FooterBlue />
        </Content>
      </Wrapper>
    </>
  )
}
