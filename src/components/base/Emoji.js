import React from "react";
import styled from "styled-components";
import twemoji from "twemoji";

const Wrapper = styled.span`
  display: inline-block;
  font-style: normal;
  vertical-align: middle;

  img {
    display: inline-block;
    height: 1em;
    width: auto;
  }
`;

export default function Emoji(props) {
  let stringDOMforEmoji = null;

  if (props.children) {
    let parsed = twemoji.parse(props.children, {
      folder: "svg",
      ext: ".svg",
      base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/",
    });

    stringDOMforEmoji = parsed.replaceAll(/alt=".*?"/g, "");
  }

  return stringDOMforEmoji ? (
    <Wrapper
      dangerouslySetInnerHTML={{
        __html: stringDOMforEmoji,
      }}
      className={props.className}
      onClick={props.onClick || (() => null)}
    />
  ) : (
    ""
  );
}
