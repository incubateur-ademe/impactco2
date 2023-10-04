import BreadCrumb2 from "./web/BreadCrumb2";
import Footer from "./web/Footer";
import Header from "./web/Header";
import Nav from "./web/Nav";
import Seo from "./web/Seo";
import useInteraction from "hooks/useInteraction";
import React from "react";
import styled from "styled-components";

const VerticalContainer = styled.div``;

export default function Web2(props) {
  useInteraction();

  return (
    <>
      <VerticalContainer className={props.theme === "night" ? "bl" : "r"}>
        <Seo title={props.title} description={props.description} image={"metalivraison.png"} />
        <Header />
        <Nav />
        <BreadCrumb2 breadcrumb={props.breadcrumb} />
        {props.children}
        <Footer />
      </VerticalContainer>
    </>
  );
}
