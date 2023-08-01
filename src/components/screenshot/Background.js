import useIframe from "hooks/useIframe";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => (!props.background || props.hover ? "transparent" : props.theme.colors.second)};
  border: 0.125rem solid ${(props) => (props.hover ? props.theme.colors.main : "transparent")};
  border-radius: 1rem;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;

  ${(props) => props.theme.mq.medium} {
    border-width: ${(props) => (props.iframe ? "0.125rem" : 0)};
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 1.5rem;
  position: relative;

  ${(props) => props.theme.mq.medium} {
    padding: 1.5rem 0.75rem;
  }
`;
export default function Background(props) {
  const iframe = useIframe();

  return (
    <>
      <Wrapper className="noscreenshot" background={props.background} hover={props.hover} iframe={iframe} />
      <Content>{props.children}</Content>
    </>
  );
}
