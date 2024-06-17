'use client'

import MarkdownToJsx from 'markdown-to-jsx'
import IframeableLink from './IframeableLink'

export default function Markdown({ children, components = {}, ...otherProps }) {
  return (
    <MarkdownToJsx
      {...otherProps}
      options={{
        ...otherProps.options,
        forceBlock: true,
        overrides: {
          a: IframeableLink,
          ...components,
        },
      }}>
      {children}
    </MarkdownToJsx>
  )
}
