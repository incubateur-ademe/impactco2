import React from 'react'
import styled from 'styled-components'

import useInteraction from 'hooks/useInteraction'

import BreadCrumb from './web/BreadCrumb'
import Footer2 from './web/Footer2'
import Header2 from './web/Header2'
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
export default function Web2(props) {
  useInteraction()

  return (
    <>
      <Seo
        title={props.title}
        description={props.description}
        image={props.image}
      />
      <Wrapper>
        <Content>
          <FullScreen>
            <Header2 />
            <BreadCrumb breadcrumb={props.breadcrumb} />
            {props.children}
          </FullScreen>
          <Footer2 />
        </Content>
      </Wrapper>
    </>
  )
}
