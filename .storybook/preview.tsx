import { Preview } from '@storybook/react'
import React from 'react'
import { GlobalStyle, themes } from '../src/utils/styles'
import '../src/utils/variables.css'
import { StyleProvider } from '../src/components/providers/StyleProvider'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export const decorators = [
  (story) => (
    <StyleProvider>
      <GlobalStyle />
      {story()}
    </StyleProvider>
  ),
]

export default preview
