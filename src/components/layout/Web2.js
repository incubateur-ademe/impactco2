import React from 'react'

import useInteraction from 'hooks/useInteraction'

import BreadCrumb from './web/BreadCrumb'
import Footer2 from './web/Footer2'
import Header2 from './web/Header2'
import Seo from './web/Seo'

export default function Web2(props) {
  useInteraction()

  return (
    <>
      <Seo
        title={props.title}
        description={props.description}
        image={props.image}
      />
      <Header2 />
      <BreadCrumb breadcrumb={props.breadcrumb} />
      {props.children}
      <Footer2 />
    </>
  )
}
