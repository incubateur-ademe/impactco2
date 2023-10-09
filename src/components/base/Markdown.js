"use client";

import Link from "@/components/Link";
import MarkdownToJsx from "markdown-to-jsx";

export default function Markdown({ children, components = {}, ...otherProps }) {
  return (
    <MarkdownToJsx
      {...otherProps}
      options={{
        ...otherProps.options,
        forceBlock: true,
        overrides: {
          a: Link,
          ...components,
        },
      }}
    >
      {children}
    </MarkdownToJsx>
  );
}
