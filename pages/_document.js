import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html lang='fr'>
        <Head>
          <link
            rel='preload'
            href='/fonts/Marianne-Light.woff2'
            as='font'
            type='font/woff'
            crossOrigin=''
          />
          <link
            rel='preload'
            href='/fonts/Marianne-ExtraBold.woff2'
            as='font'
            type='font/woff'
            crossOrigin=''
          />
          <link
            rel='preload'
            href='/fonts/Marianne-Medium.woff2'
            as='font'
            type='font/woff'
            crossOrigin=''
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
