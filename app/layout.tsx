import { Metadata } from 'next'
import React from 'react'
import 'src/providers/stores/theme'
import 'utils/fonts.css'
import 'utils/styles.css'
import 'utils/variables.css'
import Matomo from 'components/matomo/Matomo'
import Transtack from 'components/transtack/Transtack'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || ''),
  title: 'Impact CO₂',
  description:
    "Sensibiliser sa communauté grâce aux ressources ludiques et pédagogiques de l'ADEME sur l’impact carbone des gestes et objets du quotidien.",
  openGraph: {
    creators: 'ADEME',
    images: `${process.env.NEXT_PUBLIC_URL}/meta/main.png`,
  },
}

const fonts = [
  'https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.12.1/dist/fonts/Marianne-Regular.woff2',
  'https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.12.1/dist/fonts/Marianne-Medium.woff2',
  'https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.12.1/dist/fonts/Marianne-Bold.woff2',
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
        <Transtack>{children}</Transtack>
      </body>
    </html>
  )
}

export default RootLayout
