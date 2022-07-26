import React from 'react'
import styled from 'styled-components'

import useInteraction from 'hooks/useInteraction'
import Seo from './web/Seo'
import Header from './web/Header'
import Nav from './web/Nav'
import BreadCrumb from './web/BreadCrumb'
import Footer from './web/Footer'
import Modals from 'components/modals/Modals'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`
const FullScreen = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 0 5rem;
`
export default function Web(props) {
  useInteraction()

  return (
    <>
      <Seo title={props.title} image={props.image} />
      <Wrapper>
        <Content>
          <FullScreen>
            <Header />
            <Nav />
            <BreadCrumb breadcrumb={props.breadcrumb} />
            {props.children}
          </FullScreen>
          <Footer />
        </Content>
        <Modals />
      </Wrapper>
    </>
  )
}
