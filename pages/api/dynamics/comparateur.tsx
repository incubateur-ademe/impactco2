import { NextApiResponse } from 'next'
import { FontStyle, FontWeight } from 'next/dist/compiled/@vercel/og/satori'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import Comparateur from 'components/metaImages/Comparateur'

export const config = {
  runtime: 'edge',
}

const getFont = async (url: URL) => {
  const res = await fetch(url)
  return await res.arrayBuffer()
}

let fonts: { name: string; data: ArrayBuffer; style: FontStyle; weight: FontWeight }[] = []

export default async function handler(req: NextRequest, res: NextApiResponse) {
  if (process.env.NO_IMAGE === 'true') {
    return res.status(401).send(`Please use ${process.env.NEXT_PUBLIC_IMAGE_URL}`)
  }

  if (fonts.length === 0) {
    fonts = (
      await Promise.all([
        getFont(new URL('../../../public/fonts/Marianne-Regular.woff', import.meta.url)),
        getFont(new URL('../../../public/fonts/Marianne-Medium.woff', import.meta.url)),
        getFont(new URL('../../../public/fonts/Marianne-Bold.woff', import.meta.url)),
        getFont(new URL('../../../public/fonts/Marianne-ExtraBold.woff', import.meta.url)),
      ])
    ).map((font, index) => ({
      name: 'Marianne',
      data: font,
      style: 'normal',
      weight: index === 0 ? 400 : index === 1 ? 500 : index === 2 ? 700 : 900,
    }))
  }

  return new ImageResponse(
    (
      <Comparateur
        value={Number(req.nextUrl.searchParams.get('value') || '100') * 1000}
        equivalent={req.nextUrl.searchParams.get('equivalent')}
        comparisons={(
          req.nextUrl.searchParams.get('comparisons') || 'ananas,voiturethermique,tgv,smartphone,pomme'
        ).split(',')}
      />
    ),
    {
      width: 1200,
      height: 630,
      emoji: 'twemoji',
      fonts,
    }
  )
}
