import copy from "copy-to-clipboard";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 3rem;
  position: relative;
`;
const Text = styled.input`
  background: #f9f7f8;
  border: none;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  display: block;
  line-height: inherit;
  overflow: hidden;
  padding: 1rem 2rem;
  position: relative;
  white-space: nowrap;
  width: 100%;

  &:before {
    bottom: 0;
    color: ${(props) => props.theme.colors.main};
    content: "Copié !";
    font-size: 0.875em;
    opacity: ${(props) => (props.copied ? 1 : 0)};
    position: absolute;
    right: 0;
    transition: opacity 200ms ease-out;
  }
`;
const Copy = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 0.5rem 0.5rem 0 0;
  bottom: 0;
  color: #457be7;
  cursor: pointer;
  height: 100%;
  padding: 0.5rem 0.3rem 0.5rem 1rem;
  position: absolute;
  right: 0;

  &:focus {
    outline: none;
  }
`;
const Check = styled.svg`
  display: ${(props) => (props.copied ? "inline-block" : "none")};
  height: auto;
  opacity: ${(props) => (props.copied ? 1 : 0)};
  transition: opacity 200ms ease-out;
  vertical-align: top;
  width: 1rem;
  path {
    fill: #457be7;
  }
`;
const UnCheck = styled.svg`
  display: ${(props) => (props.copied ? "none" : "inline-block")};
  height: auto;
  opacity: ${(props) => (props.copied ? 0 : 1)};
  transition: opacity 200ms ease-out;
  vertical-align: top;
  width: 1rem;
  path {
    fill: #457be7;
  }
`;

export default function CopyUrl(props) {
  return (
    <Wrapper>
      <Text
        readOnly={true}
        value={props.url}
        onClick={() => {
          if (copy(props.url)) {
            props.setCopied(true);
          }
        }}
      />
      <Copy
        onClick={() => {
          if (copy(props.url)) {
            props.setCopied(true);
          }
        }}
      >
        <Check copied={props.copied} height="16px" viewBox="0 0 16 16" width="16px">
          <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
        </Check>
        <UnCheck copied={props.copied} height="16px" viewBox="0 0 16 16" width="16px">
          <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
        </UnCheck>{" "}
        Copier le lien
      </Copy>
    </Wrapper>
  );
}
