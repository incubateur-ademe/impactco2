import { Metadata } from 'next'
import Head from 'next/head'
import React from 'react'
import 'utils/styles.css'
import 'utils/variables.css'
import { ParamProvider } from 'components/providers/ParamProvider'
import Theme from 'components/layout/Theme'
import Footer from 'components/layout/web/Footer'
import Header from 'components/layout/web/Header'
import Matomo from 'components/matomo/Matomo'
import Transtack from 'components/transtack/Transtack'

export const metadata: Metadata = {
  title: 'Accueil | Impact CO₂',
  description:
    "Sensibilisez votre communauté grâce aux ressources sur l’impact carbone des gestes et objets du quotidien,  issue des données environnementales de l'ADEME.",
  openGraph: {
    creators: 'ADEME',
    images: `${process.env.NEXT_PUBLIC_URL}/meta/image.png`,
  },
}

const fonts = [
  '/fonts/Marianne-Light.woff2',
  '/fonts/Marianne-Light_Italic.woff2',
  '/fonts/Marianne-Regular.woff2',
  '/fonts/Marianne-Regular_Italic.woff2',
  '/fonts/Marianne-Medium.woff2',
  '/fonts/Marianne-Medium_Italic.woff2',
  '/fonts/Marianne-Bold.woff2',
  '/fonts/Marianne-Bold_Italic.woff2',
  '/fonts/Marianne-ExtraBold.woff2',
  '/fonts/Marianne-ExtraBold_Italic.woff2',
]

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='fr'>
      <Head>
        {fonts.map((font) => (
          <link key={font} rel='preload' href={font} as='font' type='font/woff2' crossOrigin='anonymous' />
        ))}
      </Head>
      <body>
        <Matomo />
        <Theme />
        <Transtack>
          <Header />
          <ParamProvider>
            <main id='contenu'>{children}</main>
          </ParamProvider>
          <Footer />
        </Transtack>
      </body>
    </html>
  )
}

export default RootLayout
