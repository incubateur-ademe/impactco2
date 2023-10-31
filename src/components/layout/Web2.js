import React from 'react'
import styled from 'styled-components'
import useInteraction from 'hooks/useInteraction'
import BreadCrumb2 from './web/BreadCrumb2'
import Footer from './web/Footer'
import HeaderSweet from './web/HeaderSweet'
import Seo from './web/Seo'

const VerticalContainer = styled.div``

export default function Web2(props) {
  useInteraction()

  return (
    <>
      <VerticalContainer className={props.theme === 'night' ? 'bl' : 'r'}>
        <Seo title={props.title} description={props.description} image={'metalivraison.png'} />
        <HeaderSweet />
        <BreadCrumb2 breadcrumb={props.breadcrumb} />
        {props.children}
        <Footer />
      </VerticalContainer>
    </>
  )
}
