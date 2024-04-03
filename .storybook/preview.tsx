import { Preview } from '@storybook/react'
import React, { useEffect } from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { GlobalStyle } from '../src/utils/styles'
import '../src/utils/styles.css'
import '../src/utils/variables.css'
import useTheme from '../src/components/layout/UseTheme'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      darkClass: 'night',
      classTarget: 'body',
    },
  },
}

export const decorators = [
  (story) => {
    useTheme()
    const defaultTheme = useDarkMode()

    useEffect(() => {
      if (defaultTheme) {
        document.body.classList.add('night')
      } else {
        document.body.classList.remove('night')
      }
    }, [defaultTheme])

    return (
      <>
        <GlobalStyle />
        {story()}
      </>
    )
  },
]

export default preview
