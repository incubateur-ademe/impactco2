import { FontStyle, FontWeight } from 'next/dist/compiled/@vercel/og/satori'
import { ImageResponse } from 'next/og'
import { NextRequest, NextResponse } from 'next/server'
import Comparateur from 'components/metaImages/Comparateur'

export const runtime = 'edge'

const getFont = async (url: URL) => {
  const res = await fetch(url)
  return await res.arrayBuffer()
}

let fonts: { name: string; data: ArrayBuffer; style: FontStyle; weight: FontWeight }[] = []

export async function GET(req: NextRequest) {
  if (process.env.NO_IMAGE === 'true') {
    return NextResponse.json(`Please use ${process.env.NEXT_PUBLIC_IMAGE_URL}`, { status: 400 })
  }

  if (fonts.length === 0) {
    fonts = (
      await Promise.all([
        getFont(new URL('https://cdn.jsdelivr.net/npm/@gouvfr/dsfr/dist/fonts/Marianne-Regular.woff', import.meta.url)),
        getFont(new URL('https://cdn.jsdelivr.net/npm/@gouvfr/dsfr/dist/fonts/Marianne-Medium.woff', import.meta.url)),
        getFont(new URL('https://cdn.jsdelivr.net/npm/@gouvfr/dsfr/dist/fonts/Marianne-Bold.woff', import.meta.url)),
      ])
    ).map((font, index) => ({
      name: 'Marianne',
      data: font,
      style: 'normal',
      weight: index === 0 ? 400 : index === 1 ? 500 : index === 2 ? 700 : 900,
    }))
  }

  const { searchParams } = new URL(req.url)
  return new ImageResponse(
    (
      <Comparateur
        value={Number(searchParams.get('value') || '100') * 1000}
        equivalent={searchParams.get('equivalent')}
        comparisons={(searchParams.get('comparisons') || 'ananas,voiturethermique,tgv,smartphone,pomme')
          .replace(/ /g, '+')
          .split(',')}
        language={searchParams.get('language') || 'fr'}
      />
    ),
    {
      width: 1200,
      height: 630,
      fonts,
    }
  )
}
