import React from 'react'
import styled from 'styled-components'

import useInteraction from 'hooks/useInteraction'

import BreadCrumb2 from './web/BreadCrumb2'
import Footer2 from './web/Footer2'
import Header2 from './web/Header2'
import Seo from './web/Seo'

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
const ToTheBottom = styled.div`
  margin-top: auto;
`

export default function Web2(props) {
  useInteraction()

  return (
    <>
      <VerticalContainer>
        <Seo
          title={props.title}
          description={props.description}
          image={props.image}
        />
        <Header2 />
        <BreadCrumb2 breadcrumb={props.breadcrumb} />
        {props.children}
        <ToTheBottom>
          <Footer2 />
        </ToTheBottom>
      </VerticalContainer>
    </>
  )
}
