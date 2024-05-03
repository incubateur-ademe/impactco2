'use client'

import MarkdownToJsx from 'markdown-to-jsx'
import NextLink from 'next/link'

export default function Markdown({ children, components = {}, ...otherProps }) {
  return (
    <MarkdownToJsx
      {...otherProps}
      options={{
        ...otherProps.options,
        forceBlock: true,
        overrides: {
          a: NextLink,
          ...components,
        },
      }}>
      {children}
    </MarkdownToJsx>
  )
}
