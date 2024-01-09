import React from 'react'
import { Preview } from '@storybook/react'
import { GlobalStyle, themes } from '../src/utils/styles'
import { StyleProvider } from '../src/components/providers/StyleProvider'
import '../src/utils/variables.css'
import '../src/utils/fonts.css'

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
  (story) => <StyleProvider><GlobalStyle/>{story()}</StyleProvider>
]

export default preview
