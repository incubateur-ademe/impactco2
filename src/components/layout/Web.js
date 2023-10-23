import BreadCrumb from "./web/BreadCrumb";

import FooterBlue from "./web/FooterBlue";
import HeaderSweet from "./web/HeaderSweet";
import Seo from "./web/Seo";
import useInteraction from "hooks/useInteraction";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
const FullScreen = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 0 5rem;
  position: relative;
`;
export default function Web(props) {
  useInteraction();

  return (
    <>
      <Seo title={props.title} description={props.description} image={props.image} />
      <Wrapper>
        <Content>
          <FullScreen>
            <HeaderSweet />
            <BreadCrumb breadcrumb={props.breadcrumb} />
            {props.children}
          </FullScreen>
          <FooterBlue />
        </Content>
      </Wrapper>
    </>
  );
}
