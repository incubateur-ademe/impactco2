import { GlobalStyle } from 'utils/styles'

import StyleProvider from 'components/providers/StyleProvider'
import ModalProvider from 'components/providers/ModalProvider'
import UXProvider from 'components/providers/UXProvider'
import DataProvider from 'components/providers/DataProvider'

function MyApp({ Component, pageProps }) {
  return (
    <StyleProvider>
      <UXProvider>
        <DataProvider>
          <ModalProvider>
            <GlobalStyle />
            <Component {...pageProps} />
          </ModalProvider>
        </DataProvider>
      </UXProvider>
    </StyleProvider>
  )
}

export default MyApp
