import { Metadata } from 'next'
import React, { Suspense } from 'react'
import { ParamProvider } from 'src/providers/ParamProvider'
import 'utils/styles.css'
import 'utils/variables.css'
import Footer from 'components/layout/Footer'
import Header from 'components/layout/Header'
import Theme from 'components/layout/Theme'
import Matomo from 'components/matomo/Matomo'
import Transtack from 'components/transtack/Transtack'

export const metadata: Metadata = {
  title: 'Impact CO₂',
  description:
    "Sensibilisez votre communauté grâce aux ressources sur l’impact carbone des gestes et objets du quotidien, issue des données environnementales de l'ADEME.",
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
      <head>
        {fonts.map((font) => (
          <link key={font} rel='preload' href={font} as='font' type='font/woff2' crossOrigin='anonymous' />
        ))}
      </head>
      <body>
        <Matomo />
        <Theme />
        <Transtack>
          <Header />
          <Suspense fallback={<div className='blank' />}>
            <ParamProvider>
              <main id='contenu'>{children}</main>
            </ParamProvider>
          </Suspense>
          <Footer />
        </Transtack>
      </body>
    </html>
  )
}

export default RootLayout
