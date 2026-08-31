'use client'

import MarkdownToJsx, { MarkdownToJSX } from 'markdown-to-jsx'
import { ReactNode } from 'react'
import Link from './buttons/Link'

export default function Markdown({
  children,
  components = {},
  ...otherProps
}: {
  children: string | null | undefined
  components?: Record<string, ReactNode>
  options?: MarkdownToJSX.Options
}) {
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
      }}>
      {children}
    </MarkdownToJsx>
  )
}
