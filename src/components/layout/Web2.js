import BreadCrumb2 from "./web/BreadCrumb2";
import Footer2 from "./web/Footer2";
import Header2 from "./web/Header2";
import Seo from "./web/Seo";
import useInteraction from "hooks/useInteraction";
import React from "react";
import styled from "styled-components";

const VerticalContainer = styled.div``;

export default function Web2(props) {
  useInteraction();

  return (
    <>
      <VerticalContainer>
        <Seo title={props.title} description={props.description} image={"metalivraison.png"} />
        <Header2 />
        <BreadCrumb2 breadcrumb={props.breadcrumb} />
        {props.children}
        <Footer2 />
      </VerticalContainer>
    </>
  );
}
