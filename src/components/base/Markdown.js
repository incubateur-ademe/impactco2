"use client";

import MarkdownToJsx from "markdown-to-jsx";
import NextLink from "next/link";
import styled from "styled-components";

export default function Markdown({ children, components = {}, ...otherProps }) {
  return (
    <MarkdownToJsx
      {...otherProps}
      options={{
        ...otherProps.options,
        forceBlock: true,
        overrides: {
          a: TheLink,
          ...components,
        },
      }}
    >
      {children}
    </MarkdownToJsx>
  );
}

const TheLink = styled(NextLink)`
  background-color: red;
`;
