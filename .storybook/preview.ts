import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { Preview } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import '../src/utils/fonts.css'
import { themes } from '../src/utils/styles'
import '../src/utils/variables.css'

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
  withThemeFromJSXProvider({
    themes,
    defaultTheme: 'default',
    Provider: ThemeProvider,
  }),
]

export default preview
